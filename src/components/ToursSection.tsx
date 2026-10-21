import React, { useState } from 'react';
import {
  Clock,
  CheckCircle,
  ArrowRight,
  X,
  MapPin,
  Compass,
  Sparkles,
  ShieldCheck,
  Users,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Globe,
  Award,
  Layers,
} from 'lucide-react';
import {
  TOUR_PACKAGES,
  TOURS_WELCOME_RHINO_IMAGE,
} from '../data/travelData';
import { TourPackage } from '../types/travel';

interface ToursSectionProps {
  onSelectPackageForQuote: (pkg: TourPackage) => void;
  onRequestQuoteWithDestination?: (dest: string) => void;
}

interface TourCircuit {
  id: string;
  name: string;
  country: string;
  tag: string;
  summary: string;
  dropCapLetter: string;
  welcomeNote: string;
  bestSeasons: string;
  topWildlife: string[];
  packageIds: string[];
}

export const ToursSection: React.FC<ToursSectionProps> = ({
  onSelectPackageForQuote,
  onRequestQuoteWithDestination,
}) => {
  // Define organized circuits so information is accessed separately without clutter
  const circuits: TourCircuit[] = [
    {
      id: 'kenya-safaris',
      name: 'Kenya Safaris & Expeditions',
      country: 'Kenya',
      tag: 'Premier Big Five Destination',
      summary:
        'Home to the iconic Maasai Mara big cats, Amboseli elephant herds under Mount Kilimanjaro, and Great Rift Valley lakes.',
      dropCapLetter: 'K',
      welcomeNote:
        'enya stands as the timeless cradle of authentic African safaris. Traversed by our custom 4x4 pop-up roof Land Cruisers and guided by seasoned naturalist rangers, each itinerary reveals the raw pulse of the savannah—from the dramatic Mara River crossings to tranquil sundowners overlooking the Great Rift Valley.',
      bestSeasons: 'July to October (Great Migration) & January to March (Calving & Clear Skies)',
      topWildlife: ['Lions', 'Cheetahs', 'Tuskers', 'Rhinos', 'Giraffes'],
      packageIds: ['mara-fly-in-3d', 'kenya-beach-bush-7d', 'kenya-tanzania-combo-8d'],
    },
    {
      id: 'tanzania-circuits',
      name: 'Tanzania Wildlife Circuits',
      country: 'Tanzania',
      tag: 'UNESCO World Heritage',
      summary:
        'Endless savannas of Serengeti, the ancient caldera floor of Ngorongoro Crater, and tree-climbing lions of Lake Manyara.',
      dropCapLetter: 'T',
      welcomeNote:
        'anzania offers a boundless wilderness expanse that captures the imagination. Descend 600 meters into the Ngorongoro Crater floor—an untouched wildlife amphitheater teeming with black rhinos and massive lion prides—before following thousands of wildebeest and zebras across the golden Serengeti horizon.',
      bestSeasons: 'December to March (Ndutu Calving) & June to October (Dry Season Predator Action)',
      topWildlife: ['Black Rhinos', 'Serengeti Lions', 'Tree Leopards', 'Wildebeest Herds'],
      packageIds: ['serengeti-ngorongoro-5d', 'kenya-tanzania-combo-8d', 'zanzibar-beach-escape-5d'],
    },
    {
      id: 'gorilla-trekking',
      name: 'Uganda & Rwanda Gorilla Trekking',
      country: 'Rwanda & Uganda',
      tag: 'Rare Primate Encounter',
      summary:
        'Trek through the misty volcanic bamboo forests of Volcanoes National Park and ancient rainforests of Bwindi.',
      dropCapLetter: 'G',
      welcomeNote:
        'orilla trekking stands among the most poignant, deeply moving wildlife encounters on Earth. Led by licensed park trackers through emerald rainforest slopes, you spend an unforgettable, respectful hour in the presence of a habituated mountain gorilla family, witnessing their gentle social bonds in their natural habitat.',
      bestSeasons: 'June to September & December to February (Driest trekking months)',
      topWildlife: ['Mountain Gorillas', 'Golden Monkeys', 'Forest Elephants', 'Albertine Birds'],
      packageIds: ['rwanda-gorilla-trek-4d'],
    },
    {
      id: 'coastal-bush-beach',
      name: 'Coastal Bush-to-Beach & Zanzibar Holidays',
      country: 'Kenya & Tanzania',
      tag: 'Bush to Beach Harmony',
      summary:
        'The ideal balance: exciting savannah game drives followed by barefoot luxury along the turquoise Indian Ocean on Diani Beach and Zanzibar Island.',
      dropCapLetter: 'C',
      welcomeNote:
        'oastal East Africa provides the quintessential finale to an adrenaline-charged wildlife safari. After dust-filled game drives searching for Amboseli tuskers and Tsavo lions, sink your feet into the powder-soft white sands of Diani Beach or the spice island of Zanzibar, sailed by traditional dhows across shimmering turquoise waves.',
      bestSeasons: 'October to April (Warm tropical waters, calm seas & bright sun)',
      topWildlife: ['Dolphins', 'Sea Turtles', 'Coral Reef Fish', 'Amboseli Elephants'],
      packageIds: ['kenya-beach-bush-7d', 'zanzibar-beach-escape-5d'],
    },
    {
      id: 'luxury-cross-border',
      name: 'Flagship Multi-Country Circuits',
      country: 'Kenya & Tanzania',
      tag: 'Ultimate East African Circuit',
      summary:
        'Seamless cross-border expeditions uniting the world’s top two wildlife reserves: Maasai Mara and Serengeti.',
      dropCapLetter: 'E',
      welcomeNote:
        'ast Africa’s wildlife knows no international borders, and neither should your safari dream. Our flagship cross-border circuits seamlessly connect Kenya and Tanzania with dedicated border-clearing assistance, continuous luxury 4x4 transport, and hand-selected luxury boutique lodges.',
      bestSeasons: 'July to November & January to March',
      topWildlife: ['The Complete Big Five', 'Great Migration Herds', 'Hippo Pods', 'Nile Crocodiles'],
      packageIds: ['kenya-tanzania-combo-8d', 'mara-fly-in-3d', 'serengeti-ngorongoro-5d'],
    },
  ];

  // Currently expanded/selected circuit ID (defaults to 'kenya-safaris')
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>('kenya-safaris');
  const [activePackageModal, setActivePackageModal] = useState<TourPackage | null>(null);

  const activeCircuit = circuits.find((c) => c.id === selectedCircuitId) || circuits[0];

  // Retrieve the packages that belong to the active circuit
  const activePackages = TOUR_PACKAGES.filter((pkg) =>
    activeCircuit.packageIds.includes(pkg.id)
  );

  return (
    <div className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1.5">
            Push World Travel Expeditions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2265] tracking-tight font-['Outfit',sans-serif]">
            East African Safaris &amp; Tours
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-slate-600 text-xs sm:text-sm">
            Access each safari circuit separately below to explore detailed itineraries, highlights, and custom departures.
          </p>
        </div>

        {/* 1. Welcoming Hero Banner Featuring the User's Welcoming Rhino Photo */}
        <div className="relative mb-12 bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Welcoming Photographic Image (Rhino walking across savanna road) */}
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-slate-900 overflow-hidden">
              <img
                src={TOURS_WELCOME_RHINO_IMAGE}
                alt="African Rhinoceros on Safari Road - Push World Travel"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/30" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#ea580c]/90 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5" /> Authentic Safari Encounters
                </span>
                <p className="mt-1 text-xs text-white/90 drop-shadow-sm font-medium">
                  Push World Travel Custom 4x4 Wildlife Expeditions
                </p>
              </div>
            </div>

            {/* Welcoming Editorial Note with Classic Drop Cap */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#0a2265] flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#ea580c]" />
                    <span>Jambo &amp; Karibu to East Africa</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Nairobi, Kenya
                  </span>
                </div>

                {/* Welcoming text with Drop Cap */}
                <div className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify font-normal">
                  <span className="float-left text-5xl sm:text-6xl font-serif font-black text-[#0a2265] leading-[0.8] pr-3.5 pt-1 uppercase select-none drop-shadow-xs">
                    W
                  </span>
                  elcome to Push World Travel Ltd. We curate privately guided journeys across East Africa’s premier national parks, game reserves, and coastal sanctuaries. Rather than presenting an overwhelming wall of endless packages, our expeditions are organized by dedicated safari circuits below—allowing you to easily review each destination on its own merits, view daily itineraries, and request customized departures with our Nairobi travel desk.
                </div>

                {/* Key Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Tailor-Made</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Users className="w-4 h-4 text-[#0a2265] shrink-0" />
                    <span>KPSGA Naturalists</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Award className="w-4 h-4 text-[#ea580c] shrink-0" />
                    <span>Custom 4x4 Fleet</span>
                  </div>
                </div>
              </div>

              {/* Quick Circuit Switcher Dropdown */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <Layers className="w-4 h-4 text-[#ea580c]" />
                  <span>Selected Safari Circuit:</span>
                </div>
                <select
                  value={selectedCircuitId}
                  onChange={(e) => setSelectedCircuitId(e.target.value)}
                  className="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white text-[#0a2265] focus:outline-none focus:ring-2 focus:ring-[#ea580c] cursor-pointer shadow-2xs"
                >
                  {circuits.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.packageIds.length} Packages)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Drop Cap / Accordion Selector: Access Each Section Separately to Avoid Clutter */}
        <div className="mb-10 text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                Safari Circuits &amp; Categories
              </h2>
              <p className="text-xs text-slate-500">
                Click any section below to expand its dedicated overview and package itineraries
              </p>
            </div>
          </div>

          {/* Interactive Accordion Cards */}
          <div className="space-y-4">
            {circuits.map((circuit) => {
              const isExpanded = selectedCircuitId === circuit.id;
              const circuitPackages = TOUR_PACKAGES.filter((p) =>
                circuit.packageIds.includes(p.id)
              );

              return (
                <div
                  key={circuit.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'border-[#0a2265] ring-2 ring-[#0a2265]/10 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  {/* Accordion Header Button */}
                  <button
                    onClick={() =>
                      setSelectedCircuitId(isExpanded ? '' : circuit.id)
                    }
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors bg-white hover:bg-slate-50/80"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-4">
                      {/* Drop Cap Icon / Monogram Avatar */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-serif font-black text-xl select-none transition-colors shrink-0 ${
                          isExpanded
                            ? 'bg-[#0a2265] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {circuit.dropCapLetter}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3
                            className={`text-base sm:text-lg font-bold font-['Outfit',sans-serif] ${
                              isExpanded ? 'text-[#0a2265]' : 'text-slate-900'
                            }`}
                          >
                            {circuit.name}
                          </h3>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 text-[#ea580c]">
                            {circuit.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {circuit.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                        {circuitPackages.length} Itineraries
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                          isExpanded
                            ? 'bg-[#0a2265] text-white rotate-180'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Information Panel (Visible when this circuit is clicked) */}
                  {isExpanded && (
                    <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 animate-in fade-in duration-300">
                      {/* Circuit Editorial Intro with Drop Cap */}
                      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs mb-8">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#ea580c] mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Circuit Overview</span>
                        </div>

                        {/* Story with Drop Cap Letter */}
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal">
                          <span className="float-left text-4xl sm:text-5xl font-serif font-black text-[#0a2265] leading-[0.8] pr-3 pt-1 uppercase select-none drop-shadow-2xs">
                            {circuit.dropCapLetter}
                          </span>
                          {circuit.welcomeNote}
                        </p>

                        {/* Best Season & Wildlife Pills */}
                        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Clock className="w-3.5 h-3.5 text-[#ea580c]" />
                            <strong className="text-slate-800">Best Time:</strong>{' '}
                            <span>{circuit.bestSeasons}</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-slate-400 font-semibold mr-1">
                              Prime Wildlife:
                            </span>
                            {circuit.topWildlife.map((animal, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700"
                              >
                                {animal}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Packages Under This Circuit */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                            Available Itineraries for {circuit.name}
                          </h4>
                          <span className="text-xs text-[#ea580c] font-semibold">
                            Private departures on your dates
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {circuitPackages.map((pkg) => (
                            <div
                              key={pkg.id}
                              className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col group text-left"
                            >
                              {/* Package Image */}
                              <div className="relative h-48 overflow-hidden bg-slate-900">
                                <img
                                  src={pkg.image}
                                  alt={pkg.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                  <span className="text-[10px] font-bold tracking-wider uppercase bg-[#0a2265]/90 text-white px-2 py-0.5 rounded">
                                    {pkg.countries.join(' · ')}
                                  </span>
                                  {pkg.tag && (
                                    <span className="text-[10px] font-bold tracking-wider uppercase bg-[#ea580c] text-white px-2 py-0.5 rounded">
                                      {pkg.tag}
                                    </span>
                                  )}
                                </div>

                                <div className="absolute bottom-3 left-3 text-xs font-semibold text-white flex items-center gap-1 drop-shadow-sm">
                                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                                  <span>
                                    {pkg.durationDays} Days / {pkg.durationNights} Nights
                                  </span>
                                </div>
                              </div>

                              {/* Package Details */}
                              <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                  <h5 className="text-base font-bold text-slate-900 group-hover:text-[#ea580c] transition-colors font-['Outfit',sans-serif] line-clamp-1">
                                    {pkg.title}
                                  </h5>
                                  <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                    {pkg.overview}
                                  </p>

                                  <div className="mt-3 space-y-1">
                                    {pkg.highlights.slice(0, 2).map((h, i) => (
                                      <div
                                        key={i}
                                        className="flex items-start gap-1.5 text-[11px] text-slate-700"
                                      >
                                        <CheckCircle className="w-3 h-3 text-[#ea580c] shrink-0 mt-0.5" />
                                        <span className="line-clamp-1">{h}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                  <button
                                    onClick={() => setActivePackageModal(pkg)}
                                    className="text-xs font-bold text-[#0a2265] hover:text-[#ea580c] transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    Itinerary <ChevronRight className="w-3 h-3" />
                                  </button>

                                  <button
                                    onClick={() => onSelectPackageForQuote(pkg)}
                                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0a2265] hover:bg-[#07194a] rounded-lg shadow-2xs transition-colors cursor-pointer"
                                  >
                                    Inquire / Book
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Itinerary Modal */}
        {activePackageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col text-left">
              {/* Modal Header */}
              <div className="relative h-44 sm:h-52 bg-slate-900 shrink-0">
                <img
                  src={activePackageModal.image}
                  alt={activePackageModal.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <button
                  onClick={() => setActivePackageModal(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold tracking-wider uppercase text-amber-300">
                      {activePackageModal.countries.join(' · ')}
                    </span>
                    <span className="text-white/60">|</span>
                    <span className="text-xs font-semibold text-white/90">
                      {activePackageModal.durationDays} Days / {activePackageModal.durationNights} Nights
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold font-['Outfit',sans-serif] leading-tight">
                    {activePackageModal.title}
                  </h3>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-slate-700">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Package Overview
                  </h4>
                  <p className="leading-relaxed text-slate-700">{activePackageModal.overview}</p>
                </div>

                {/* Day-by-Day Itinerary */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Day-by-Day Safari Itinerary
                  </h4>
                  <div className="space-y-3">
                    {activePackageModal.itinerary.map((day) => (
                      <div
                        key={day.day}
                        className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#0a2265] text-xs">
                            Day {day.day}: {day.title}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {day.mealPlan}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-2">
                          {day.description}
                        </p>
                        <div className="text-[11px] font-semibold text-[#0a2265] flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Accommodation: {day.accommodation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
                    <h5 className="font-bold text-emerald-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Inclusions
                    </h5>
                    <ul className="space-y-1 text-xs text-emerald-950">
                      {activePackageModal.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200/80">
                    <h5 className="font-bold text-rose-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-600" /> Exclusions
                    </h5>
                    <ul className="space-y-1 text-xs text-rose-950">
                      {activePackageModal.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
                <span className="text-xs text-slate-500 hidden sm:inline">
                  Customized dates &amp; private departures available
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setActivePackageModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const pkg = activePackageModal;
                      setActivePackageModal(null);
                      onSelectPackageForQuote(pkg);
                    }}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0a2265] hover:bg-[#07194a] rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                  >
                    Request Custom Quote <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
