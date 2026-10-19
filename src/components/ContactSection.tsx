import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, X, CheckCircle2, Send, Globe } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'United States',
    phoneCode: '+1',
    phoneNumber: '',
    email: '',
    safariStartDate: '2026-10-19',
    durationOfTour: '',
    adultsCount: '2',
    childrenCount: '0',
    estimatedBudget: '',
    currency: 'USD',
    safariType: 'Safari Only',
    countriesOfInterest: 'Kenya',
    otherTourDescription: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `PWT-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(code);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column matching Image 1: Our Contacts, Working Time, Offices, Address Map */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {/* 1. Our Contacts */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#801416] font-['Outfit',sans-serif] mb-4">
                Our Contacts
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-[#801416] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 fill-[#801416]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Phone :{' '}
                    <a
                      href="tel:+254725356926"
                      className="hover:text-[#ea580c] transition-colors"
                    >
                      0725 356 926
                    </a>{' '}
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full ml-1">
                      (Call &amp; WhatsApp)
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-[#801416] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#801416]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Email :{' '}
                    <a
                      href="mailto:pushworldtravel@gmail.com"
                      className="hover:text-[#ea580c] transition-colors"
                    >
                      pushworldtravel@gmail.com
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Our Working Time matching Screenshot 1 */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#801416] font-['Outfit',sans-serif] mb-2">
                Our Working Time
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                {COMPANY_INFO.workingHours.description}
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-red-50 text-[#801416] flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#801416]" />
                  </div>
                  <span>Monday – Friday : {COMPANY_INFO.workingHours.monFri}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-red-50 text-[#801416] flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#801416]" />
                  </div>
                  <span>Saturday : {COMPANY_INFO.workingHours.sat}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-red-50 text-rose-700 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-500">Sunday ( Office Closed )</span>
                </div>
              </div>
            </div>

            {/* 3. Our Offices - Kenya Northern By-Pass (Tanzania removed) */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#801416] font-['Outfit',sans-serif] mb-3">
                Our Office
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-red-50 text-[#801416] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#801416]" />
                  </div>
                  <div>
                    <strong className="text-slate-900">Kenya :</strong>{' '}
                    <span className="text-[#801416] font-semibold">
                      Northern By-Pass, Nairobi
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      Headquarters &amp; Dispatch Fleet Hub
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Our Address Map View matching Screenshot 1 */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#801416] font-['Outfit',sans-serif] mb-3">
                Our Address
              </h3>
              <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 flex items-center justify-center">
                {/* Visual Map Representation */}
                <div className="absolute inset-0 bg-[#e5e3df] flex flex-col justify-between p-3 opacity-90">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>Northern By-Pass / Thika Rd Interchange</span>
                    <span>Nairobi, Kenya</span>
                  </div>
                  {/* Map Roads Graphic */}
                  <div className="relative w-full h-20">
                    <div className="absolute top-1/2 left-0 right-0 h-3 bg-amber-200 -rotate-2 transform"></div>
                    <div className="absolute top-0 bottom-0 left-1/3 w-3 bg-white rotate-12 transform"></div>
                    <div className="absolute top-0 bottom-0 right-1/4 w-3 bg-amber-100 -rotate-6 transform"></div>
                    {/* Location Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="px-2 py-1 bg-white rounded shadow text-[10px] font-bold text-[#801416] whitespace-nowrap border border-slate-200">
                        Push World Travel Ltd
                      </div>
                      <MapPin className="w-6 h-6 text-rose-600 fill-rose-600 drop-shadow" />
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    GPS Coordinates: 1.2215° S, 36.8850° E
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column matching Image 1: "Get In Touch" Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#801416] font-['Outfit',sans-serif] mb-6">
              Get In Touch
            </h3>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-emerald-950 font-['Outfit',sans-serif]">
                  Inquiry Submitted Successfully!
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you, {formData.firstName}. Our tour consultation team at our Northern By-Pass office is reviewing your itinerary requirements.
                </p>
                <div className="text-xs font-mono font-bold text-[#801416] bg-white px-4 py-2 rounded-lg inline-block shadow-xs border border-emerald-200">
                  Reference: {referenceCode}
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 text-xs font-bold text-white bg-[#801416] rounded-lg cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Last Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416]"
                    />
                  </div>
                </div>

                {/* Country & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Country <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416] cursor-pointer"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Uganda">Uganda</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Other Country">Other Country</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex">
                      <input
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="+1 201-555-0123"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416]"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416]"
                  />
                </div>

                {/* Safari Start Date & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Safari Start Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.safariStartDate}
                      onChange={(e) => setFormData({ ...formData, safariStartDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Duration of Tour <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.durationOfTour}
                      onChange={(e) => setFormData({ ...formData, durationOfTour: e.target.value })}
                      placeholder="Enter Number of Days"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416]"
                    />
                  </div>
                </div>

                {/* Adults & Children Count */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Number of Adults <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      required
                      value={formData.adultsCount}
                      onChange={(e) => setFormData({ ...formData, adultsCount: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Number of Children <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.childrenCount}
                      onChange={(e) => setFormData({ ...formData, childrenCount: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416]"
                    />
                  </div>
                </div>

                {/* Estimated Budget & Currency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Estimated Budget of Tour (Per Person) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      placeholder="e.g. Flexible / Moderate / Luxury"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Currency <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416] cursor-pointer"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="KES">KES (KSh)</option>
                    </select>
                  </div>
                </div>

                {/* Type of Safari Radio Buttons matching Screenshot 1 */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">
                    Type of Safari <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="safariType"
                        value="Safari Only"
                        checked={formData.safariType === 'Safari Only'}
                        onChange={(e) => setFormData({ ...formData, safariType: e.target.value as any })}
                        className="text-[#801416] focus:ring-[#801416]"
                      />
                      <span>Safari Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="safariType"
                        value="Safari & Beach combined"
                        checked={formData.safariType === 'Safari & Beach combined'}
                        onChange={(e) => setFormData({ ...formData, safariType: e.target.value as any })}
                        className="text-[#801416] focus:ring-[#801416]"
                      />
                      <span>Safari &amp; Beach combined</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="safariType"
                        value="Beach Only"
                        checked={formData.safariType === 'Beach Only'}
                        onChange={(e) => setFormData({ ...formData, safariType: e.target.value as any })}
                        className="text-[#801416] focus:ring-[#801416]"
                      />
                      <span>Beach Only</span>
                    </label>
                  </div>
                </div>

                {/* Countries of Interest to Visit */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Countries of Interest to Visit <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.countriesOfInterest}
                    onChange={(e) => setFormData({ ...formData, countriesOfInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416] cursor-pointer"
                  >
                    <option value="Kenya">Kenya (Maasai Mara, Amboseli, Samburu)</option>
                    <option value="Tanzania">Tanzania (Serengeti, Ngorongoro, Zanzibar)</option>
                    <option value="Kenya & Tanzania">Kenya &amp; Tanzania Grand Circuit</option>
                    <option value="Rwanda">Rwanda (Gorilla &amp; Primate Trekking)</option>
                    <option value="Uganda">Uganda (Bwindi Forest &amp; Queen Elizabeth)</option>
                    <option value="Multi-Country East Africa">Multi-Country East Africa (Kenya, Tanzania, Rwanda)</option>
                    <option value="International Worldwide">International Worldwide Getaway</option>
                  </select>
                </div>

                {/* Any other Tour Description matching Screenshot 1 */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Any other Tour Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.otherTourDescription}
                    onChange={(e) => setFormData({ ...formData, otherTourDescription: e.target.value })}
                    placeholder="Please share any special dietary, physical, or other important details for us to meet your needs during the tour."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#801416] resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 text-sm font-bold uppercase tracking-wide text-white bg-[#801416] hover:bg-[#991b1b] rounded-lg shadow-sm hover:shadow transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Submit Tour Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
