from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parent.parent
PROJECT_DIR = BACKEND_DIR.parent


class Settings(BaseSettings):
    # Later files win, matching Vite's loadEnv order; real environment variables win over all.
    model_config = SettingsConfigDict(
        env_file=(PROJECT_DIR / '.env', PROJECT_DIR / '.env.local', BACKEND_DIR / '.env'),
        extra='ignore',
    )

    # Shared with api/_lib/adminSession.ts so tokens from /api/admin/login are accepted here.
    admin_email: str = ''
    admin_password: str = ''
    vite_demo_admin_email: str = ''
    vite_demo_admin_password: str = ''
    admin_session_secret: str = ''
    zoho_client_secret: str = ''

    blog_database_url: str = 'sqlite:///./data/blog.db'
    blog_upload_dir: Path = Path('data/uploads')
    blog_max_image_mb: int = Field(default=10, gt=0)
    blog_max_video_mb: int = Field(default=80, gt=0)
    blog_cors_origins: str = ''

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.blog_cors_origins.split(',') if origin.strip()]

    def resolved(self) -> 'Settings':
        """Anchors relative paths to backend/ so the server works from any working directory."""
        if not self.blog_upload_dir.is_absolute():
            self.blog_upload_dir = (BACKEND_DIR / self.blog_upload_dir).resolve()
        if self.blog_database_url.startswith('sqlite:///./'):
            relative = self.blog_database_url.removeprefix('sqlite:///./')
            self.blog_database_url = f'sqlite:///{(BACKEND_DIR / relative).as_posix()}'
        return self


@lru_cache
def get_settings() -> Settings:
    return Settings().resolved()
