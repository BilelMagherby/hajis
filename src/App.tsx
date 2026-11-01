import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PhilosophySection } from './components/PhilosophySection';
import { MenuSection } from './components/MenuSection';
import { NewsSection } from './components/NewsSection';
import { VisitSection } from './components/VisitSection';
import { StoreTeaser } from './components/StoreTeaser';
import { Footer } from './components/Footer';
import { LocationMapSection } from './components/LocationMapSection';
import { ChatbotWidget } from './components/ChatbotWidget';
import { CookieConsent } from './components/CookieConsent';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { MenuPage } from './pages/MenuPage';
import { NewsPage } from './pages/NewsPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { hasDemoAdminSession } from './utils/demoAdminAuth';

export const App: React.FC = () => {
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/admin/login') {
    return hasDemoAdminSession()
      ? <Navigate to="/admin" replace />
      : <AdminLoginPage />;
  }

  if (location.pathname === '/admin') {
    return hasDemoAdminSession()
      ? <AdminDashboardPage onLogout={() => navigate('/admin/login', { replace: true })} />
      : <Navigate to="/admin/login" replace />;
  }

  const handleNavigate = (id: string) => {
    if (id === 'menu') {
      navigate('/menu');
      return;
    }

    if (id === 'news' || id === 'updates' || id === 'mostajadat') {
      navigate('/news');
      return;
    }

    if (
      location.pathname === '/menu' ||
      location.pathname === '/news' ||
      location.pathname === '/updates' ||
      location.pathname === '/mostajadat'
    ) {
      navigate('/');
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (location.pathname === '/menu') {
    return (
      <>
        <MenuPage
          onNavigate={handleNavigate}
          onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
        />
        <CookieConsent
          isLoading={false}
          openSettings={isCookieSettingsOpen}
          onCloseSettings={() => setIsCookieSettingsOpen(false)}
        />
      </>
    );
  }

  if (
    location.pathname === '/news' ||
    location.pathname === '/updates' ||
    location.pathname === '/mostajadat'
  ) {
    return (
      <>
        <NewsPage
          onNavigate={handleNavigate}
          onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
        />
        <CookieConsent
          isLoading={false}
          openSettings={isCookieSettingsOpen}
          onCloseSettings={() => setIsCookieSettingsOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="relative min-h-screen bg-[var(--color-brand-black)] text-[var(--color-brand-linen)] selection:bg-[var(--color-brand-sand)] selection:text-[var(--color-brand-black)] overflow-x-clip">
      {/* Luxury Floating Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onAdminAccess={() => navigate('/admin/login')}
        enableAdminShortcut={location.pathname === '/'}
        activeSection={
          location.pathname === '/menu'
            ? 'menu'
            : location.pathname === '/news'
            ? 'news'
            : undefined
        }
        inFlow
      />

      {/* 4. Fullscreen Hero matching mockup */}
      <main>
        <Hero />

        {/* 5. What is Hajiss? Section (Warm Cream) */}
        <AboutSection />

        {/* 6. Coffee Menu & 3D Interactive Coffee Bag */}
        <MenuSection onNavigate={handleNavigate} />

        {/* 7. Philosophy & What Distinguishes Hajiss Section */}
        <PhilosophySection />

        {/* 8. News & Updates Teaser Section */}
        <NewsSection onNavigate={handleNavigate} />

        {/* 9. Visit Hajiss & 3D Hail Topographic Map */}
        <VisitSection />

        {/* 10. Online Store Teaser & QR Code */}
        <StoreTeaser />

        {/* 11. Hajiss location */}
        <LocationMapSection />
      </main>

      {/* 12. Dark Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
      />

      <ChatbotWidget />
      <CookieConsent
        isLoading={false}
        openSettings={isCookieSettingsOpen}
        onCloseSettings={() => setIsCookieSettingsOpen(false)}
      />
    </div>
  );
};

export default App;
