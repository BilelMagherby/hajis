import os
import tempfile

# Configure before the app is imported: isolated DB/uploads and known admin credentials.
_tmp = tempfile.mkdtemp(prefix='hajiss-blog-test-')
os.environ.update({
    'ADMIN_EMAIL': 'admin@test.local',
    'ADMIN_PASSWORD': 'test-password',
    'ADMIN_SESSION_SECRET': 'test-secret',
    'BLOG_DATABASE_URL': 'sqlite:///:memory:',
    'BLOG_UPLOAD_DIR': os.path.join(_tmp, 'uploads'),
})

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app.config import get_settings  # noqa: E402
from app.database import Base, engine  # noqa: E402
from app.main import app  # noqa: E402
from app.security import issue_session  # noqa: E402


@pytest.fixture()
def client():
    Base.metadata.drop_all(engine)
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture()
def auth() -> dict[str, str]:
    return {'Authorization': f'Bearer {issue_session(get_settings())}'}
