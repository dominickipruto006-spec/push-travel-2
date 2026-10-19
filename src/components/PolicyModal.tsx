import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  policyName: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyName, onClose }) => {
  if (!policyName) return null;

  const contentMap: Record<string, { title: string; sections: { heading: string; text: string }[] }> = {
    'Privacy Policy': {
      title: 'Push World Travel Privacy Policy',
      sections: [
        {
          heading: 'Information We Collect',
          text: 'Push World Travel Ltd collects personal contact information (full name, email address, phone/WhatsApp number, passport identification for park permits) solely to organize and fulfill travel arrangements, national park entry clearances, and lodge reservations across Kenya, Tanzania, Uganda, and Rwanda.',
        },
        {
          heading: 'Data Protection & Sharing',
          text: 'We never sell, lease, or distribute your private information to third-party marketing services. Details are only shared with official conservation bodies (e.g., Kenya Wildlife Service, Tanzania National Parks Authority, Rwanda Development Board) and booked accommodations strictly required to operate your itinerary.',
        },
        {
          heading: 'Security & Payment Safeguards',
          text: 'All digital communications and booking inquiries are encrypted with standard SSL protocols. Payment transfers are handled via secured bank wire or PCI-DSS certified payment processors.',
        },
      ],
    },
    'Cancellation & Refund Policy': {
      title: 'Cancellation & Refund Terms',
      sections: [
        {
          heading: 'Client Cancellation Timelines',
          text: 'Cancellations received 61 days or more prior to safari departure will receive a full refund less administrative processing fees and non-refundable gorilla or chimpanzee tracking permits.',
        },
        {
          heading: 'Standard Cancellation Schedule',
          text: '60 to 31 days prior to departure: 75% refund of total safari cost. 30 to 15 days prior to departure: 50% refund. Cancellations made 14 days or less prior to travel or no-shows are non-refundable due to contractual commitments with remote lodges and safari camps.',
        },
        {
          heading: 'Permit Regulations',
          text: 'Gorilla trekking permits in Rwanda and Uganda are strictly non-refundable and subject to the direct terms of the respective wildlife authorities (RDB and UWA).',
        },
      ],
    },
    'Amendment Policy': {
      title: 'Safari Amendment & Itinerary Modification',
      sections: [
        {
          heading: 'Client-Requested Date Changes',
          text: 'Push World Travel Ltd allows date adjustments up to 45 days before departure subject to lodge availability and seasonal room price variations without punitive amendment penalties.',
        },
        {
          heading: 'Operational Route Modifications',
          text: 'Occasionally, unforeseen environmental conditions (heavy seasonal rain, unseasonal animal migration paths, or road washouts) require our certified guides to adjust driving routes to protect guest safety while guaranteeing equivalent or superior game viewing opportunities.',
        },
      ],
    },
    'Payment Policy': {
      title: 'Payment Schedules & Currencies',
      sections: [
        {
          heading: 'Deposit & Balance Due',
          text: 'A 30% deposit is required at the time of safari confirmation to lock in vehicle allocations and lodge rooms (plus 100% of gorilla permits if applicable). The remaining 70% balance is payable 30 days prior to departure.',
        },
        {
          heading: 'Accepted Methods of Payment',
          text: 'We accept international bank wire transfers (USD, EUR, GBP) to our corporate accounts in Nairobi and Arusha, as well as major credit cards (Visa, MasterCard, American Express). All bank transaction fees are borne by the sender.',
        },
      ],
    },
    'Terms and Conditions': {
      title: 'Push World Travel Booking Terms & Conditions',
      sections: [
        {
          heading: 'Tour Operator Liability',
          text: 'Push World Travel Ltd operates as an experienced tour organizer. We carry comprehensive public liability and passenger service vehicle (PSV) insurance for all custom 4x4 Land Cruisers and Safari vans.',
        },
        {
          heading: 'Travel Insurance Requirement',
          text: 'All guests traveling on East African safaris are strongly advised to obtain comprehensive personal travel insurance covering medical emergency evacuation (such as AMREF Flying Doctors coverage, which we arrange), trip interruption, and luggage loss.',
        },
        {
          heading: 'Park Regulations & Environmental Stewardship',
          text: 'All travelers must adhere strictly to national park regulations: never alight from vehicles outside designated zones, maintain quiet observation near wildlife, and support our zero-litter policy.',
        },
      ],
    },
  };

  const currentPolicy = contentMap[policyName] || {
    title: policyName,
    sections: [
      {
        heading: 'General Terms',
        text: 'For detailed inquiries regarding this policy, please reach out to our customer operations desk at pushworldtravel@gmail.com or via telephone/WhatsApp at 0725 356 926.',
      },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#0a2265] text-white p-5 pr-14 flex items-center justify-between shrink-0 relative">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold font-['Outfit',sans-serif]">
              {currentPolicy.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
          {currentPolicy.sections.map((sec, idx) => (
            <div key={idx}>
              <h4 className="text-xs font-bold uppercase text-[#0a2265] tracking-wider mb-1.5">
                {sec.heading}
              </h4>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-normal">
                {sec.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#0a2265] hover:bg-[#103088] rounded-lg cursor-pointer"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
