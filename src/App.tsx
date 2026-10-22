/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { HomeSection } from './components/HomeSection';
import { ServicesSection } from './components/ServicesSection';
import { ToursSection } from './components/ToursSection';
import { DestinationsSection } from './components/DestinationsSection';
import { TravelGallery } from './components/TravelGallery';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { KenyaEtaSection } from './components/KenyaEtaSection';
import { Footer } from './components/Footer';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { FloatingQuoteWidget } from './components/FloatingQuoteWidget';
import { PolicyModal } from './components/PolicyModal';
import { SupportedLanguage, TourPackage } from './types/travel';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useEffect } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin') return 'admin';
      if (path === '/eta' || hash === '#eta') return 'eta';
    }
    return 'home';
  });
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState<{
    destination?: string;
    safariType?: string;
    packageName?: string;
  }>({});
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('hells-gate');

  useEffect(() => {
    const handleUrlCheck = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin') {
        setCurrentPage('admin');
      } else if (path === '/eta' || hash === '#eta') {
        setCurrentPage('eta');
      }
    };
    window.addEventListener('popstate', handleUrlCheck);
    return () => window.removeEventListener('popstate', handleUrlCheck);
  }, []);

  const navigateToPage = (pageId: string, destinationId?: string) => {
    if (destinationId) {
      setSelectedDestinationId(destinationId);
    }
    if (pageId === 'admin') {
      window.history.pushState(null, '', '/admin');
      setCurrentPage('admin');
    } else if (pageId === 'faq') {
      if (window.location.pathname === '/admin') window.history.pushState(null, '', '/');
      setCurrentPage('about');
    } else {
      if (window.location.pathname === '/admin') window.history.pushState(null, '', '/');
      setCurrentPage(pageId);
    }
    if (!destinationId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenQuoteWithData = (data?: {
    destination?: string;
    safariType?: string;
    packageName?: string;
  }) => {
    setQuoteInitialData(data || {});
    setIsQuoteModalOpen(true);
  };

  const handleSelectPackageForQuote = (pkg: TourPackage) => {
    handleOpenQuoteWithData({
      destination: pkg.countries.join(', '),
      packageName: pkg.title,
    });
  };

  const handleInquireService = (serviceTitle: string) => {
    handleOpenQuoteWithData({
      safariType: serviceTitle,
      packageName: `Inquiry: ${serviceTitle}`,
    });
  };

  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
        <AdminDashboard onNavigateHome={() => navigateToPage('home')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Header Navigation with Active Page Indicators */}
      <TopBar
        currentPage={currentPage}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onRequestQuoteClick={() => handleOpenQuoteWithData()}
        onNavigate={navigateToPage}
      />

      {/* 2. Main Viewport Content - Rendered strictly per dedicated Page */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeSection
            currentLang={currentLang}
            onNavigate={navigateToPage}
            onRequestQuoteClick={handleOpenQuoteWithData}
          />
        )}

        {currentPage === 'services' && (
          <div className="py-6">
            <ServicesSection onInquireService={handleInquireService} />
          </div>
        )}

        {currentPage === 'tours' && (
          <ToursSection
            onSelectPackageForQuote={handleSelectPackageForQuote}
            onRequestQuoteWithDestination={(dest) =>
              handleOpenQuoteWithData({ destination: dest })
            }
          />
        )}

        {currentPage === 'destinations' && (
          <DestinationsSection
            initialDestinationId={selectedDestinationId}
            onSelectDestinationForQuote={(destName) =>
              handleOpenQuoteWithData({ destination: destName })
            }
            onExploreTours={() => navigateToPage('tours')}
          />
        )}

        {currentPage === 'gallery' && (
          <div className="py-6">
            <TravelGallery />
          </div>
        )}

        {currentPage === 'about' && (
          <AboutSection
            currentLang={currentLang}
            onContactClick={() => navigateToPage('contact')}
            onRequestQuoteClick={() => handleOpenQuoteWithData()}
          />
        )}

        {currentPage === 'contact' && <ContactSection />}

        {currentPage === 'eta' && (
          <KenyaEtaSection
            onNavigateHome={() => navigateToPage('home')}
            onContactClick={() => navigateToPage('contact')}
          />
        )}
      </main>

      {/* 3. Footer with Northern By-Pass Location and No Tanzania Office */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onRequestQuoteClick={() => handleOpenQuoteWithData()}
        onNavigate={navigateToPage}
        onOpenPolicyModal={setSelectedPolicy}
      />

      {/* Floating Quote & WhatsApp Quick Action Widget */}
      <FloatingQuoteWidget onRequestQuoteClick={() => handleOpenQuoteWithData()} />

      {/* Interactive Tailor-Made Quote Planner Modal */}
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialData={quoteInitialData}
      />

      {/* Policy Modal for Terms, Privacy, Amendment, Cancellation, Payment */}
      <PolicyModal
        policyName={selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
      />
    </div>
  );
}
