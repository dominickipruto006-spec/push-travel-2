import React from 'react';
import { Sparkles, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { SupportedLanguage } from '../types/travel';
import { TRANSLATIONS } from '../data/translations';

interface IntroBannerProps {
  currentLang: SupportedLanguage;
  onRequestQuoteClick: () => void;
}

export const IntroBanner: React.FC<IntroBannerProps> = ({
  currentLang,
  onRequestQuoteClick,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="about" className="relative py-14 sm:py-18 bg-white border-b border-slate-200/70 overflow-hidden">
      {/* Faded Background Image - Image 1 (Sunset Karst Bay & Cruise Ship) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/bg_section1_sunset_karst.png"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/aistudio/image_6efe0117.png';
          }}
          alt="Push World Travel Sunset Cruise Destination"
          className="w-full h-full object-cover object-center opacity-55 sm:opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white/95 backdrop-blur-md px-6 sm:px-10 py-8 sm:py-10 rounded-2xl border border-white/90 shadow-lg text-center">
          {/* Section Heading in brand crimson/navy style */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] tracking-tight uppercase font-['Outfit',sans-serif]">
            {t.welcomeHeading}
          </h2>
          
          {/* Hairline brand accent line */}
          <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-6 rounded-full" />

          {/* Authentic introductory paragraph from Image 6 */}
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
            Jambo, Welcome to East Africa, a land of adventure, beauty, and unforgettable experiences.
            Travel with Push World Travel Ltd. We provide tailor-made, socially responsible
            wildlife safaris, gorilla trekking, and beach holidays. Our enduring promise to you is a hearty,
            quality, and unique service that gives you true Value for Money.
          </p>

          {/* Tagline Callout */}
          <div className="mt-6">
            <p className="text-lg sm:text-xl font-bold text-[#ea580c] tracking-wide italic font-serif">
              {t.welcomeQuote}
            </p>
          </div>

          {/* Quick CTA button & Phone Numbers */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onRequestQuoteClick}
              className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-[#0a2265] hover:bg-[#103088] shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Request A Tailored Itinerary
            </button>
            <a
              href="tel:+254725356926"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-slate-800 bg-white border border-slate-200/90 hover:bg-slate-50 shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>0725 356 926</span>
            </a>
            <a
              href="tel:+254181223222"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-slate-800 bg-white border border-slate-200/90 hover:bg-slate-50 shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#0a2265]" />
              <span>+254 181 223 222</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
