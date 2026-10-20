import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { TOP_FOOTER_DESTINATIONS, LANGUAGES } from '../data/travelData';
import { SupportedLanguage } from '../types/travel';
import { TRANSLATIONS } from '../data/translations';
import { BrandLogo } from './BrandLogo';
import { CountryFlag } from './CountryFlag';

interface FooterProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onRequestQuoteClick: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenPolicyModal: (policyName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onRequestQuoteClick,
  onNavigate,
  onOpenPolicyModal,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer className="bg-[#7f1315] text-white pt-10 pb-8 transition-colors border-t-4 border-[#ff7700]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Official Brand Logo Row - Centered on Mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-white/15 text-center sm:text-left">
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm inline-flex items-center justify-center">
            <BrandLogo size="footer" />
          </div>
          <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
            <span className="text-amber-300 font-bold text-sm tracking-wide block font-serif italic">
              "Your World. Our Journey."
            </span>
            <span className="text-xs text-white/90 font-medium block mt-1">
              Push Building, Thome
            </span>
            <span className="text-xs text-white/80 block mt-0.5">
              Northern Bypass, Nairobi, Kenya
            </span>
          </div>
        </div>

        {/* Main Columns - Centered on Mobile, Left-aligned on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-sm text-center sm:text-left">
          {/* Column 1: Top Destinations */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide font-['Outfit',sans-serif]">
              Top Destinations
            </h4>
            <ul className="space-y-2 text-white/85 text-xs sm:text-[13px]">
              {TOP_FOOTER_DESTINATIONS.slice(0, 6).map((dest) => (
                <li key={dest}>
                  <button
                    onClick={() => onNavigate('destinations')}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {dest}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide font-['Outfit',sans-serif]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-white/85 text-xs sm:text-[13px]">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tours')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Safari Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicyModal('Terms and Conditions')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicyModal('Privacy Policy')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Real Social Media Icons */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide font-['Outfit',sans-serif]">
              Get in Touch
            </h4>
            <div className="space-y-2.5 text-white/85 text-xs sm:text-[13px]">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a
                  href="tel:+254725356926"
                  className="hover:text-amber-300 font-semibold"
                >
                  0725 356 926
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a
                  href="mailto:pushworldtravel@gmail.com"
                  className="hover:text-amber-300 font-semibold"
                >
                  pushworldtravel@gmail.com
                </a>
              </div>
            </div>

            {/* Real Updated Social Media Icons */}
            <div className="mt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">
                Follow Push World
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#1877f2] text-white flex items-center justify-center transition-all duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#e4405f] text-white flex items-center justify-center transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/254725356926"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#25d366] text-white flex items-center justify-center transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#ff0000] text-white flex items-center justify-center transition-all duration-200"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Our Office */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide font-['Outfit',sans-serif]">
              Our Office
            </h4>
            <div className="space-y-2 text-white/90 text-xs sm:text-[13px]">
              <span className="font-black tracking-wider text-amber-300 block">
                KENYA
              </span>
              <div className="flex items-start justify-center sm:justify-start gap-2">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Push Building, Thome, Northern Bypass, Nairobi</span>
              </div>
              <span className="text-[11px] text-white/70 block mt-1 sm:ml-6">
                Headquarters &amp; Dispatch Fleet Hub
              </span>
            </div>
          </div>
        </div>

        {/* Thin Divider */}
        <div className="w-full h-[1px] bg-white/15 mt-8 mb-5" />

        {/* Bottom Bar: Copyright & Clean Language Flags - Centered on Mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Push World Travel Ltd. {t.allRightsReserved}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code as SupportedLanguage)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors cursor-pointer ${
                  currentLang === lang.code
                    ? 'text-amber-300 font-bold bg-white/15'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
                title={lang.name}
              >
                <CountryFlag code={lang.code} className="w-4.5 h-3" />
                <span className="text-[11px]">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
