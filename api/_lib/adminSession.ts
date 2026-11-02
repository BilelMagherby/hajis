import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Server-side admin login. Credentials live only in server environment variables, and the
 * dashboard receives a signed, expiring session token it sends as `Authorization: Bearer`.
 */

const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

const env = (name: string) => (process.env[name] ?? '').trim();

export function adminCredentials() {
  // VITE_DEMO_ADMIN_* are accepted so existing deployments keep working until
  // ADMIN_EMAIL / ADMIN_PASSWORD are set.
  const email = env('ADMIN_EMAIL') || env('VITE_DEMO_ADMIN_EMAIL');
  const password = process.env.ADMIN_PASSWORD || process.env.VITE_DEMO_ADMIN_PASSWORD || '';
  return email && password ? { email, password } : null;
}

function sessionSecret() {
  const explicit = env('ADMIN_SESSION_SECRET');
  if (explicit) return explicit;
  const credentials = adminCredentials();
  return createHash('sha256')
    .update(`hajiss-admin:${credentials?.password ?? ''}:${env('ZOHO_CLIENT_SECRET')}`)
    .digest('hex');
}

const sign = (payload: string) => createHmac('sha256', sessionSecret()).update(payload).digest('base64url');

export function safeEqual(a: string, b: string) {
  const digest = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(a), digest(b));
}

export function issueSession(email: string) {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = Buffer.from(JSON.stringify({ sub: email, exp: expiresAt })).toString('base64url');
  return { token: `${payload}.${sign(payload)}`, expiresAt };
}

export function verifySession(token: string) {
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !adminCredentials() || !safeEqual(signature, sign(payload))) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number };
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}
