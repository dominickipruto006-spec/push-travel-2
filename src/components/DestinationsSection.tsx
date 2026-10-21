import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCircle,
  Eye,
  Layers,
} from 'lucide-react';
import { DESTINATIONS, BIG_FIVE, TWO_LIONS_BANNER } from '../data/travelData';
import { Destination, BigFiveAnimal } from '../types/travel';

interface DestinationsSectionProps {
  onSelectDestinationForQuote: (destName: string) => void;
  onExploreTours?: () => void;
  initialDestinationId?: string;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestinationForQuote,
  onExploreTours,
  initialDestinationId,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedDestId, setSelectedDestId] = useState<string>(
    initialDestinationId || 'nairobi-national-park'
  );
  const [selectedAnimal, setSelectedAnimal] = useState<BigFiveAnimal | null>(null);

  useEffect(() => {
    if (initialDestinationId) {
      setSelectedDestId(initialDestinationId);
      const target = DESTINATIONS.find((d) => d.id === initialDestinationId);
      if (target && selectedCountry !== 'All' && target.country !== selectedCountry) {
        setSelectedCountry('All');
      }
      const timer = setTimeout(() => {
        const el = document.getElementById(`dest-card-${initialDestinationId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [initialDestinationId]);

  const handleSelectPill = (destId: string) => {
    setSelectedDestId(destId);
    setTimeout(() => {
      const el = document.getElementById(`dest-card-${destId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);
  };

  const countries = ['All', 'Kenya', 'Tanzania', 'Uganda', 'Rwanda'];

  const filteredDestinations = DESTINATIONS.filter((d) => {
    if (selectedCountry === 'All') return true;
    return d.country === selectedCountry;
  });

  const activeDest =
    DESTINATIONS.find((d) => d.id === selectedDestId) || filteredDestinations[0] || DESTINATIONS[0];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Panoramic Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950 flex items-center justify-center text-center">
        <img
          src={TWO_LIONS_BANNER}
          alt="East African Wildlife & Savannah Destinations"
          className="w-full h-full object-cover object-center opacity-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-black/30" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs inline-block mb-3 border border-amber-400/30">
            Push World Travel Destination Guide
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-['Outfit',sans-serif] drop-shadow-md">
            East African Destinations
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 rounded-full" />
        </div>
      </div>

      {/* 2. Main Destinations Container with Drop Cap & Arrow Chooser */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Authentic Intro Text */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
            East Africa is one of the most enchanting travel destinations in the world, with diverse cultures, unique wildlife, and spectacular landscapes. Select any destination below to access its detailed guide, best travel seasons, and tailor-made safari options.
          </p>
        </div>

        {/* 3. Interactive Destination Chooser with Arrow Indicator */}
        <div className="mb-10 p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0">
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#0a2265] font-['Outfit',sans-serif]">
                  Choose Which Destination to Explore
                </h2>
                <p className="text-xs text-slate-500">
                  Click a destination or use the dropdown to open its full guide
                </p>
              </div>
            </div>

            {/* Country Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Country:
              </span>
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCountry(c)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedCountry === c
                      ? 'bg-[#0a2265] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Destination Quick-Select Pills with Arrow Appearance */}
          <div className="mt-4 flex flex-wrap gap-2">
            {filteredDestinations.map((dest) => {
              const isSelected = selectedDestId === dest.id;
              return (
                <button
                  key={dest.id}
                  onClick={() => handleSelectPill(dest.id)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#ea580c] text-white shadow-md scale-102 ring-2 ring-[#ea580c]/30'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-200' : 'text-[#ea580c]'}`} />
                  <span>{dest.name}</span>
                  {isSelected && <ArrowRight className="w-3.5 h-3.5 text-white animate-in slide-in-from-left-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Drop Cap Accordion Destination Cards */}
        <div className="space-y-4 mb-14 text-left">
          {filteredDestinations.map((dest) => {
            const isExpanded = selectedDestId === dest.id;
            const dropCapLetter = dest.name.replace(/^[^a-zA-Z]+/, '').charAt(0).toUpperCase();

            return (
              <div
                key={dest.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-[#0a2265] ring-2 ring-[#0a2265]/10 shadow-lg'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Clickable Header Bar */}
                <button
                  onClick={() => setSelectedDestId(isExpanded ? '' : dest.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors bg-white hover:bg-slate-50/80"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4">
                    {/* Monogram Drop Cap Avatar */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-serif font-black text-xl select-none transition-colors shrink-0 ${
                        isExpanded
                          ? 'bg-[#0a2265] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {dropCapLetter}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3
                          className={`text-base sm:text-lg font-bold font-['Outfit',sans-serif] ${
                            isExpanded ? 'text-[#0a2265]' : 'text-slate-900'
                          }`}
                        >
                          {dest.name}
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#0a2265]">
                          {dest.country}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{dest.tagline}</p>
                    </div>
                  </div>

                  {/* Arrow Appearance (Rotates on click) */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-[#ea580c] hidden sm:inline">
                      {isExpanded ? 'Hide Details' : 'Choose Destination'}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isExpanded
                          ? 'bg-[#ea580c] text-white rotate-180'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded Information Panel with Editorial Drop Cap */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      {/* Destination Image */}
                      <div className="lg:col-span-5 relative rounded-xl overflow-hidden min-h-[240px] sm:min-h-[270px] bg-slate-900 shadow-xs">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        <div className="absolute bottom-3.5 left-4 right-4 text-white">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
                            {dest.country}
                          </span>
                          <h4 className="text-lg font-bold font-['Outfit',sans-serif] drop-shadow-sm">
                            {dest.name}
                          </h4>
                        </div>
                      </div>

                      {/* Drop Cap Information Body */}
                      <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-[#ea580c] mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Destination Story &amp; Natural Wonder</span>
                          </div>

                          {/* Paragraph with prominent classical Drop Cap letter */}
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal">
                            <span className="float-left text-5xl sm:text-6xl font-serif font-black text-[#0a2265] leading-[0.8] pr-3.5 pt-1 uppercase select-none drop-shadow-2xs">
                              {dropCapLetter}
                            </span>
                            {dest.description}
                          </p>

                          {/* Season & Wildlife Overview */}
                          <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2.5 text-xs">
                            <div className="flex items-start gap-2 text-slate-700">
                              <Calendar className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-900">Best Time to Visit:</strong>{' '}
                                <span>{dest.bestTime}</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 text-slate-700">
                              <Compass className="w-4 h-4 text-[#0a2265] shrink-0 mt-0.5" />
                              <div className="flex flex-wrap items-center gap-1">
                                <strong className="text-slate-900 mr-1">Wildlife Sightings:</strong>
                                {dest.wildlife.map((w, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-white text-slate-700 border border-slate-200"
                                  >
                                    {w}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Highlights */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {dest.highlights.map((h, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200/60"
                              >
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                <span>{h}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                          {onExploreTours && (
                            <button
                              onClick={onExploreTours}
                              className="text-xs font-bold text-[#0a2265] hover:text-[#ea580c] flex items-center gap-1 cursor-pointer"
                            >
                              View Tours Visiting Here <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => onSelectDestinationForQuote(dest.name)}
                            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#801416] hover:bg-[#991b1b] rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <span>Plan Safari to {dest.name}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Authentic Closing Note */}
        <div className="text-center max-w-3xl mx-auto my-10 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed italic font-serif">
            “Each of these destinations offers a unique experience that will create unforgettable memories. From the vast savannas of the Serengeti to the pristine beaches of Zanzibar, East Africa has something for everyone.”
          </p>
        </div>

        {/* 5. The Big Five of Africa Section */}
        <div className="mt-14 pt-10 border-t border-slate-200 text-left">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1">
              Wildlife Icons of East Africa
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] font-['Outfit',sans-serif]">
              The Big Five of Africa
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-2 mb-3 rounded-full" />
            <p className="text-slate-600 text-xs sm:text-sm">
              Discover the history, Swahili names, and prime parks for encountering Africa’s legendary quintet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BIG_FIVE.map((animal) => (
              <div
                key={animal.id}
                onClick={() => setSelectedAnimal(animal)}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-[#ea580c] shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col"
              >
                <div className="relative h-40 overflow-hidden bg-slate-900">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Swahili: {animal.swahiliName}
                    </span>
                    <h3 className="text-sm font-bold font-['Outfit',sans-serif]">
                      {animal.name}
                    </h3>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between text-xs">
                  <p className="text-slate-500 line-clamp-2 text-[11px] leading-relaxed">
                    {animal.funFact}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[#ea580c] font-bold text-[11px]">
                    <span>Learn More</span>
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Animal Detail Modal */}
          {selectedAnimal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
              <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 text-left">
                <div className="relative h-48 bg-slate-900">
                  <img
                    src={selectedAnimal.image}
                    alt={selectedAnimal.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <button
                    onClick={() => setSelectedAnimal(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Swahili: {selectedAnimal.swahiliName} · {selectedAnimal.scientificName}
                    </span>
                    <h4 className="text-xl font-bold font-['Outfit',sans-serif]">
                      {selectedAnimal.name}
                    </h4>
                  </div>
                </div>

                <div className="p-5 space-y-3 text-xs sm:text-sm text-slate-700">
                  <p className="leading-relaxed">{selectedAnimal.funFact}</p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                    <div>
                      <strong className="text-slate-900">Conservation Status:</strong>{' '}
                      <span className="text-[#801416] font-semibold">
                        {selectedAnimal.conservationStatus}
                      </span>
                    </div>
                    <div>
                      <strong className="text-slate-900">Diet:</strong> {selectedAnimal.diet}
                    </div>
                    <div>
                      <strong className="text-slate-900">Best Parks to Spot:</strong>{' '}
                      {selectedAnimal.bestParks.join(', ')}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        const animalName = selectedAnimal.name;
                        setSelectedAnimal(null);
                        onSelectDestinationForQuote(`Safari to see ${animalName}`);
                      }}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#801416] hover:bg-[#991b1b] rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                      Inquire Wildlife Safari
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
