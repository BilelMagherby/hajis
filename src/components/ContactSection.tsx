import React, { useState } from 'react';
import { CheckCircle2, Loader2, Mail, Send } from 'lucide-react';
import { useLanguage } from '../i18n/language';

// Sent straight from the browser by FormSubmit (https://formsubmit.co), no backend involved.
// The first submission emails an activation link to this inbox; notes arrive once it is clicked.
const CONTACT_EMAIL = 'Hajisscafe@gmail.com';
const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

type Status = 'idle' | 'sending' | 'sent' | 'error';

const fieldClass =
  'w-full rounded-2xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.45)] bg-[var(--color-brand-linen)] px-4 py-3 text-sm text-[var(--color-brand-chocolate)] placeholder:text-[var(--color-brand-chocolate)]/60 focus:border-[var(--color-brand-sand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-brand-sand-rgb)_/_0.4)]';

export const ContactSection: React.FC = () => {
  const { t, isEnglish } = useLanguage();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const canSend = name.trim() && message.trim().length >= 3 && status !== 'sending';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSend) return;
    // Bots fill hidden fields; pretend it worked and send nothing.
    if (honey) {
      setStatus('sent');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `رسالة جديدة من موقع هاجس — ${name.trim()}`,
          _template: 'table',
          _captcha: 'false',
          الاسم: name.trim(),
          'البريد أو الجوال': contact.trim() || '—',
          الرسالة: message.trim(),
          اللغة: isEnglish ? 'English' : 'العربية',
          الصفحة: window.location.href,
        }),
      });
      const data = await response.json().catch(() => ({})) as { success?: string | boolean };
      if (!response.ok || String(data.success) === 'false') throw new Error('send failed');
      setStatus('sent');
      setName('');
      setContact('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative w-full overflow-hidden bg-[#ECE3D2] py-8 text-[#40372D] sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="visual-card rounded-[1.75rem] border border-[rgb(var(--color-brand-sand-rgb)_/_0.3)] bg-[#785b40] p-6 text-start shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-10"
        >
          <div className="mb-6 space-y-2">
            <span className="inline-flex items-center gap-2 font-arabic text-xs font-semibold tracking-[0.2em] text-[var(--color-brand-sand)]">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t('نسعد بسماعك', 'We love hearing from you')}
            </span>
            <h2 id="contact-title" className="visual-section-title font-kufi text-3xl font-bold text-[var(--color-brand-linen)] sm:text-4xl">
              {t('تواصل معنا', 'Speak to Us')}
            </h2>
            <p className="font-arabic text-sm leading-7 text-[var(--color-brand-linen)] sm:text-base">
              {t('اقتراح، ملاحظة، أو سؤال؟ اكتب لنا وسيصل مباشرة إلى فريق هاجس.', 'A suggestion, a note or a question? Write to us and it goes straight to the Hajiss team.')}
            </p>
          </div>

          {status === 'sent' ? (
            <div role="status" className="flex flex-col items-start gap-3 rounded-2xl bg-[var(--color-brand-linen)] p-6 text-[var(--color-brand-chocolate)]">
              <CheckCircle2 className="h-8 w-8 text-[#1f5d27]" aria-hidden="true" />
              <p className="font-kufi text-lg font-bold">{t('شكرًا لك! وصلتنا رسالتك.', 'Thank you! We received your message.')}</p>
              <button type="button" onClick={() => setStatus('idle')} className="text-sm font-semibold underline underline-offset-4">
                {t('إرسال رسالة أخرى', 'Send another message')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="font-arabic text-xs font-semibold text-[var(--color-brand-linen)]">{t('الاسم *', 'Name *')}</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required autoComplete="name" className={fieldClass} placeholder={t('اسمك', 'Your name')} />
                </label>
                <label className="block space-y-1.5">
                  <span className="font-arabic text-xs font-semibold text-[var(--color-brand-linen)]">{t('البريد أو رقم الجوال (اختياري)', 'Email or phone (optional)')}</span>
                  <input value={contact} onChange={(e) => setContact(e.target.value)} maxLength={120} autoComplete="email" dir="auto" className={fieldClass} placeholder={t('لنتمكن من الرد عليك', 'So we can reply to you')} />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="font-arabic text-xs font-semibold text-[var(--color-brand-linen)]">{t('رسالتك *', 'Your message *')}</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} maxLength={2000} required dir="auto" className={`${fieldClass} resize-none leading-7`} placeholder={t('اكتب ملاحظتك هنا...', 'Write your note here...')} />
              </label>

              {/* Hidden from people; bots that fill it are ignored. */}
              <input type="text" name="_honey" value={honey} onChange={(e) => setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-xs text-[var(--color-brand-linen)]" role={status === 'error' ? 'alert' : undefined}>
                  {status === 'error'
                    ? t(`تعذر الإرسال. حاول مرة أخرى أو راسلنا على ${CONTACT_EMAIL}`, `Couldn't send. Try again or email us at ${CONTACT_EMAIL}`)
                    : t('نقرأ كل رسالة بعناية.', 'We read every message carefully.')}
                </span>
                <button
                  type="submit"
                  disabled={!canSend}
                  className="brand-button-primary visual-button inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                  {status === 'sending' ? t('جارٍ الإرسال...', 'Sending...') : t('إرسال', 'Send')}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
