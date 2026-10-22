import React from 'react';
import { WHY_CHOOSE_US_POINTS } from '../data/travelData';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-white border-b border-slate-200/80 overflow-hidden">
      {/* Faded Background Image - 3rd image from user (Topi Antelopes Sparring in Savanna) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/bg_why_choose_us.png"
          alt="Topi Antelopes Sparring in Savanna"
          className="w-full h-full object-cover object-center opacity-55 sm:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/10 to-white/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Screenshot 3 */}
        <div className="text-center max-w-3xl mx-auto mb-12 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/90 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] tracking-tight uppercase font-['Outfit',sans-serif]">
            WHY CHOOSE US
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
            Over two decades of safari excellence, custom 4x4 vehicles, certified naturalist guides, and 24/7 dedicated guest support.
          </p>
        </div>

        {/* 3 Column Feature Cards with Paw Print Icon matching Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {WHY_CHOOSE_US_POINTS.map((point) => (
            <div
              key={point.id}
              className="p-8 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all relative flex flex-col justify-start"
            >
              {/* Paw Icon matching the screenshot */}
              <div className="mb-5 text-[#0a2265]">
                <svg
                  className="w-7 h-7 fill-[#ea580c]"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Paw Main Pad */}
                  <ellipse cx="12" cy="16" rx="5" ry="4" />
                  {/* Paw Toes */}
                  <circle cx="5.5" cy="10" r="2.2" />
                  <circle cx="9.8" cy="6.8" r="2.2" />
                  <circle cx="14.2" cy="6.8" r="2.2" />
                  <circle cx="18.5" cy="10" r="2.2" />
                </svg>
              </div>

              {/* Card Prose from screenshot */}
              <p className="text-slate-700 text-sm leading-relaxed font-normal">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
