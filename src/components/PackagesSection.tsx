import React, { useState } from 'react';
import { Clock, CheckCircle, ArrowRight, X, Calendar, MapPin, Compass } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';
import { TourPackage, PackageCategory } from '../types/travel';

interface PackagesSectionProps {
  onSelectPackageForQuote: (pkg: TourPackage) => void;
  activeFilter?: string;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackageForQuote,
  activeFilter = 'All',
}) => {
  const [filter, setFilter] = useState<string>(activeFilter);
  const [activePackageModal, setActivePackageModal] = useState<TourPackage | null>(null);

  const categories = [
    'All',
    'Safari & Wildlife',
    'Beach Holidays',
    'Luxury Escapes',
    'Gorilla Trekking',
    'International Getaways',
  ];

  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    if (filter === 'All') return true;
    return pkg.category === filter;
  });

  return (
    <section id="packages" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1.5">
            Travel Products &amp; Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2265] tracking-tight font-['Outfit',sans-serif]">
            Featured Travel Packages
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-6 rounded-full" />
          
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
            Explore our curated collection of ready-to-book itineraries across East Africa and international getaways.
            Every journey includes private transport, seasoned guides, premium accommodation, and end-to-end concierge support.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-[#0a2265] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Package Thumbnail */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                {/* Country / Category Tags */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[11px] font-bold tracking-wider uppercase bg-[#0a2265]/90 text-white px-2.5 py-1 rounded backdrop-blur-xs">
                    {pkg.countries.join(' · ')}
                  </span>
                  {pkg.tag && (
                    <span className="text-[11px] font-bold tracking-wider uppercase bg-[#ea580c] text-white px-2 py-1 rounded">
                      {pkg.tag}
                    </span>
                  )}
                </div>

                {/* Duration Bar */}
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-white flex items-center gap-1.5 drop-shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {pkg.durationDays} Days / {pkg.durationNights} Nights
                  </span>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider mb-1">
                    {pkg.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#ea580c] transition-colors leading-snug font-['Outfit',sans-serif]">
                    {pkg.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {pkg.overview}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-4 space-y-1.5">
                    {pkg.highlights.slice(0, 3).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Row - PRICING COMPLETELY REMOVED */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-500">
                    <span className="block text-[11px] text-slate-400 uppercase font-bold">Inquire Rates</span>
                    <span className="text-slate-800 font-bold">Custom Quote</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActivePackageModal(pkg)}
                      className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-[#0a2265] bg-slate-100 hover:bg-slate-200/70 rounded-md transition-colors cursor-pointer"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => onSelectPackageForQuote(pkg)}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#0a2265] hover:bg-[#07194a] rounded-md shadow-xs transition-all cursor-pointer"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Itinerary Modal */}
        {activePackageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="bg-[#0a2265] text-white p-5 pr-14 flex-shrink-0 relative">
                <button
                  onClick={() => setActivePackageModal(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 text-xs text-amber-300 font-bold uppercase tracking-wider mb-1">
                  <span>{activePackageModal.countries.join(' · ')}</span>
                  <span>·</span>
                  <span>{activePackageModal.durationDays} Days / {activePackageModal.durationNights} Nights</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif]">
                  {activePackageModal.title}
                </h3>
              </div>

              {/* Scrollable Itinerary Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 flex-1">
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                    Package Overview
                  </h4>
                  <p className="leading-relaxed text-slate-800">
                    {activePackageModal.overview}
                  </p>
                </div>

                {/* Day by Day Breakdown */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                    Day-By-Day Itinerary Breakdown
                  </h4>
                  <div className="space-y-4">
                    {activePackageModal.itinerary.map((day) => (
                      <div key={day.day} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="text-xs font-extrabold text-[#ea580c] uppercase tracking-wide">
                            Day {day.day}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {day.mealPlan}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-900 mb-1">
                          {day.title}
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed mb-2 font-normal">
                          {day.description}
                        </p>
                        <div className="text-[11px] text-slate-500 font-medium">
                          <strong className="text-slate-700">Stay:</strong> {day.accommodation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                  <div>
                    <h5 className="text-xs font-bold uppercase text-emerald-800 mb-2 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      What's Included
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {activePackageModal.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500">✓</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase text-rose-800 mb-2 flex items-center gap-1">
                      <X className="w-3.5 h-3.5 text-rose-600" />
                      What's Excluded
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {activePackageModal.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-500">✕</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-800 block">Personalized Itinerary &amp; Quote</span>
                  <span>100% Tailor-made for your dates and group size</span>
                </div>
                <button
                  onClick={() => {
                    const pkg = activePackageModal;
                    setActivePackageModal(null);
                    onSelectPackageForQuote(pkg);
                  }}
                  className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#0a2265] hover:bg-[#07194a] rounded-lg shadow-sm cursor-pointer"
                >
                  Request Detailed Itinerary &amp; Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
