import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Users, Send, ShieldCheck, MapPin } from 'lucide-react';
import { COMPANY_INFO, DESTINATIONS, TOUR_PACKAGES } from '../data/travelData';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    destination?: string;
    safariType?: string;
    packageName?: string;
  };
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryOfResidence: '',
    selectedDestination: initialData?.destination || 'Maasai Mara National Reserve, Kenya',
    selectedPackageName: initialData?.packageName || 'Tailored East African Safari',
    travelDate: '2026-10-25',
    durationDays: '5',
    adultsCount: '2',
    childrenCount: '0',
    tierPreference: 'Comfort & Mid-Range',
    accommodationPreference: 'Luxury Tented Camps',
    specialRequirements: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  React.useEffect(() => {
    if (isOpen && initialData) {
      setFormData((prev) => ({
        ...prev,
        selectedDestination: initialData.destination || prev.selectedDestination,
        selectedPackageName: initialData.packageName || prev.selectedPackageName,
      }));
      setIsSubmitted(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `PWT-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(refCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200">
        {/* Header */}
        <div className="bg-[#0a2265] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Push World Travel · Headquarters: Northern By-Pass
          </span>
          <h3 className="text-2xl font-black font-['Outfit',sans-serif]">
            Request A Tailored Travel Proposal
          </h3>
          <p className="text-xs text-blue-100 mt-1">
            Personalized within 2 hours by our travel specialists at our Northern By-Pass headquarters.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Inquiry Received Successfully!
            </h4>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-mono font-bold text-[#801416] text-sm">
                  {referenceId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Primary Contact:</span>
                <span className="font-semibold text-slate-800">{formData.fullName} ({formData.email})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination / Tour:</span>
                <span className="font-semibold text-slate-800">{formData.selectedPackageName || formData.selectedDestination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Travel Party:</span>
                <span className="font-semibold text-slate-800">{formData.durationDays} Days · {formData.adultsCount} Adults</span>
              </div>
            </div>

            <p className="text-slate-600 text-xs max-w-md mx-auto">
              Our safari coordinator at our Northern By-Pass headquarters is preparing your day-by-day itinerary and vehicle logistics. An official quote will be delivered to your email shortly.
            </p>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#801416] hover:bg-[#991b1b] rounded-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-left text-sm max-h-[75vh] overflow-y-auto">
            {/* Contact details */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                1. Traveler Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-1 focus:ring-[#801416] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-1 focus:ring-[#801416] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 555 0192 / +254..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-1 focus:ring-[#801416] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    value={formData.countryOfResidence}
                    onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
                    placeholder="United States, UK, Germany..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-1 focus:ring-[#801416] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Trip Requirements */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                2. Travel Preferences
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Selected Itinerary / Destination
                  </label>
                  <select
                    value={formData.selectedDestination}
                    onChange={(e) => setFormData({ ...formData, selectedDestination: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-1 focus:ring-[#801416] focus:outline-none cursor-pointer"
                  >
                    <option value="Maasai Mara National Reserve, Kenya">Maasai Mara National Reserve, Kenya</option>
                    <option value="Serengeti National Park, Tanzania">Serengeti National Park, Tanzania</option>
                    <option value="Amboseli National Park, Kenya">Amboseli National Park, Kenya</option>
                    <option value="Lake Nakuru, Kenya">Lake Nakuru, Kenya</option>
                    <option value="Bwindi Gorilla Trekking, Uganda">Bwindi Gorilla Trekking, Uganda</option>
                    <option value="Volcanoes National Park, Rwanda">Volcanoes National Park, Rwanda</option>
                    <option value="Kenya & Tanzania Combo Circuit">Kenya &amp; Tanzania Combo Circuit</option>
                    <option value="Zanzibar & Bush to Beach">Zanzibar &amp; Bush to Beach</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Target Travel Date
                  </label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-1 focus:ring-[#801416] focus:outline-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-1">
                      Days
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={formData.durationDays}
                      onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
                      className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-1">
                      Adults
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={formData.adultsCount}
                      onChange={(e) => setFormData({ ...formData, adultsCount: e.target.value })}
                      className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-1">
                      Children
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={formData.childrenCount}
                      onChange={(e) => setFormData({ ...formData, childrenCount: e.target.value })}
                      className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Travel Standard Preference
                  </label>
                  <select
                    value={formData.tierPreference}
                    onChange={(e) => setFormData({ ...formData, tierPreference: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-1 focus:ring-[#801416] focus:outline-none cursor-pointer"
                  >
                    <option value="Comfort & Mid-Range">Comfort &amp; Mid-Range</option>
                    <option value="Luxury Boutique & 5-Star">Luxury Boutique &amp; 5-Star</option>
                    <option value="Ultra-Luxury VIP & Private Air">Ultra-Luxury VIP &amp; Private Air</option>
                    <option value="Standard / Affordable">Standard / Affordable</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Special Requests or Dietary / Medical Considerations
              </label>
              <textarea
                rows={2}
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                placeholder="e.g. Hot air balloon safari, family room interconnecting, vegetarian, photography focus..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-1 focus:ring-[#801416] focus:outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                No obligation · 100% Tailored quote
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#801416] hover:bg-[#991b1b] rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Quote Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
