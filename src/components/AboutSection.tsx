import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Car,
} from 'lucide-react';
import { COMPANY_INFO, FAQS, LIONESS_HERO_IMAGE, KENYA_IMAGE } from '../data/travelData';
import { SupportedLanguage } from '../types/travel';
import { TRANSLATIONS } from '../data/translations';

interface AboutSectionProps {
  currentLang?: SupportedLanguage;
  onContactClick?: () => void;
  onRequestQuoteClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  currentLang = 'en',
  onContactClick,
  onRequestQuoteClick,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const t = TRANSLATIONS[currentLang];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Header Banner */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
        <img
          src={KENYA_IMAGE}
          alt="Push World Travel East Africa"
          className="w-full h-full object-cover object-center opacity-65"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-black/30" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-400 bg-black/40 px-3.5 py-1.5 rounded-full backdrop-blur-xs inline-block mb-3 border border-amber-400/30">
            About Our Company
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-['Outfit',sans-serif]">
            Push World Travel Ltd
          </h1>
          <p className="text-sm sm:text-base text-amber-200 italic font-serif mt-2">
            “{COMPANY_INFO.slogan}” · {COMPANY_INFO.tagline}
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-4 rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left">
        {/* 2. Company Story & Physical Presence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ea580c] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Push Building, Thome · Northern Bypass, Nairobi
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0a2265] tracking-tight font-['Outfit',sans-serif]">
              Crafting Unforgettable East African Safaris &amp; Tours
            </h2>
            <p className="text-justify font-normal">
              Headquartered at <strong className="text-slate-900">Push Building, Thome along the Northern Bypass in Nairobi, Kenya</strong>, Push World Travel Ltd is dedicated to offering personalized, premium wildlife safaris, gorilla trekking adventures, Swahili beach holidays in Zanzibar and Diani, and reliable corporate travel solutions.
            </p>
            <p className="text-justify font-normal">
              Our philosophy revolves around authenticity, safety, and tailored itineraries. We ensure every traveler experiences the breathtaking beauty and wildlife of East Africa with seasoned local guides and comfortable 4x4 vehicles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#801416] shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-slate-900">Physical Office Hub</span>
                  <span className="text-[11px] text-slate-500">Push Building, Thome, Northern Bypass</span>
                </div>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#801416] shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-slate-900">Dedicated Support</span>
                  <span className="text-[11px] text-slate-500">0725 356 926 (Call &amp; WhatsApp)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
              <img
                src={LIONESS_HERO_IMAGE}
                alt="Push World Travel East Africa"
                className="w-full h-80 object-cover"
              />
              <div className="p-5 bg-white">
                <span className="text-xs font-bold text-[#801416] uppercase tracking-wider block">
                  Untamed East Africa
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  Private wildlife expeditions designed to immerse you in nature’s most magnificent moments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Our Fleet & Guides Section */}
        <div className="mb-16 bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1">
              Field Operations &amp; Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] font-['Outfit',sans-serif]">
              Custom Safari Fleet &amp; Expert Naturalist Guides
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mt-2 mb-4 rounded-full" />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              The quality of your safari vehicle and guide directly defines your experience in the African bush. We maintain stringent operational standards to ensure maximum safety, comfort, and photographic vantage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-[#ea580c] flex items-center justify-center mb-3">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit',sans-serif]">
                Custom 4x4 Land Cruisers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specially converted Toyota Land Cruisers fitted with wide pop-up roofs for 360-degree photography, large openable sliding windows, and heavy-duty suspension.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#0a2265] flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit',sans-serif]">
                KPSGA Gold &amp; Silver Guides
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our safari directors are certified local naturalists with profound knowledge of wildlife animal behavior, botany, tracking, and East African cultural history.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit',sans-serif]">
                Onboard Amenities &amp; Radio
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equipped with cooler fridge boxes, device inverter charging sockets, long-range binoculars, wildlife field guidebooks, and HF two-way radio dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Best Tours & Travel Company Text & Comprehensive FAQ Accordion */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-xs">
          {/* Authentic Intro Text from Screenshot 2 */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] tracking-tight uppercase font-['Outfit',sans-serif]">
              Best Tours and Travel Company
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-6 rounded-full" />
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
              If you’re looking for the ultimate travel experience, you’ve come to the right place. At Push World Travel Ltd, we believe that traveling should be accessible and enjoyable for everyone. That’s why we offer a wide range of tour packages catering to different budgets, preferences, and interests. As a leading travel agency in Kenya, we have years of experience in the industry, and we know what it takes to create memorable and life-changing holiday packages. Whether you’re looking for cultural immersion, wildlife safaris, beach getaways, or adrenaline-fueled adventures, we’ve got you covered.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="max-w-3xl mx-auto space-y-3">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#ea580c]" />
              Frequently Asked Questions
            </h3>

            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-[#ea580c]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct CTA */}
          <div className="mt-10 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-slate-600 mb-3">
              Have a specific question not covered here? Reach out to our Push Building, Thome, Northern Bypass office directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {onContactClick && (
                <button
                  onClick={onContactClick}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#801416] hover:bg-[#991b1b] rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Contact Our Team
                </button>
              )}
              {onRequestQuoteClick && (
                <button
                  onClick={onRequestQuoteClick}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0a2265] bg-white border border-[#0a2265] hover:bg-slate-50 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Request A Quote
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
