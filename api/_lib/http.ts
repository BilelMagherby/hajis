import { verifySession } from './adminSession.js';

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const fail = (detail: string, status: number) => json({ detail }, status);

/** Returns a 401 response when the request has no valid admin session, otherwise null. */
export function requireAdmin(request: Request) {
  const header = request.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  return token && verifySession(token) ? null : fail('انتهت الجلسة، سجّل الدخول مرة أخرى.', 401);
}
