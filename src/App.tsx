/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { InteractiveAuditWidget } from './components/InteractiveAuditWidget';
import { PayoutCalculator } from './components/PayoutCalculator';
import { TrustPrivacySection } from './components/TrustPrivacySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AuditModal } from './components/AuditModal';
import { AuthModal, UserProfile } from './components/AuthModal';

import { AuditPage } from './pages/AuditPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { FAQPage } from './pages/FAQPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'audit' | 'calculator' | 'faqs'>('home');
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Respect user prefers-reduced-motion
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    // Initialize Lenis smooth inertial scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleOpenCalculator = () => {
    setActivePage('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAudit = () => {
    setActivePage('audit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-900">
      
      {/* Navigation Header */}
      <Navbar
        currentUser={currentUser}
        activePage={activePage}
        onNavigatePage={(page) => setActivePage(page)}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenAudit={handleOpenAudit}
        onOpenCalculator={handleOpenCalculator}
      />

      {/* Page Routing */}
      <main>
        {activePage === 'home' && (
          <>
            <HeroSection
              onOpenAudit={handleOpenAudit}
              onOpenCalculator={handleOpenCalculator}
            />
            <HowItWorksSection />
            <InteractiveAuditWidget />
            <PayoutCalculator />
            <TrustPrivacySection />
            <TestimonialsSection />
            <FAQSection />
            <FinalCTA
              onOpenAudit={handleOpenAudit}
              onOpenCalculator={handleOpenCalculator}
            />
          </>
        )}

        {activePage === 'audit' && (
          <AuditPage
            onBackToHome={() => setActivePage('home')}
            onNavigateToCalculator={() => setActivePage('calculator')}
          />
        )}

        {activePage === 'calculator' && (
          <CalculatorPage
            onBackToHome={() => setActivePage('home')}
            onNavigateToAudit={() => setActivePage('audit')}
          />
        )}

        {activePage === 'faqs' && (
          <FAQPage
            onBackToHome={() => setActivePage('home')}
            onNavigateToAudit={() => setActivePage('audit')}
            onNavigateToCalculator={() => setActivePage('calculator')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigatePage={(page) => setActivePage(page)} />

      {/* Interactive Free Document Audit Modal */}
      <AuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />

      {/* Login / Sign Up Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

    </div>
  );
}


