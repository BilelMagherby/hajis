"""Request/response models. Responses match the NewsItem interface in src/data/news.ts."""
from datetime import datetime
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, StringConstraints, field_validator
from pydantic.alias_generators import to_camel

from .models import Post

CATEGORY_LABELS: dict[str, str] = {
    # Mirrors newsCategories in src/data/news.ts ('all' is a filter, not a category).
    'crops': 'محاصيل جديدة',
    'events': 'فعاليات وورش عمل',
    'drinks': 'مشروبات الموسم',
    'cafe': 'أخبار هاجس',
    'blog': 'المدونة والمقالات',
}
ARABIC_MONTHS = (
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
)
DEFAULT_IMAGE = '/images/coffee_bag_cup.jpg'

Category = Literal['crops', 'events', 'drinks', 'cafe', 'blog']


def _short(max_length: int, min_length: int = 0):
    return Annotated[str, StringConstraints(strip_whitespace=True, min_length=min_length, max_length=max_length)]


class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)


class Author(CamelModel):
    name: _short(120) = 'فريق هاجس'
    role: _short(120) = 'إدارة المحتوى'


class Section(CamelModel):
    heading: _short(200) | None = None
    paragraphs: list[_short(5000, 1)] = Field(default_factory=list, max_length=50)


class Content(CamelModel):
    lead: _short(2000) = ''
    sections: list[Section] = Field(default_factory=list, max_length=20)
    highlights: list[_short(300, 1)] | None = Field(default=None, max_length=20)
    quote: _short(1000) | None = None


class PostIn(CamelModel):
    title: _short(200, 1)
    subtitle: _short(300) = ''
    category: Category = 'blog'
    read_time: _short(60) = 'قراءة في 3 دقائق'
    media_type: Literal['image', 'video'] = 'image'
    media_url: _short(1000) = ''
    badge: _short(60) | None = None
    featured: bool = False
    summary: _short(1000, 1)
    author: Author = Field(default_factory=Author)
    tags: list[_short(40, 1)] = Field(default_factory=list, max_length=15)
    content: Content = Field(default_factory=Content)

    @field_validator('media_url')
    @classmethod
    def _safe_media_url(cls, value: str) -> str:
        # Only site-relative paths or http(s) links; blocks javascript:/data: URLs and bloated base64 blobs.
        site_relative = value.startswith('/') and not value.startswith('//')
        if value and not site_relative and not value.startswith(('https://', 'http://')):
            raise ValueError('رابط الوسائط يجب أن يبدأ بـ / أو https://')
        return value

    @field_validator('tags')
    @classmethod
    def _clean_tags(cls, tags: list[str]) -> list[str]:
        return list(dict.fromkeys(tag.lstrip('#') for tag in tags if tag.lstrip('#')))

    def to_columns(self) -> dict:
        summary = self.summary
        sections = [s.model_dump(exclude_none=True) for s in self.content.sections if s.paragraphs]
        return {
            'title': self.title,
            'subtitle': self.subtitle,
            'category': self.category,
            'read_time': self.read_time or 'قراءة في 3 دقائق',
            'media_type': self.media_type,
            'media_url': self.media_url or DEFAULT_IMAGE,
            'badge': self.badge or None,
            'featured': self.featured,
            'summary': summary,
            'author_name': self.author.name or 'فريق هاجس',
            'author_role': self.author.role or 'إدارة المحتوى',
            'tags': self.tags or ['قهوة_مختصة', 'هاجس'],
            'lead': self.content.lead or summary,
            'sections': sections or [{'paragraphs': [summary]}],
            'highlights': self.content.highlights or None,
            'quote': self.content.quote or None,
        }


class PostOut(CamelModel):
    id: str
    title: str
    subtitle: str
    category: str
    category_label: str
    date: str
    read_time: str
    image: str
    media_type: Literal['image', 'video']
    video_url: str | None = None
    summary: str
    badge: str | None = None
    featured: bool
    author: Author
    tags: list[str]
    content: Content
    created_at: datetime
    updated_at: datetime

    @classmethod
    def from_model(cls, post: Post) -> 'PostOut':
        created = post.created_at
        return cls(
            id=post.id,
            title=post.title,
            subtitle=post.subtitle,
            category=post.category,
            category_label=CATEGORY_LABELS.get(post.category, 'مستجدات'),
            date=f'{created.day} {ARABIC_MONTHS[created.month - 1]} {created.year}',
            read_time=post.read_time,
            image=post.media_url,
            media_type=post.media_type,
            video_url=post.media_url if post.media_type == 'video' else None,
            summary=post.summary,
            badge=post.badge,
            featured=post.featured,
            author=Author(name=post.author_name, role=post.author_role),
            tags=post.tags,
            content=Content(lead=post.lead, sections=post.sections, highlights=post.highlights, quote=post.quote),
            created_at=post.created_at,
            updated_at=post.updated_at,
        )


class PostList(CamelModel):
    items: list[PostOut]
    total: int


class UploadOut(CamelModel):
    url: str
    media_type: Literal['image', 'video']
    size: int
