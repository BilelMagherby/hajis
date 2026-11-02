import React, { useEffect, useRef, useState } from 'react';
import './CookieConsent.css';
import { useLanguage } from '../i18n/language';

const CONSENT_STORAGE_KEY = 'hajiss-cookie-consent';
const CONSENT_VERSION = 1;

interface CookieChoices {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

type StorageError = 'unavailable' | 'save-failed';

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
    console.error('Could not read the saved cookie preferences.', error);
    return null;
  }
};

const getInitialConsent = () => {
  try {
    return { consent: readStoredConsent(), error: null };
  } catch (error) {
    console.error('Could not access cookie preference storage.', error);
    return { consent: null, error: 'unavailable' as StorageError };
  }
};

export const CookieConsent: React.FC<CookieConsentProps> = ({
  isLoading,
  openSettings,
  onCloseSettings
}) => {
  const { t, dir, language } = useLanguage();
  const [initialState] = useState(getInitialConsent);
  const [savedConsent, setSavedConsent] = useState(initialState.consent);
  const [choices, setChoices] = useState<CookieChoices>(
    initialState.consent?.choices ?? { necessary: true, analytics: false, marketing: false }
  );
  const [isOpen, setIsOpen] = useState(!initialState.consent);
  const [showSettings, setShowSettings] = useState(false);
  const [storageError, setStorageError] = useState<StorageError | null>(initialState.error);
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
      console.error('Could not save cookie preferences.', error);
      setStorageError('save-failed');
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
        dir={dir}
        onKeyDown={handleDialogKeyDown}
      >
        <button
          type="button"
          className="cookie-consent-close"
          onClick={closeWithoutSaving}
          aria-label={t('إغلاق النافذة دون حفظ التفضيلات', 'Close without saving preferences')}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="cookie-consent-eyebrow">{t('خصوصيتك أولويتنا', 'Your privacy comes first')}</div>
        <h2 id="cookie-consent-title">
          {isSettingsView ? t('إعدادات ملفات تعريف الارتباط', 'Cookie settings') : t('نحترم خصوصيتك', 'We respect your privacy')}
        </h2>
        <p id="cookie-consent-description" className="cookie-consent-description">
          {isSettingsView
            ? t('اختر فئات ملفات تعريف الارتباط التي تسمح بها. يمكنك تحديث تفضيلاتك أو سحب موافقتك في أي وقت من هذا القسم.', 'Choose which cookie categories you allow. You can update your preferences or withdraw your consent at any time from this section.')
            : t('نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقع هاجس، وتذكّر تفضيلاتك، وفهم كيفية استخدام الموقع. يمكنك اختيار أنواع ملفات تعريف الارتباط التي تسمح بها.', 'We use cookies to improve your experience on the Hajiss website, remember your preferences, and understand how the site is used. You can choose which types of cookies you allow.')}
        </p>

        {isSettingsView ? (
          <div className="cookie-category-list">
            <section className="cookie-category">
              <div>
                <h3>{t('ملفات تعريف الارتباط الضرورية', 'Necessary cookies')}</h3>
                <p>{t('تلزم لتشغيل الوظائف الأساسية وحفظ اختيارك، وهي مفعّلة دائمًا عند الحاجة إليها.', 'Required for core functionality and to save your choice. They are always active when needed.')}</p>
              </div>
              <button
                className="cookie-toggle cookie-toggle--locked"
                type="button"
                role="switch"
                aria-checked="true"
                aria-label={t('ملفات تعريف الارتباط الضرورية مفعّلة دائمًا', 'Necessary cookies are always on')}
                disabled
              >
                <span />
              </button>
            </section>

            <section className="cookie-category">
              <div>
                <h3>{t('ملفات تعريف الارتباط الخاصة بالتحليلات', 'Analytics cookies')}</h3>
                <p>{t('اختيارية، وتُستخدم لفهم كيفية تفاعل الزوار مع الموقع وتحسين تجربتهم.', 'Optional. Used to understand how visitors interact with the site and to improve their experience.')}</p>
              </div>
              <button
                className={`cookie-toggle ${choices.analytics ? 'cookie-toggle--enabled' : ''}`}
                type="button"
                role="switch"
                aria-checked={choices.analytics}
                aria-label={t('ملفات تعريف الارتباط الخاصة بالتحليلات', 'Analytics cookies')}
                onClick={() => setChoices((current) => ({ ...current, analytics: !current.analytics }))}
              >
                <span />
              </button>
            </section>

            <section className="cookie-category">
              <div>
                <h3>{t('ملفات تعريف الارتباط التسويقية', 'Marketing cookies')}</h3>
                <p>{t('اختيارية، وتُستخدم لأغراض التسويق والإعلانات عند تفعيل الأدوات المناسبة.', 'Optional. Used for marketing and advertising when the relevant tools are enabled.')}</p>
              </div>
              <button
                className={`cookie-toggle ${choices.marketing ? 'cookie-toggle--enabled' : ''}`}
                type="button"
                role="switch"
                aria-checked={choices.marketing}
                aria-label={t('ملفات تعريف الارتباط التسويقية', 'Marketing cookies')}
                onClick={() => setChoices((current) => ({ ...current, marketing: !current.marketing }))}
              >
                <span />
              </button>
            </section>
          </div>
        ) : (
          <p className="cookie-consent-note">
            {t('لا يستخدم الموقع حاليًا أدوات تحليلية أو تسويقية خارجية. ولن تُحمّل أي أداة اختيارية قبل الحصول على موافقتك.', 'The site does not currently use any third-party analytics or marketing tools, and no optional tool will load before you give your consent.')}
          </p>
        )}

        {storageError && (
          <p className="cookie-consent-error" role="alert">
            {storageError === 'unavailable'
              ? t('تعذر الوصول إلى مساحة حفظ التفضيلات. تحقّق من إعدادات المتصفح ثم حاول مجددًا.', 'Could not access preference storage. Check your browser settings and try again.')
              : t('تعذر حفظ تفضيلاتك. لم تُسجّل الموافقة؛ تحقّق من إعدادات المتصفح وحاول مجددًا.', 'Could not save your preferences, so your consent was not recorded. Check your browser settings and try again.')}
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
                {t('حفظ تفضيلاتي', 'Save my preferences')}
              </button>
              <button
                type="button"
                className="cookie-button cookie-button--secondary"
                onClick={() => saveChoices({ necessary: true, analytics: true, marketing: true })}
              >
                {t('قبول الكل', 'Accept all')}
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
                {t('قبول الكل', 'Accept all')}
              </button>
              <button
                type="button"
                className="cookie-button cookie-button--secondary"
                onClick={() => saveChoices({ necessary: true, analytics: false, marketing: false })}
              >
                {t('رفض ملفات تعريف الارتباط غير الضرورية', 'Reject non-essential cookies')}
              </button>
              <button
                type="button"
                className="cookie-button cookie-button--text"
                onClick={() => setShowSettings(true)}
              >
                {t('تخصيص الإعدادات', 'Customize settings')}
              </button>
            </>
          )}
        </div>

        {savedConsent && (
          <p className="cookie-consent-saved-at">
            {t('حُفظت تفضيلاتك في', 'Your preferences were saved on')} {new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'ar', { dateStyle: 'medium' }).format(new Date(savedConsent.savedAt))}.
          </p>
        )}
      </div>
    </div>
  );
};
