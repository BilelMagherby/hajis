from datetime import datetime, timezone
from uuid import uuid4

from sqlalchemy import JSON, Boolean, DateTime, Index, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Post(Base):
    __tablename__ = 'blog_posts'
    __table_args__ = (Index('ix_blog_posts_category_created', 'category', 'created_at'),)

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=lambda: uuid4().hex)
    title: Mapped[str] = mapped_column(String(200))
    subtitle: Mapped[str] = mapped_column(String(300), default='')
    category: Mapped[str] = mapped_column(String(32))
    read_time: Mapped[str] = mapped_column(String(60))
    media_type: Mapped[str] = mapped_column(String(10), default='image')
    media_url: Mapped[str] = mapped_column(String(1000))
    badge: Mapped[str | None] = mapped_column(String(60), nullable=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    summary: Mapped[str] = mapped_column(Text)
    author_name: Mapped[str] = mapped_column(String(120))
    author_role: Mapped[str] = mapped_column(String(120))
    tags: Mapped[list[str]] = mapped_column(JSON, default=list)
    lead: Mapped[str] = mapped_column(Text)
    sections: Mapped[list[dict]] = mapped_column(JSON, default=list)
    highlights: Mapped[list[str] | None] = mapped_column(JSON, nullable=True)
    quote: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow, index=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow, onupdate=_utcnow)
