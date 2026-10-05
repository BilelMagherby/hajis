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
import { CustomCursor } from './components/CustomCursor';
import { ambientAudio } from './utils/ambientAudio';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleToggleAudio = () => {
    const active = ambientAudio.toggle();
    setIsAudioPlaying(active);
  };

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090604] text-[#F8F4EC] selection:bg-[#C8A46A] selection:text-[#090604]">
      {/* 1. Cinematic Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Custom Gold Desktop Cursor */}
      <CustomCursor />

      {/* 3. Luxury Floating Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={handleToggleAudio}
      />

      {/* 4. Fullscreen Hero matching mockup */}
      <main>
        <Hero
          onDiscoverClick={() => handleNavigate('about')}
        />

        {/* 5. What is Hajiss? Section (Warm Cream) */}
        <AboutSection />

        {/* 6. Philosophy & What Distinguishes Hajiss Section */}
        <PhilosophySection />

        {/* 7. Coffee Menu & 3D Interactive Coffee Bag */}
        <MenuSection />

        {/* 8. Dedicated V60 Pour-Over Ritual Section */}
        <V60Section />

        {/* 9. Visit Hajiss & 3D Hail Topographic Map */}
        <VisitSection />

        {/* 10. Online Store Teaser & QR Code */}
        <StoreTeaser />
      </main>

      {/* 11. Dark Luxury Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
