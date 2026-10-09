import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PhilosophySection } from './components/PhilosophySection';
import { MenuSection } from './components/MenuSection';
import { V60Section } from './components/V60Section';
import { VisitSection } from './components/VisitSection';
import { StoreTeaser } from './components/StoreTeaser';
import { Footer } from './components/Footer';
import { LocationMapSection } from './components/LocationMapSection';
import { CustomCursor } from './components/CustomCursor';
import { ChatbotWidget } from './components/ChatbotWidget';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuBookPage } from './pages/MenuBookPage';
import { Navigate } from 'react-router-dom';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { hasDemoAdminSession } from './utils/demoAdminAuth';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
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

    if (location.pathname === '/menu') {
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
        <MenuBookPage onNavigate={handleNavigate} />
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </>
    );
  }

  return (
    <div className="relative min-h-screen bg-[var(--color-brand-black)] text-[var(--color-brand-linen)] selection:bg-[var(--color-brand-sand)] selection:text-[var(--color-brand-black)] overflow-x-clip">
      {/* 1. Cinematic Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Custom Sand Desktop Cursor */}
      <CustomCursor />

      {/* 3. Luxury Floating Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onAdminAccess={() => navigate('/admin/login')}
        enableAdminShortcut={location.pathname === '/'}
        activeSection={location.pathname === '/menu' ? 'menu' : undefined}
        inFlow
      />

      {/* 4. Fullscreen Hero matching mockup */}
      <main>
        <Hero />

        {/* 5. What is Hajiss? Section (Warm Cream) */}
        <AboutSection />

        {/* 6. Philosophy & What Distinguishes Hajiss Section */}
        <PhilosophySection />

        {/* 7. Coffee Menu & 3D Interactive Coffee Bag */}
        <MenuSection onNavigate={handleNavigate} />

        {/* 8. Dedicated V60 Pour-Over Ritual Section */}
        <V60Section />

        {/* 9. Visit Hajiss & 3D Hail Topographic Map */}
        <VisitSection />

        {/* 10. Online Store Teaser & QR Code */}
        <StoreTeaser />

        {/* 11. Hajiss location */}
        <LocationMapSection />
      </main>

      {/* 12. Dark Luxury Footer */}
      <Footer onNavigate={handleNavigate} />

      <ChatbotWidget />
    </div>
  );
};

export default App;
