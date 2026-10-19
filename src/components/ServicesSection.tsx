import React, { useState } from 'react';
import {
  Compass,
  Plane,
  Hotel,
  Crown,
  Sliders,
  Briefcase,
  ShieldCheck,
  Car,
  FileCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PUSH_WORLD_SERVICES } from '../data/travelData';
import { TravelService } from '../types/travel';

interface ServicesSectionProps {
  onInquireService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onInquireService }) => {
  const [selectedService, setSelectedService] = useState<TravelService | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#ea580c]" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-[#1d4ed8]" />;
      case 'Hotel':
        return <Hotel className="w-6 h-6 text-[#0a2265]" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#d97706]" />;
      case 'Sliders':
        return <Sliders className="w-6 h-6 text-[#ea580c]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#0f766e]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#16a34a]" />;
      case 'Car':
        return <Car className="w-6 h-6 text-[#2563eb]" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-[#9333ea]" />;
      default:
        return <Compass className="w-6 h-6 text-[#ea580c]" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1.5">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2265] tracking-tight font-['Outfit',sans-serif]">
            Our Core Travel Services
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Push World Travel delivers comprehensive corporate, leisure, and luxury travel management.
            Explore our specialized range of professional travel services designed to ensure seamless global journeys.
          </p>
        </div>

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PUSH_WORLD_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header with Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200/70 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0a2265] transition-colors leading-snug font-['Outfit',sans-serif]">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Short Professional Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                  {service.shortDescription}
                </p>

                {/* Deliverables Bullet Points */}
                <ul className="space-y-2 mb-6 text-xs text-slate-700">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <button
                  onClick={() => onInquireService(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a2265] hover:text-[#ea580c] transition-colors cursor-pointer group-hover:translate-x-0.5"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ea580c]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate & Bespoke Assurance Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-[#0a2265] to-[#123999] rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
              Bespoke Corporate &amp; VIP Travel Desk
            </span>
            <h4 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif]">
              Need a tailored arrangement or dedicated travel account manager?
            </h4>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              From diplomatic delegations to executive team retreats, our Northern By-Pass headquarters coordinates all logistics with discretion.
            </p>
          </div>
          <button
            onClick={() => onInquireService('Corporate & Bespoke Travel')}
            className="px-6 py-3 text-xs sm:text-sm font-bold uppercase text-[#0a2265] bg-white hover:bg-amber-300 rounded-lg shadow-md transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            Speak with Corporate Team
          </button>
        </div>
      </div>
    </section>
  );
};
