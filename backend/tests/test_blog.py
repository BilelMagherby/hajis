import base64
import json
import time

from app.config import get_settings
from app.security import sign_payload

POST = {
    'title': 'تدشين محصول كولومبيا',
    'subtitle': 'تجربة تقطير استثنائية',
    'category': 'crops',
    'summary': 'محصول جديد وصل إلى هاجس.',
    'tags': ['#قهوة_مختصة', 'هاجس', 'هاجس'],
    'content': {'lead': '', 'sections': [{'paragraphs': ['الفقرة الأولى', 'الفقرة الثانية']}]},
}
PNG = b'\x89PNG\r\n\x1a\n' + b'\x00' * 64


def test_public_list_starts_empty(client):
    response = client.get('/api/blog/posts')
    assert response.status_code == 200
    assert response.json() == {'items': [], 'total': 0}
    assert response.headers['cache-control'] == 'no-cache'


def test_writes_require_admin_token(client):
    assert client.post('/api/blog/posts', json=POST).status_code == 401
    assert client.post('/api/blog/posts', json=POST, headers={'Authorization': 'Bearer forged.token'}).status_code == 401


def test_expired_token_rejected(client):
    payload = base64.urlsafe_b64encode(json.dumps({'sub': 'x', 'exp': int(time.time() * 1000) - 1}).encode()).rstrip(b'=').decode()
    token = f'{payload}.{sign_payload(payload, get_settings())}'
    assert client.post('/api/blog/posts', json=POST, headers={'Authorization': f'Bearer {token}'}).status_code == 401


def test_create_then_visible_publicly(client, auth):
    created = client.post('/api/blog/posts', json=POST, headers=auth)
    assert created.status_code == 201
    body = created.json()
    assert body['categoryLabel'] == 'محاصيل جديدة'
    assert body['tags'] == ['قهوة_مختصة', 'هاجس']
    assert body['content']['lead'] == POST['summary']
    assert body['image'] == '/images/coffee_bag_cup.jpg'

    listed = client.get('/api/blog/posts').json()
    assert listed['total'] == 1 and listed['items'][0]['id'] == body['id']
    assert client.get('/api/blog/posts', params={'category': 'events'}).json()['total'] == 0
    assert client.get('/api/blog/posts', params={'q': 'كولومبيا'}).json()['total'] == 1


def test_update_and_delete(client, auth):
    post_id = client.post('/api/blog/posts', json=POST, headers=auth).json()['id']
    updated = client.put(f'/api/blog/posts/{post_id}', json={**POST, 'title': 'عنوان جديد', 'featured': True}, headers=auth)
    assert updated.status_code == 200
    assert updated.json()['title'] == 'عنوان جديد' and updated.json()['featured'] is True

    assert client.delete(f'/api/blog/posts/{post_id}', headers=auth).status_code == 204
    assert client.get(f'/api/blog/posts/{post_id}').status_code == 404


def test_rejects_unsafe_media_url_and_missing_title(client, auth):
    bad_url = client.post('/api/blog/posts', json={**POST, 'mediaUrl': 'javascript:alert(1)'}, headers=auth)
    assert bad_url.status_code == 422
    assert 'mediaUrl' in bad_url.json()['detail']
    assert client.post('/api/blog/posts', json={**POST, 'title': '  '}, headers=auth).status_code == 422


def test_upload_is_served_and_cleaned_up_with_post(client, auth):
    upload = client.post('/api/blog/uploads', files={'file': ('cover.png', PNG, 'image/png')}, headers=auth)
    assert upload.status_code == 201
    url = upload.json()['url']
    assert client.get(url).content == PNG

    post_id = client.post('/api/blog/posts', json={**POST, 'mediaUrl': url}, headers=auth).json()['id']
    client.delete(f'/api/blog/posts/{post_id}', headers=auth)
    assert client.get(url).status_code == 404


def test_upload_rejects_spoofed_type(client, auth):
    response = client.post('/api/blog/uploads', files={'file': ('x.png', b'<script>alert(1)</script>', 'image/png')}, headers=auth)
    assert response.status_code == 415
    assert client.post('/api/blog/uploads', files={'file': ('x.svg', b'<svg/>', 'image/svg+xml')}, headers=auth).status_code == 415
