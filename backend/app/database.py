from collections.abc import Iterator
from pathlib import Path

from sqlalchemy import create_engine, event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker
from sqlalchemy.pool import StaticPool

from .config import get_settings


class Base(DeclarativeBase):
    pass


def make_engine(url: str) -> Engine:
    if not url.startswith('sqlite'):
        return create_engine(url, pool_pre_ping=True)

    db_file = url.removeprefix('sqlite:///')
    in_memory = db_file in ('', ':memory:')
    if not in_memory:
        Path(db_file).parent.mkdir(parents=True, exist_ok=True)
    engine = create_engine(
        url,
        connect_args={'check_same_thread': False},
        **({'poolclass': StaticPool} if in_memory else {}),
    )

    @event.listens_for(engine, 'connect')
    def _sqlite_pragmas(dbapi_connection, _record):
        cursor = dbapi_connection.cursor()
        if not in_memory:
            cursor.execute('PRAGMA journal_mode=WAL')
        cursor.execute('PRAGMA foreign_keys=ON')
        cursor.close()

    return engine


engine = make_engine(get_settings().blog_database_url)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


def get_db() -> Iterator[Session]:
    with SessionLocal() as session:
        yield session
