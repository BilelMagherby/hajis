const SESSION_KEY = 'hajiss-admin-session';

type StoredSession = { token: string; expiresAt: number };

const readSession = (): StoredSession | null => {
  try {
    const session = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) ?? 'null') as StoredSession | null;
    return session?.token && session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
};

export const hasAdminSession = () => readSession() !== null;

export const adminToken = () => readSession()?.token ?? '';

export const signInAdmin = async (email: string, password: string) => {
  let response: Response;
  try {
    response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  } catch {
    throw new Error('تعذر الاتصال بالخادم. تحقق من اتصالك ثم حاول مرة أخرى.');
  }
  const data = await response.json().catch(() => ({})) as Partial<StoredSession> & { detail?: string };
  if (response.status === 401) return false;
  if (!response.ok || !data.token || !data.expiresAt) {
    throw new Error(data.detail || 'تعذر تسجيل الدخول.');
  }
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token: data.token, expiresAt: data.expiresAt }));
  return true;
};

export const signOutAdmin = () => {
  window.sessionStorage.removeItem(SESSION_KEY);
};
