import React, { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signInAdmin } from '../utils/adminAuth';
import './AdminPages.css';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!await signInAdmin(email, password)) {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
        return;
      }
      navigate('/admin', { replace: true });
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'تعذر تسجيل الدخول.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page" dir="rtl">
      <div className="admin-login-glow" aria-hidden="true" />
      <Link className="admin-back-link" to="/" aria-label="العودة إلى الموقع">
        <ArrowRight size={18} />
        العودة إلى الموقع
      </Link>
      <section className="admin-login-card">
        <img src="/images/logo.png" alt="شعار هاجس" className="admin-logo" />
        <span className="admin-eyebrow">هاجس • لوحة الإدارة</span>
        <h1>مرحباً بعودتك</h1>
        <p className="admin-muted">سجّل الدخول لمتابعة إدارة هاجس.</p>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">البريد الإلكتروني</label>
          <div className="admin-input-wrap">
            <Mail size={18} aria-hidden="true" />
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>
          <label htmlFor="admin-password">كلمة المرور</label>
          <div className="admin-input-wrap">
            <LockKeyhole size={18} aria-hidden="true" />
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <button type="submit" className="admin-primary-button" disabled={isSubmitting}>
            {isSubmitting ? 'جارٍ التحقق...' : 'تسجيل الدخول'}
          </button>
        </form>
      </section>
      <span className="admin-login-footer">حائل، المملكة العربية السعودية</span>
    </main>
  );
};
