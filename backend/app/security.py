"""Verifies the admin session tokens issued by api/admin/login.ts (see api/_lib/adminSession.ts).

Token format: base64url(JSON {sub, exp}) + "." + base64url(HMAC-SHA256(secret, payload)),
where exp is a Unix timestamp in milliseconds.
"""
import base64
import hashlib
import hmac
import json
import time
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from .config import Settings, get_settings

_bearer = HTTPBearer(auto_error=False)


def _credentials(settings: Settings) -> tuple[str, str] | None:
    email = settings.admin_email.strip() or settings.vite_demo_admin_email.strip()
    password = settings.admin_password or settings.vite_demo_admin_password
    return (email, password) if email and password else None


def _session_secret(settings: Settings) -> bytes:
    explicit = settings.admin_session_secret.strip()
    if explicit:
        return explicit.encode()
    credentials = _credentials(settings)
    password = credentials[1] if credentials else ''
    seed = f'hajiss-admin:{password}:{settings.zoho_client_secret.strip()}'
    return hashlib.sha256(seed.encode()).hexdigest().encode()


def _b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode()


def sign_payload(payload: str, settings: Settings) -> str:
    return _b64url(hmac.new(_session_secret(settings), payload.encode(), hashlib.sha256).digest())


def issue_session(settings: Settings, ttl_ms: int = 12 * 60 * 60 * 1000) -> str:
    """Same format as issueSession() in adminSession.ts; used by the tests."""
    exp = int(time.time() * 1000) + ttl_ms
    payload = _b64url(json.dumps({'sub': settings.admin_email, 'exp': exp}).encode())
    return f'{payload}.{sign_payload(payload, settings)}'


def verify_session(token: str, settings: Settings) -> bool:
    payload, _, signature = token.partition('.')
    if not payload or not signature or _credentials(settings) is None:
        return False
    if not hmac.compare_digest(signature, sign_payload(payload, settings)):
        return False
    try:
        exp = json.loads(base64.urlsafe_b64decode(payload + '=' * (-len(payload) % 4))).get('exp')
    except (ValueError, AttributeError):
        return False
    return isinstance(exp, (int, float)) and exp > time.time() * 1000


def require_admin(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
    settings: Annotated[Settings, Depends(get_settings)],
) -> None:
    if credentials is None or not verify_session(credentials.credentials, settings):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'انتهت الجلسة. سجّل الدخول مرة أخرى.')
