from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy import String, cast, func, or_, select
from sqlalchemy.orm import Session

from ..config import Settings, get_settings
from ..database import get_db
from ..media import delete_if_orphaned
from ..models import Post
from ..schemas import Category, PostIn, PostList, PostOut
from ..security import require_admin

router = APIRouter(prefix='/api/blog/posts', tags=['posts'])

DbSession = Annotated[Session, Depends(get_db)]
AppSettings = Annotated[Settings, Depends(get_settings)]
admin_only = [Depends(require_admin)]


def _get_or_404(db: Session, post_id: str) -> Post:
    post = db.get(Post, post_id)
    if post is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, 'التدوينة غير موجودة.')
    return post


@router.get('', response_model=PostList, response_model_by_alias=True)
def list_posts(
    db: DbSession,
    response: Response,
    category: Category | None = None,
    q: Annotated[str | None, Query(max_length=100)] = None,
    featured: bool | None = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 50,
    offset: Annotated[int, Query(ge=0)] = 0,
) -> PostList:
    query = select(Post)
    if category:
        query = query.where(Post.category == category)
    if featured is not None:
        query = query.where(Post.featured.is_(featured))
    if q and q.strip():
        pattern = f'%{q.strip().lower()}%'
        query = query.where(or_(
            func.lower(Post.title).like(pattern),
            func.lower(Post.subtitle).like(pattern),
            func.lower(Post.summary).like(pattern),
            func.lower(cast(Post.tags, String)).like(pattern),
        ))

    total = db.scalar(select(func.count()).select_from(query.subquery())) or 0
    posts = db.scalars(query.order_by(Post.created_at.desc(), Post.id).limit(limit).offset(offset)).all()
    # New posts must appear on the public page immediately, so never let browsers/CDNs cache lists.
    response.headers['Cache-Control'] = 'no-cache'
    return PostList(items=[PostOut.from_model(p) for p in posts], total=total)


@router.get('/{post_id}', response_model=PostOut, response_model_by_alias=True)
def get_post(post_id: str, db: DbSession) -> PostOut:
    return PostOut.from_model(_get_or_404(db, post_id))


@router.post('', response_model=PostOut, response_model_by_alias=True,
             status_code=status.HTTP_201_CREATED, dependencies=admin_only)
def create_post(payload: PostIn, db: DbSession) -> PostOut:
    post = Post(**payload.to_columns())
    db.add(post)
    db.commit()
    db.refresh(post)
    return PostOut.from_model(post)


@router.put('/{post_id}', response_model=PostOut, response_model_by_alias=True, dependencies=admin_only)
def update_post(post_id: str, payload: PostIn, db: DbSession, settings: AppSettings) -> PostOut:
    post = _get_or_404(db, post_id)
    previous_media = post.media_url
    for column, value in payload.to_columns().items():
        setattr(post, column, value)
    db.commit()
    db.refresh(post)
    if previous_media != post.media_url:
        delete_if_orphaned(db, previous_media, settings)
    return PostOut.from_model(post)


@router.delete('/{post_id}', status_code=status.HTTP_204_NO_CONTENT, dependencies=admin_only)
def delete_post(post_id: str, db: DbSession, settings: AppSettings) -> Response:
    post = _get_or_404(db, post_id)
    media = post.media_url
    db.delete(post)
    db.commit()
    delete_if_orphaned(db, media, settings)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
