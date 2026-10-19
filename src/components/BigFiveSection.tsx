import React, { useState } from 'react';
import { Eye, Info, X, MapPin, Sparkles } from 'lucide-react';
import { BIG_FIVE } from '../data/travelData';
import { BigFiveAnimal } from '../types/travel';

interface BigFiveSectionProps {
  onPlanAnimalSafari: (animalName: string) => void;
}

export const BigFiveSection: React.FC<BigFiveSectionProps> = ({ onPlanAnimalSafari }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<BigFiveAnimal | null>(null);

  return (
    <section className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Image 4 */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] tracking-tight uppercase font-['Outfit',sans-serif]">
            THE BIG FIVE OF AFRICA
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">
            Originally coined by historic safari trackers, the Big Five remain Africa's most iconic wildlife symbols. Encounter them on our guided game drives with 98% sighting success rates.
          </p>
        </div>

        {/* 5-Column Photo Strip matching Image 4 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3 rounded-xl overflow-hidden shadow-sm">
          {BIG_FIVE.map((animal) => (
            <div
              key={animal.id}
              onClick={() => setSelectedAnimal(animal)}
              className="group relative h-72 md:h-80 cursor-pointer overflow-hidden bg-slate-900"
            >
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent group-hover:from-black/90 transition-colors" />

              {/* Title and metadata */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-left z-10">
                <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
                  Swahili: {animal.swahiliName}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide font-['Outfit',sans-serif] drop-shadow-xs">
                  {animal.name}
                </h3>
                <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5 text-[#ff7700]" />
                  <span>Click to view details</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Animal Modal */}
        {selectedAnimal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
              {/* Close Button */}
              <button
                onClick={() => setSelectedAnimal(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top Image Banner */}
              <div className="relative h-48 bg-slate-900">
                <img
                  src={selectedAnimal.image}
                  alt={selectedAnimal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {selectedAnimal.swahiliName} · {selectedAnimal.scientificName}
                  </span>
                  <h3 className="text-2xl font-black font-['Outfit',sans-serif]">
                    {selectedAnimal.name}
                  </h3>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4 text-slate-700 text-sm">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Behavior &amp; Highlights
                  </h4>
                  <p className="leading-relaxed text-slate-800 font-normal">
                    {selectedAnimal.funFact}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-100">
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">
                      Dietary Classification
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      {selectedAnimal.diet}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">
                      Conservation Status
                    </span>
                    <span className="text-xs font-semibold text-[#ea580c]">
                      {selectedAnimal.conservationStatus}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ea580c]" />
                    Prime Spotting Reserves
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAnimal.bestParks.map((park) => (
                      <span
                        key={park}
                        className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                      >
                        {park}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedAnimal(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const name = selectedAnimal.name;
                      setSelectedAnimal(null);
                      onPlanAnimalSafari(name);
                    }}
                    className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] rounded-lg shadow-sm cursor-pointer"
                  >
                    Book Safari to See {selectedAnimal.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
