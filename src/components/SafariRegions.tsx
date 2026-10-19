import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { SAFARI_REGIONS } from '../data/travelData';

interface SafariRegionsProps {
  onSelectRegion: (regionTitle: string) => void;
  onRequestQuoteWithRegion: (regionTitle: string) => void;
}

export const SafariRegions: React.FC<SafariRegionsProps> = ({
  onSelectRegion,
  onRequestQuoteWithRegion,
}) => {
  return (
    <section id="regions" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1">
            Explore East Africa
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a2265] tracking-tight font-['Outfit',sans-serif]">
            Curated Regional Safaris &amp; Circuits
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">
            From the endless savannahs of the Serengeti and Maasai Mara to the misty volcanic sanctuaries of Rwanda and Uganda, discover our handcrafted circuits.
          </p>
        </div>

        {/* 6 Grid Cards as shown in screenshots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAFARI_REGIONS.map((region) => (
            <div
              key={region.id}
              onClick={() => onSelectRegion(region.title)}
              className="group relative h-72 sm:h-80 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card Photo */}
              <img
                src={region.image}
                alt={region.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 group-hover:via-black/50 transition-colors" />

              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-center z-10">
                {/* Center Title with underline as in screenshot */}
                <div className="mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide font-['Outfit',sans-serif] drop-shadow-sm">
                    {region.title}
                  </h3>
                  {/* Subtle white hairline underline matching screenshot */}
                  <div className="w-12 h-0.5 bg-white/80 mx-auto mt-2 mb-2 group-hover:w-20 group-hover:bg-[#ff7700] transition-all" />
                </div>

                <p className="text-xs text-slate-200 line-clamp-2 mb-3 px-2 font-light">
                  {region.description}
                </p>

                {/* Interactive button bar */}
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRegion(region.title);
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Itineraries</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestQuoteWithRegion(region.title);
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#ea580c] hover:bg-[#ff7700] rounded-md transition-colors shadow-xs cursor-pointer"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
