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
    <section id="about" className="py-14 sm:py-18 bg-white border-b border-slate-200/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading in brand crimson/navy style */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] tracking-tight uppercase font-['Outfit',sans-serif]">
          {t.welcomeHeading}
        </h2>
        
        {/* Hairline brand accent line */}
        <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-6 rounded-full" />

        {/* Authentic introductory paragraph from Image 6 */}
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto font-normal">
          Jambo, Welcome to East Africa, a land of adventure, beauty, and unforgettable experiences.
          Travel with Push World Travel Ltd. We provide tailor-made, socially responsible
          wildlife safaris, gorilla trekking, and beach holidays. Our enduring promise to you is a hearty,
          quality, and unique service that gives you true Value for Money.
        </p>

        {/* Tagline Callout */}
        <div className="mt-7">
          <p className="text-lg sm:text-xl font-bold text-[#ea580c] tracking-wide italic font-serif">
            {t.welcomeQuote}
          </p>
        </div>

        {/* Quick CTA button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onRequestQuoteClick}
            className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-[#0a2265] hover:bg-[#103088] shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Request A Tailored Itinerary
          </button>
          <a
            href="tel:+254725356926"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#ea580c]" />
            Call &amp; WhatsApp: 0725 356 926
          </a>
        </div>
      </div>
    </section>
  );
};
