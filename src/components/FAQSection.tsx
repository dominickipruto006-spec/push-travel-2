import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/travelData';
import { SupportedLanguage } from '../types/travel';
import { TRANSLATIONS } from '../data/translations';

interface FAQSectionProps {
  currentLang: SupportedLanguage;
  onContactClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ currentLang, onContactClick }) => {
  const t = TRANSLATIONS[currentLang];
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* "Best Tours and Travel Company" Editorial Section from Screenshot 2 */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] tracking-tight font-['Outfit',sans-serif]">
            Best Tours and Travel Company
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-6 rounded-full" />

          <div className="text-left sm:text-center text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
            <p>
              If you’re looking for the ultimate travel experience, you’ve come to the right place. At Push World Travel Ltd, we provide top-quality tours and packages that cater to every traveler’s needs. As a leading travel agency in Kenya, we have years of experience crafting unforgettable holiday tour packages that offer something for everyone. Whether you’re looking to explore the vibrant culture of Kenya, marvel at the incredible wildlife, or soak up the sun on the beaches, our expert team of tours company in Kenya has got you covered. We are your trusted Kenya tour operators, offering comprehensive and customized tours that take you on a lifetime journey across East Africa.
            </p>
            <p>
              With years of experience in the industry, we offer the best and most comprehensive travel services and packages in Kenya and East Africa. Our dedicated and experienced professionals are committed to ensuring that every aspect of your travel is taken care of, from transport and accommodation to activities and excursions. Whether you are planning a family vacation, a romantic getaway(Honeymoons), or an adventurous trip with friends, Push World Travel Ltd has the perfect tour package. We are your ultimate guide to an unforgettable experience in East Africa today.
            </p>
            <p className="font-semibold text-[#ea580c]">
              So why wait? Contact us today, and let us help you plan the trip of a lifetime!
            </p>
          </div>
        </div>

        {/* "Push World Travel FAQ" from Screenshot 2 */}
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] tracking-tight font-['Outfit',sans-serif]">
            {t.faqTitle}
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-6 rounded-full" />
        </div>

        {/* Accordion Questions List matching Screenshot 2 */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="border-b border-slate-200 pb-3 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left py-2.5 flex items-center justify-between gap-4 cursor-pointer group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-900 group-hover:text-[#ea580c] transition-colors font-bold text-sm sm:text-base">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#ea580c] inline shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-700 group-hover:text-[#ea580c] inline shrink-0" />
                      )}
                    </span>
                    <span className="font-semibold text-slate-900 group-hover:text-[#ea580c] transition-colors text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-2 pb-3 pl-7 pr-2 text-slate-600 text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0a2265] flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 text-[#ea580c]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Have more specific questions about visas, health, or packing?
              </h4>
              <p className="text-xs text-slate-500">
                Our safari experts are available 24/7 on phone, email, and live WhatsApp.
              </p>
            </div>
          </div>
          <button
            onClick={onContactClick}
            className="px-5 py-2 text-xs font-bold text-white bg-[#0a2265] hover:bg-[#103088] rounded-lg transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Ask a Specialist
          </button>
        </div>
      </div>
    </section>
  );
};
