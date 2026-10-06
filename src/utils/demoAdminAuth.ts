const DEMO_SESSION_KEY = 'hajiss-demo-admin-session';

export const hasDemoAdminSession = () =>
  window.sessionStorage.getItem(DEMO_SESSION_KEY) === 'active';

export const signInDemoAdmin = (email: string, password: string) => {
  const configuredEmail = import.meta.env.VITE_DEMO_ADMIN_EMAIL?.trim();
  const configuredPassword = import.meta.env.VITE_DEMO_ADMIN_PASSWORD;

  if (!configuredEmail || !configuredPassword) {
    throw new Error(
      'إعداد تسجيل الدخول التجريبي غير مكتمل. أضف VITE_DEMO_ADMIN_EMAIL و VITE_DEMO_ADMIN_PASSWORD إلى ملف .env.local محلياً أو إلى Environment Variables في Vercel، ثم أعد النشر.'
    );
  }

  if (email.trim().toLowerCase() !== configuredEmail.toLowerCase() || password !== configuredPassword) {
    return false;
  }

  window.sessionStorage.setItem(DEMO_SESSION_KEY, 'active');
  return true;
};

export const signOutDemoAdmin = () => {
  window.sessionStorage.removeItem(DEMO_SESSION_KEY);
};
