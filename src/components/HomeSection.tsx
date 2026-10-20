import React from 'react';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Calendar,
  Sparkles,
  MapPin,
  Camera,
  Briefcase,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { HeroSection } from './HeroSection';
import { IntroBanner } from './IntroBanner';
import { WhyChooseUs } from './WhyChooseUs';
import {
  TOUR_PACKAGES,
  DESTINATIONS,
  PUSH_WORLD_SERVICES,
  COMPANY_INFO,
  KENYA_IMAGE,
  LUXURY_RESORT_IMAGE,
  BEACH_RESORT_IMAGE,
} from '../data/travelData';
import { SupportedLanguage } from '../types/travel';

interface HomeSectionProps {
  currentLang: SupportedLanguage;
  onNavigate: (page: string) => void;
  onRequestQuoteClick: (prefill?: { destination?: string; safariType?: string; packageName?: string }) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  currentLang,
  onNavigate,
  onRequestQuoteClick,
}) => {
  const featuredTours = TOUR_PACKAGES.slice(0, 3);
  const featuredDestinations = DESTINATIONS.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Hero Section with Quick Planner Bar */}
      <HeroSection
        currentLang={currentLang}
        onRequestQuoteClick={() => onRequestQuoteClick()}
        onExplorePackages={() => onNavigate('tours')}
      />

      {/* 2. Welcome Intro Banner ("Think Travel, Think Push World") */}
      <IntroBanner
        currentLang={currentLang}
        onRequestQuoteClick={() => onRequestQuoteClick()}
      />

      {/* 3. Discover By Feature Section - Clear gateways to dedicated pages */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1.5">
              Your World. Our Journey.
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2265] tracking-tight font-['Outfit',sans-serif]">
              Experience East Africa With The Experts
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From thrilling Great Migration crossings to secluded Indian Ocean villas and private flight charters, discover how Push World Travel transforms each itinerary into a masterpiece.
            </p>
          </div>

          {/* 4 Interactive Portal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Tours */}
            <div
              onClick={() => onNavigate('tours')}
              className="group bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between text-left"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0a2265] transition-colors font-['Outfit',sans-serif]">
                  Safari &amp; Tours
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Bespoke itineraries through the Maasai Mara, Serengeti, Amboseli, and gorilla sanctuaries with private 4x4 Land Cruisers.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#ea580c] group-hover:translate-x-1 transition-transform">
                <span>View All Tours</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2: Services */}
            <div
              onClick={() => onNavigate('services')}
              className="group bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between text-left"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0a2265] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0a2265] transition-colors font-['Outfit',sans-serif]">
                  Travel Services
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Flight bookings, hotel &amp; resort reservations, luxury VIP arrangements, airport transfers, and corporate retreats.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0a2265] group-hover:translate-x-1 transition-transform">
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3: Destinations */}
            <div
              onClick={() => onNavigate('destinations')}
              className="group bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between text-left"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#d97706] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0a2265] transition-colors font-['Outfit',sans-serif]">
                  Top Destinations
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Discover Kenya, Tanzania, Uganda, and Rwanda with insider tips, best wildlife seasons, and Big Five tracking spots.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#d97706] group-hover:translate-x-1 transition-transform">
                <span>Browse Destinations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4: Gallery */}
            <div
              onClick={() => onNavigate('gallery')}
              className="group bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between text-left"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0a2265] transition-colors font-['Outfit',sans-serif]">
                  Travel Gallery
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Authentic high-resolution photographs of luxury lodges, wildlife encounters, coastal paradises, and client memories.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                <span>View Full Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Safari Itineraries Preview */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1">
                Handcrafted Itineraries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] font-['Outfit',sans-serif]">
                Featured Safari Packages
              </h2>
            </div>
            <button
              onClick={() => onNavigate('tours')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ea580c] hover:text-[#c2410c] uppercase tracking-wider cursor-pointer"
            >
              <span>See All Safari Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTours.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => onNavigate('tours')}
                className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-[#0a2265]/90 text-white px-2 py-0.5 rounded">
                    {pkg.countries.join(' · ')}
                  </span>
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white drop-shadow-sm">
                    {pkg.durationDays} Days / {pkg.durationNights} Nights
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#ea580c] transition-colors font-['Outfit',sans-serif]">
                      {pkg.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
                      {pkg.overview}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-[#0a2265]">Private Departure</span>
                    <span className="text-[#ea580c] flex items-center gap-1">
                      Explore Tour <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us (Authentic text & Paw Print cards from Image 3) */}
      <WhyChooseUs />

      {/* 6. Physical Presence & Booking CTA Banner */}
      <section className="py-14 bg-gradient-to-r from-[#0a2265] via-[#091b4a] to-[#041238] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Direct Safari Consultation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
                Ready to Plan Your Dream Safari?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly with our itinerary planning team at <strong className="text-white">Push Building, Thome along Northern Bypass in Nairobi</strong>. Call or WhatsApp us at <strong className="text-amber-300">0725 356 926</strong> or request a tailored proposal.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="https://wa.me/254725356926"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Chat on WhatsApp
              </a>
              <button
                onClick={() => onRequestQuoteClick()}
                className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#801416] hover:bg-[#991b1b] rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Request Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
