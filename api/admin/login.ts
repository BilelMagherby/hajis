














import { adminCredentials, issueSession, safeEqual } from '../_lib/adminSession.js';
import { fail, json } from '../_lib/http.js';

export async function POST(request: Request) {
  const credentials = adminCredentials();
  if (!credentials) {
    return fail('إعداد تسجيل الدخول غير مكتمل. أضف ADMIN_EMAIL و ADMIN_PASSWORD إلى متغيرات البيئة ثم أعد النشر.', 503);
  }
  const body = await request.json().catch(() => null) as { email?: unknown; password?: unknown } | null;
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const emailOk = safeEqual(email, credentials.email.toLowerCase());
  const passwordOk = safeEqual(password, credentials.password);
  if (!emailOk || !passwordOk) return fail('البريد الإلكتروني أو كلمة المرور غير صحيحة.', 401);
  return json(issueSession(credentials.email));
}
