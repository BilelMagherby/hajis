/**
 * Google Analytics 4 for the public website only.
 *
 * - Loads gtag.js only after the visitor allows analytics cookies in the cookie banner, and only
 *   on the production domain, so local development and Vercel previews send nothing.
 * - Never tracks the admin area (/admin, /admin/login): GA is not loaded when a visit starts there,
 *   and GA's documented opt-out flag (`ga-disable-<ID>`) blocks every hit while an admin page is open.
 * - Page views, scrolls, outbound clicks, etc. come from GA4 Enhanced measurement, including
 *   page changes in this single-page app (GA listens to browser history changes).
 */

const MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() || 'G-D87MJ39WRX';
const PRODUCTION_HOSTS = ['hajiss.com', 'www.hajiss.com'];
const CONSENT_STORAGE_KEY = 'hajiss-cookie-consent';
export const CONSENT_CHANGED_EVENT = 'hajiss-consent-changed';

type Gtag = (...args: unknown[]) => void;
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: Gtag } & Record<string, unknown>;
type Choices = { analytics: boolean; marketing: boolean };

const win = window as unknown as AnalyticsWindow;
const disableFlag = `ga-disable-${MEASUREMENT_ID}`;

export const isAdminPath = (pathname: string) => pathname === '/admin' || pathname.startsWith('/admin/');

const isEnabledHost = () =>
  PRODUCTION_HOSTS.includes(window.location.hostname) || import.meta.env.VITE_GA_FORCE === 'true';

function readChoices(): Choices {
  try {
    const saved = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? 'null') as { choices?: Partial<Choices> } | null;
    return { analytics: saved?.choices?.analytics === true, marketing: saved?.choices?.marketing === true };
  } catch {
    return { analytics: false, marketing: false };
  }
}

const consentState = ({ analytics, marketing }: Choices) => ({
  analytics_storage: analytics ? 'granted' : 'denied',
  ad_storage: marketing ? 'granted' : 'denied',
  ad_user_data: marketing ? 'granted' : 'denied',
  ad_personalization: marketing ? 'granted' : 'denied',
});

let loaded = false;
let currentLanguage = document.documentElement.lang || 'ar';

// GA reads the opt-out flag on every hit, so setting it before a route change also stops the
// automatic page view that Enhanced measurement sends for that change.
const setBlocked = (blocked: boolean) => {
  win[disableFlag] = blocked || !readChoices().analytics;
};

function load(choices: Choices) {
  if (loaded) return;
  loaded = true;
  win.dataLayer = win.dataLayer || [];
  // gtag must push the real `arguments` object, as in Google's snippet.
  win.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    win.dataLayer!.push(arguments);
  };
  win.gtag('consent', 'default', consentState(choices));
  win.gtag('js', new Date());
  win.gtag('set', 'user_properties', { site_language: currentLanguage });
  win.gtag('config', MEASUREMENT_ID, ...(import.meta.env.VITE_GA_DEBUG === 'true' ? [{ debug_mode: true }] : []));
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

// Removes GA's first-party cookies when the visitor withdraws consent.
function clearCookies() {
  const domains = ['', window.location.hostname, `.${window.location.hostname.replace(/^www\./, '')}`];
  for (const name of document.cookie.split(';').map((part) => part.split('=')[0].trim())) {
    if (name !== '_ga' && !name.startsWith('_ga_')) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

/** Applies the latest cookie choice and the current route. Safe to call repeatedly. */
export function syncAnalytics(pathname: string) {
  if (!isEnabledHost()) return;
  const choices = readChoices();
  const onAdmin = isAdminPath(pathname);
  setBlocked(onAdmin);
  if (!choices.analytics) {
    if (loaded) {
      win.gtag?.('consent', 'update', consentState(choices));
      clearCookies();
    }
    return;
  }
  if (!loaded) {
    // A visit that starts in the admin area never loads GA; it loads once the visitor reaches the site.
    if (!onAdmin) load(choices);
    return;
  }
  win.gtag?.('consent', 'update', consentState(choices));
}

export function setAnalyticsLanguage(language: string) {
  currentLanguage = language;
  if (loaded) win.gtag?.('set', 'user_properties', { site_language: language });
}

/**
 * Blocks hits synchronously whenever the app navigates into the admin area, before GA sees the
 * history change. Wrapping happens once, before gtag.js loads and adds its own history listener.
 */
export function installAnalyticsGuard() {
  if (!isEnabledHost()) return;
  for (const method of ['pushState', 'replaceState'] as const) {
    const original = window.history[method];
    window.history[method] = function guarded(this: History, data: unknown, unused: string, url?: string | URL | null) {
      if (url !== undefined && url !== null) {
        setBlocked(isAdminPath(new URL(String(url), window.location.href).pathname));
      }
      return original.call(this, data, unused, url);
    };
  }
  window.addEventListener('popstate', () => setBlocked(isAdminPath(window.location.pathname)));
  setBlocked(isAdminPath(window.location.pathname));
}
