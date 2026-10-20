import React, { useState } from 'react';
import { Phone, ChevronDown, Menu, X, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CountryFlag } from './CountryFlag';
import { COMPANY_INFO, LANGUAGES } from '../data/travelData';
import { SupportedLanguage } from '../types/travel';
import { TRANSLATIONS } from '../data/translations';

interface TopBarProps {
  currentPage: string;
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onRequestQuoteClick: () => void;
  onNavigate: (page: string, destinationId?: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentPage,
  currentLang,
  onLanguageChange,
  onRequestQuoteClick,
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'services', label: t.services },
    { id: 'tours', label: t.tours },
    { id: 'destinations', label: t.destinations, hasDropdown: true },
    { id: 'gallery', label: t.gallery },
    { id: 'about', label: t.aboutUs },
    { id: 'contact', label: t.contactUs },
  ];

  const quickDestinations = [
    { id: 'hells-gate', name: "Hell's Gate National Park", country: 'Kenya' },
    { id: 'ol-pejeta', name: 'Olpejeta Conservancy', country: 'Kenya' },
    { id: 'masai-mara', name: 'Maasai Mara National Reserve', country: 'Kenya' },
    { id: 'amboseli', name: 'Amboseli National Park', country: 'Kenya' },
    { id: 'lake-nakuru', name: 'Lake Nakuru National Park', country: 'Kenya' },
    { id: 'serengeti', name: 'Serengeti National Park', country: 'Tanzania' },
    { id: 'ngorongoro', name: 'Ngorongoro Crater', country: 'Tanzania' },
    { id: 'volcanoes-np', name: 'Volcanoes National Park', country: 'Rwanda' },
  ];

  const handleNavClick = (pageId: string, destId?: string) => {
    onNavigate(pageId, destId);
    setIsMobileMenuOpen(false);
    setIsDestDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Brand Logo - As Shared: Globe, Orbit Jet, PUSH WORLD TRAVEL LTD */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer shrink-0 py-1 focus:outline-none"
            role="button"
            tabIndex={0}
            aria-label="Push World Travel Home"
          >
            <BrandLogo size="md" />
          </div>

          {/* Navigation Links - Desktop with distinct active styling & Destination Arrow */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[13px] font-bold tracking-wider text-slate-800">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setIsDestDropdownOpen(true)}
                    onMouseLeave={() => setIsDestDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer uppercase py-1 border-b-2 font-['Outfit',sans-serif] ${
                        isActive
                          ? 'text-[#ea580c] border-[#ea580c] font-extrabold'
                          : 'text-slate-700 hover:text-[#ea580c] border-transparent font-bold'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDestDropdownOpen ? 'rotate-180 text-[#ea580c]' : 'text-slate-400 group-hover:text-[#ea580c]'
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu when hovering/clicking Destinations */}
                    {isDestDropdownOpen && (
                      <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 text-left">
                        <div className="px-3.5 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                          <span>Choose Destination</span>
                          <span className="text-[#ea580c] text-[10px]">Explore All →</span>
                        </div>
                        <div className="py-1 max-h-72 overflow-y-auto">
                          {quickDestinations.map((dest) => (
                            <button
                              key={dest.id}
                              onClick={() => handleNavClick('destinations', dest.id)}
                              className="w-full px-3.5 py-2 text-xs flex items-center justify-between text-slate-700 hover:bg-orange-50 hover:text-[#ea580c] transition-colors cursor-pointer group/dest"
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover/dest:text-[#ea580c]" />
                                <span className="font-semibold">{dest.name}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 uppercase">
                                {dest.country}
                              </span>
                            </button>
                          ))}
                        </div>
                        <div className="pt-1.5 px-3 border-t border-slate-100">
                          <button
                            onClick={() => handleNavClick('destinations')}
                            className="w-full text-center text-xs font-bold text-[#0a2265] hover:text-[#ea580c] py-1 cursor-pointer flex items-center justify-center gap-1"
                          >
                            <span>View All Destinations Guide</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors whitespace-nowrap cursor-pointer uppercase py-1 border-b-2 font-['Outfit',sans-serif] ${
                    isActive
                      ? 'text-[#ea580c] border-[#ea580c] font-extrabold'
                      : 'text-slate-700 hover:text-[#ea580c] border-transparent font-bold'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Primary Action Button */}
            <button
              onClick={onRequestQuoteClick}
              className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide uppercase text-white bg-[#801416] hover:bg-[#991b1b] rounded-md shadow-xs transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 hidden sm:inline" />
              {t.requestQuote}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer"
                aria-expanded={isLangDropdownOpen}
                aria-label="Select Language"
              >
                <CountryFlag code={currentLang} className="w-5 h-3.5" />
                <span className="hidden sm:inline font-medium">{currentLangObj.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isLangDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setIsLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Select Language
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code as SupportedLanguage);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-orange-50 text-[#ea580c] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <CountryFlag code={lang.code} className="w-5 h-3.5" />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-md focus:outline-none cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 text-left">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full px-3 py-2 text-left text-sm font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                      isActive ? 'bg-orange-50 text-[#ea580c]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {/* Sub-destinations list on mobile if destinations */}
                  {item.hasDropdown && (
                    <div className="pl-4 py-1 space-y-1">
                      {quickDestinations.slice(0, 5).map((dest) => (
                        <button
                          key={dest.id}
                          onClick={() => handleNavClick('destinations', dest.id)}
                          className="w-full text-left text-xs py-1 px-2 text-slate-600 hover:text-[#ea580c] flex items-center gap-1.5"
                        >
                          <MapPin className="w-3 h-3 text-[#ea580c]" />
                          <span>{dest.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Quick Language Switcher inside Mobile Drawer */}
          <div className="pt-2 pb-1 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
              Select Language
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code as SupportedLanguage);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                    currentLang === lang.code
                      ? 'border-[#ea580c] bg-orange-50 text-[#ea580c]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CountryFlag code={lang.code} className="w-4.5 h-3" />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:+254725356926"
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 px-3 py-2 bg-slate-50 rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#801416]" />
              <span>Call / WhatsApp: 0725 356 926</span>
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onRequestQuoteClick();
              }}
              className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white bg-[#801416] rounded-lg shadow-sm"
            >
              {t.requestQuote}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
