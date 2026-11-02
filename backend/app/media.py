"""Storage for images/videos uploaded from the admin blog editor."""
from pathlib import Path
from typing import Literal
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from .config import Settings
from .models import Post

MEDIA_ROUTE = '/api/blog/media'
_CHUNK = 1024 * 1024

# content type -> (kind, extension)
_ALLOWED: dict[str, tuple[Literal['image', 'video'], str]] = {
    'image/jpeg': ('image', '.jpg'),
    'image/png': ('image', '.png'),
    'image/webp': ('image', '.webp'),
    'image/gif': ('image', '.gif'),
    'video/mp4': ('video', '.mp4'),
    'video/webm': ('video', '.webm'),
}


def _matches_signature(content_type: str, head: bytes) -> bool:
    """Checks the real file header so a renamed script can't be stored as an image."""
    match content_type:
        case 'image/jpeg':
            return head.startswith(b'\xff\xd8\xff')
        case 'image/png':
            return head.startswith(b'\x89PNG\r\n\x1a\n')
        case 'image/webp':
            return head[:4] == b'RIFF' and head[8:12] == b'WEBP'
        case 'image/gif':
            return head[:6] in (b'GIF87a', b'GIF89a')
        case 'video/mp4':
            return head[4:8] == b'ftyp'
        case 'video/webm':
            return head.startswith(b'\x1a\x45\xdf\xa3')
    return False


async def save_upload(file: UploadFile, settings: Settings) -> tuple[str, Literal['image', 'video'], int]:
    content_type = (file.content_type or '').lower()
    if content_type not in _ALLOWED:
        raise HTTPException(status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, 'الصيغ المدعومة: JPG, PNG, WEBP, GIF, MP4, WEBM.')
    kind, extension = _ALLOWED[content_type]
    limit_mb = settings.blog_max_image_mb if kind == 'image' else settings.blog_max_video_mb
    limit = limit_mb * 1024 * 1024

    head = await file.read(16)
    if not _matches_signature(content_type, head):
        raise HTTPException(status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, 'محتوى الملف لا يطابق نوعه.')

    settings.blog_upload_dir.mkdir(parents=True, exist_ok=True)
    name = f'{uuid4().hex}{extension}'
    target = settings.blog_upload_dir / name
    partial = target.with_suffix(target.suffix + '.part')
    size = len(head)
    try:
        with partial.open('wb') as out:
            out.write(head)
            while chunk := await file.read(_CHUNK):
                size += len(chunk)
                if size > limit:
                    raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, f'الحد الأقصى لحجم الملف {limit_mb}MB.')
                out.write(chunk)
        partial.replace(target)
    finally:
        partial.unlink(missing_ok=True)
    return f'{MEDIA_ROUTE}/{name}', kind, size


def _local_file(url: str, settings: Settings) -> Path | None:
    if not url.startswith(f'{MEDIA_ROUTE}/'):
        return None
    name = url.removeprefix(f'{MEDIA_ROUTE}/')
    if not name or '/' in name or '\\' in name or name.startswith('.'):
        return None
    return settings.blog_upload_dir / name


def delete_if_orphaned(db: Session, url: str | None, settings: Settings) -> None:
    """Removes an uploaded file once no post references it (call after the DB commit)."""
    path = _local_file(url or '', settings)
    if path is None:
        return
    still_used = db.scalar(select(Post.id).where(Post.media_url == url).limit(1))
    if still_used is None:
        path.unlink(missing_ok=True)
