import React, { useEffect, useRef, useState } from 'react';
import './CookieConsent.css';

const CONSENT_STORAGE_KEY = 'hajiss-cookie-consent';
const CONSENT_VERSION = 1;

interface CookieChoices {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

interface StoredCookieConsent {
  version: number;
  savedAt: string;
  choices: CookieChoices;
}

interface CookieConsentProps {
  isLoading: boolean;
  openSettings: boolean;
  onCloseSettings: () => void;
}

const isStoredConsent = (value: unknown): value is StoredCookieConsent => {
  if (!value || typeof value !== 'object') return false;

  const record = value as Record<string, unknown>;
  const choices = record.choices;
  if (!choices || typeof choices !== 'object') return false;

  const savedAt = record.savedAt;
  const parsedDate = typeof savedAt === 'string' ? Date.parse(savedAt) : Number.NaN;
  const savedChoices = choices as Record<string, unknown>;

  return record.version === CONSENT_VERSION
    && Number.isFinite(parsedDate)
    && savedChoices.necessary === true
    && typeof savedChoices.analytics === 'boolean'
    && typeof savedChoices.marketing === 'boolean';
};

const readStoredConsent = (): StoredCookieConsent | null => {
  const savedValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!savedValue) return null;

  try {
    const parsedValue: unknown = JSON.parse(savedValue);
    return isStoredConsent(parsedValue) ? parsedValue : null;
  } catch (error) {
    console.error('تعذرت قراءة تفضيلات ملفات تعريف الارتباط المحفوظة.', error);
    return null;
  }
};

const getInitialConsent = () => {
  try {
    return { consent: readStoredConsent(), error: null };
  } catch (error) {
    console.error('تعذر الوصول إلى مساحة تخزين تفضيلات ملفات تعريف الارتباط.', error);
    return {
      consent: null,
      error: 'تعذر الوصول إلى مساحة حفظ التفضيلات. تحقّق من إعدادات المتصفح ثم حاول مجددًا.'
    };
  }
};

export const CookieConsent: React.FC<CookieConsentProps> = ({
  isLoading,
  openSettings,
  onCloseSettings
}) => {
  const [initialState] = useState(getInitialConsent);
  const [savedConsent, setSavedConsent] = useState(initialState.consent);
  const [choices, setChoices] = useState<CookieChoices>(
    initialState.consent?.choices ?? { necessary: true, analytics: false, marketing: false }
  );
  const [isOpen, setIsOpen] = useState(!initialState.consent);
  const [showSettings, setShowSettings] = useState(false);
  const [storageError, setStorageError] = useState(initialState.error);
  const dialogRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  const isVisible = !isLoading && (isOpen || openSettings);
  const isSettingsView = openSettings || showSettings;

  useEffect(() => {
    if (!isVisible) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (isSettingsView ? settingsButtonRef.current : acceptButtonRef.current)?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [isSettingsView, isVisible]);

  const closeWithoutSaving = () => {
    setIsOpen(false);
    setShowSettings(false);
    onCloseSettings();
  };

  const saveChoices = (nextChoices: CookieChoices) => {
    const consent: StoredCookieConsent = {
      version: CONSENT_VERSION,
      savedAt: new Date().toISOString(),
      choices: nextChoices
    };

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    } catch (error) {
      console.error('تعذر حفظ تفضيلات ملفات تعريف الارتباط.', error);
      setStorageError('تعذر حفظ تفضيلاتك. لم تُسجّل الموافقة؛ تحقّق من إعدادات المتصفح وحاول مجددًا.');
      return;
    }

    setSavedConsent(consent);
    setChoices(nextChoices);
    setStorageError(null);
    setIsOpen(false);
    setShowSettings(false);
    onCloseSettings();
  };

  const handleDialogKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeWithoutSaving();
      return;
    }

    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusableElements = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="cookie-consent-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeWithoutSaving();
      }}
    >
      <div
        ref={dialogRef}
        className="cookie-consent-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
        dir="rtl"
        onKeyDown={handleDialogKeyDown}
      >
        <button
          type="button"
          className="cookie-consent-close"
          onClick={closeWithoutSaving}
          aria-label="إغلاق النافذة دون حفظ التفضيلات"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="cookie-consent-eyebrow">خصوصيتك أولويتنا</div>
        <h2 id="cookie-consent-title">
          {isSettingsView ? 'إعدادات ملفات تعريف الارتباط' : 'نحترم خصوصيتك'}
        </h2>
        <p id="cookie-consent-description" className="cookie-consent-description">
          {isSettingsView
            ? 'اختر فئات ملفات تعريف الارتباط التي تسمح بها. يمكنك تحديث تفضيلاتك أو سحب موافقتك في أي وقت من هذا القسم.'
            : 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقع هاجس، وتذكّر تفضيلاتك، وفهم كيفية استخدام الموقع. يمكنك اختيار أنواع ملفات تعريف الارتباط التي تسمح بها.'}
        </p>

        {isSettingsView ? (
          <div className="cookie-category-list">
            <section className="cookie-category">
              <div>
                <h3>ملفات تعريف الارتباط الضرورية</h3>
                <p>تلزم لتشغيل الوظائف الأساسية وحفظ اختيارك، وهي مفعّلة دائمًا عند الحاجة إليها.</p>
              </div>
              <button
                className="cookie-toggle cookie-toggle--locked"
                type="button"
                role="switch"
                aria-checked="true"
                aria-label="ملفات تعريف الارتباط الضرورية مفعّلة دائمًا"
                disabled
              >
                <span />
              </button>
            </section>

            <section className="cookie-category">
              <div>
                <h3>ملفات تعريف الارتباط الخاصة بالتحليلات</h3>
                <p>اختيارية، وتُستخدم لفهم كيفية تفاعل الزوار مع الموقع وتحسين تجربتهم.</p>
              </div>
              <button
                className={`cookie-toggle ${choices.analytics ? 'cookie-toggle--enabled' : ''}`}
                type="button"
                role="switch"
                aria-checked={choices.analytics}
                aria-label="ملفات تعريف الارتباط الخاصة بالتحليلات"
                onClick={() => setChoices((current) => ({ ...current, analytics: !current.analytics }))}
              >
                <span />
              </button>
            </section>

            <section className="cookie-category">
              <div>
                <h3>ملفات تعريف الارتباط التسويقية</h3>
                <p>اختيارية، وتُستخدم لأغراض التسويق والإعلانات عند تفعيل الأدوات المناسبة.</p>
              </div>
              <button
                className={`cookie-toggle ${choices.marketing ? 'cookie-toggle--enabled' : ''}`}
                type="button"
                role="switch"
                aria-checked={choices.marketing}
                aria-label="ملفات تعريف الارتباط التسويقية"
                onClick={() => setChoices((current) => ({ ...current, marketing: !current.marketing }))}
              >
                <span />
              </button>
            </section>
          </div>
        ) : (
          <p className="cookie-consent-note">
            لا يستخدم الموقع حاليًا أدوات تحليلية أو تسويقية خارجية. ولن تُحمّل أي أداة اختيارية قبل الحصول على موافقتك.
          </p>
        )}

        {storageError && (
          <p className="cookie-consent-error" role="alert">
            {storageError}
          </p>
        )}

        <div className="cookie-consent-actions">
          {isSettingsView ? (
            <>
              <button
                ref={settingsButtonRef}
                type="button"
                className="cookie-button cookie-button--primary"
                onClick={() => saveChoices(choices)}
              >
                حفظ تفضيلاتي
              </button>
              <button
                type="button"
                className="cookie-button cookie-button--secondary"
                onClick={() => saveChoices({ necessary: true, analytics: true, marketing: true })}
              >
                قبول الكل
              </button>
            </>
          ) : (
            <>
              <button
                ref={acceptButtonRef}
                type="button"
                className="cookie-button cookie-button--primary"
                onClick={() => saveChoices({ necessary: true, analytics: true, marketing: true })}
              >
                قبول الكل
              </button>
              <button
                type="button"
                className="cookie-button cookie-button--secondary"
                onClick={() => saveChoices({ necessary: true, analytics: false, marketing: false })}
              >
                رفض ملفات تعريف الارتباط غير الضرورية
              </button>
              <button
                type="button"
                className="cookie-button cookie-button--text"
                onClick={() => setShowSettings(true)}
              >
                تخصيص الإعدادات
              </button>
            </>
          )}
        </div>

        {savedConsent && (
          <p className="cookie-consent-saved-at">
            حُفظت تفضيلاتك في {new Intl.DateTimeFormat('ar', { dateStyle: 'medium' }).format(new Date(savedConsent.savedAt))}.
          </p>
        )}
      </div>
    </div>
  );
};
