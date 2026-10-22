import React, { useState, useEffect } from 'react';
import {
  FileText,
  ShieldCheck,
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Upload,
  Calendar,
  Plane,
  MapPin,
  User,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Download,
  Printer,
  Eye,
  Check,
  HelpCircle,
  ExternalLink,
  DollarSign,
  Building,
  Sparkles,
  QrCode,
  FileCheck2,
  X,
  BadgeAlert,
  Compass,
} from 'lucide-react';
import {
  EtaApplication,
  EtaApplicationFormData,
  PaymentBreakdown,
  PaymentDetails,
  EtaStatus,
} from '../types/eta';
import {
  etaService,
  calculatePricing,
  BASE_PACKAGE_PRICE,
  CARD_PROCESSING_FEE_RATE,
} from '../services/etaService';
import { COMPANY_INFO } from '../data/travelData';

interface KenyaEtaSectionProps {
  onNavigateHome?: () => void;
  onContactClick?: () => void;
}

export const KenyaEtaSection: React.FC<KenyaEtaSectionProps> = ({
  onNavigateHome,
  onContactClick,
}) => {
  // Navigation sub-tabs
  const [activeTab, setActiveTab] = useState<'apply' | 'track' | 'pricing' | 'insurance' | 'faq' | 'admin'>('apply');

  // Multi-step Application Wizard State (Steps 1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState<EtaApplication | null>(null);

  // Form State
  const [formData, setFormData] = useState<EtaApplicationFormData>({
    surname: '',
    givenNames: '',
    nationality: 'United States',
    countryOfBirth: 'United States',
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportIssuingCountry: 'United States',
    dateOfBirth: '',
    gender: 'Male',
    maritalStatus: 'Married',
    occupation: '',
    email: '',
    phone: '',
    residenceCountry: 'United States',
    residenceCity: '',
    residentialAddress: '',

    purposeOfVisit: 'Holiday / Wildlife Safari',
    arrivalDate: '',
    departureDate: '',
    portOfEntry: 'Jomo Kenyatta International Airport (JKIA) - Nairobi',
    airline: '',
    flightNumber: '',
    accommodationType: 'Hotel / Safari Lodge',
    accommodationName: '',
    accommodationAddress: '',

    yellowFeverVaccinated: true,
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: 'Spouse',

    passportBioDataUrl: '',
    passportPhotoUrl: '',
    flightTicketUrl: '',
    accommodationProofUrl: '',

    // Mandatory Applicant Declarations and Statutory Consents
    confirmInformationAccuracy: false,
    authoriseProcessing: false,
    acceptTermsPrivacy: false,
    acknowledgeGovDecision: false,
    acknowledgeNoGuarantee: false,
    understandRefundPolicy: false,
    consentSensitiveData: false,
    agreeToTerms: false,
  });

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentApplication, setPaymentApplication] = useState<EtaApplication | null>(null);
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingCountry, setBillingCountry] = useState('United States');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'card_input' | 'processing' | 'success'>('card_input');
  const [completedPayment, setCompletedPayment] = useState<PaymentDetails | null>(null);

  // Tracker State
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedApplication, setTrackedApplication] = useState<EtaApplication | null>(null);
  const [trackError, setTrackError] = useState<string | null>(null);
  const [isSearchingTrack, setIsSearchingTrack] = useState(false);

  // Admin Dashboard State
  const [adminApplications, setAdminApplications] = useState<EtaApplication[]>([]);
  const [selectedAdminApp, setSelectedAdminApp] = useState<EtaApplication | null>(null);
  const [adminFilter, setAdminFilter] = useState<'all' | 'submitted' | 'under_review' | 'approved'>('all');
  const [adminSearch, setAdminSearch] = useState('');
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminPasscodeError, setAdminPasscodeError] = useState(false);

  // Load Admin Applications on mount or tab change
  useEffect(() => {
    etaService.getAllApplications().then((apps) => {
      setAdminApplications(apps);
    });
  }, [activeTab]);

  // Pricing calculation
  const pricing: PaymentBreakdown = calculatePricing(BASE_PACKAGE_PRICE);

  // Handle Input Changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Mock File Upload Converter to Data URL for instant real preview
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'passportBioDataUrl' | 'passportPhotoUrl' | 'flightTicketUrl' | 'accommodationProofUrl'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({ ...prev, [field]: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Quick Photo Sample Fillers for rapid user testing
  const setSamplePassportBio = () => {
    setFormData((prev) => ({
      ...prev,
      passportBioDataUrl:
        'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    }));
  };

  const setSamplePassportPhoto = () => {
    setFormData((prev) => ({
      ...prev,
      passportPhotoUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    }));
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.surname.trim() || !formData.givenNames.trim()) {
        alert('Please enter your full Surname and Given Names as shown in your passport.');
        return false;
      }
      if (!formData.passportNumber.trim()) {
        alert('Please enter your valid Passport Number.');
        return false;
      }
      if (!formData.passportExpiryDate) {
        alert('Please enter your Passport Expiry Date.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        alert('Please enter a valid Email Address for electronic eTA delivery.');
        return false;
      }
      if (!formData.phone.trim()) {
        alert('Please enter your Phone / WhatsApp number.');
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (!formData.arrivalDate) {
        alert('Please select your expected Arrival Date in Kenya.');
        return false;
      }
      if (!formData.departureDate) {
        alert('Please select your Departure Date.');
        return false;
      }
      if (!formData.flightNumber.trim()) {
        alert('Please enter your Flight Number (e.g. KQ 101, BA 065, LH 590).');
        return false;
      }
      if (!formData.accommodationName.trim()) {
        alert('Please enter your Accommodation or Safari Lodge in Kenya.');
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (!formData.emergencyContactName.trim() || !formData.emergencyContactPhone.trim()) {
        alert('Please provide emergency contact details.');
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (!formData.passportBioDataUrl) {
        alert('Please upload your Passport Bio-Data page (or click "Use Sample Document" for instant preview).');
        return false;
      }
      if (!formData.passportPhotoUrl) {
        alert('Please upload your Recent Passport Photo / Selfie (or click "Use Sample Photo").');
        return false;
      }
      
      const missingDeclarations: string[] = [];
      if (!formData.confirmInformationAccuracy) {
        missingDeclarations.push('Information accuracy & document match confirmation');
      }
      if (!formData.authoriseProcessing) {
        missingDeclarations.push('Authorisation for Push World Travel Ltd to process travel data');
      }
      if (!formData.acceptTermsPrivacy) {
        missingDeclarations.push('Privacy policy and service terms agreement');
      }
      if (!formData.acknowledgeGovDecision) {
        missingDeclarations.push('Acknowledgment that Government of Kenya makes final approval decision');
      }
      if (!formData.acknowledgeNoGuarantee) {
        missingDeclarations.push('Understanding that application/payment does not guarantee approval');
      }
      if (!formData.understandRefundPolicy) {
        missingDeclarations.push('Understanding of applicable refund and cancellation policy');
      }
      if (!formData.consentSensitiveData) {
        missingDeclarations.push('Consent for handling sensitive travel documents and sharing with authorities');
      }

      if (missingDeclarations.length > 0) {
        alert(
          `Please confirm all 7 mandatory applicant declarations before proceeding:\n\n• ${missingDeclarations.join('\n• ')}`
        );
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  // Submit Application Form to Backend & Open Payment Gateway
  const handleFinalSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const res = await etaService.submitApplication(formData);
      if (res.success && res.application) {
        setApplicationSuccess(res.application);
        setPaymentApplication(res.application);
        setCardholderName(`${formData.givenNames} ${formData.surname}`);
        setIsPaymentModalOpen(true);
        // Refresh admin list in background
        etaService.getAllApplications().then(setAdminApplications);
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Application could not be submitted. Please check connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // International Payment Gateway Checkout Simulation
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setExpiryDate(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setExpiryDate(raw);
    }
  };

  const executePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentApplication) return;

    const cleanCard = cardNumber.replace(/\s+/g, '');
    if (cleanCard.length < 15) {
      alert('Please enter a valid 15 or 16-digit card number.');
      return false;
    }
    if (expiryDate.length < 5) {
      alert('Please enter valid expiration date (MM/YY).');
      return false;
    }
    if (cvv.length < 3) {
      alert('Please enter a valid 3 or 4-digit CVV security code.');
      return false;
    }

    setPaymentProcessing(true);
    setPaymentStep('processing');

    try {
      // Simulate real 3DS verification roundtrip
      await new Promise((r) => setTimeout(r, 2200));

      const [mm, yy] = expiryDate.split('/');
      const res = await etaService.processPayment(paymentApplication.id, {
        cardholderName,
        cardNumber: cleanCard,
        expiryMonth: mm || '12',
        expiryYear: yy || '28',
        cvv,
        billingCountry,
      });

      if (res.success && res.application && res.payment) {
        setPaymentApplication(res.application);
        setCompletedPayment(res.payment);
        setPaymentStep('success');
        // Refresh admin applications
        etaService.getAllApplications().then(setAdminApplications);
      } else {
        alert(
          res.error ||
            'Payment verification failed on the backend gateway. The application has NOT been marked as paid. Please check your card information and try again.'
        );
        setPaymentStep('card_input');
      }
    } catch (err: any) {
      alert(err.message || 'Payment processing failed. Application remains unpaid.');
      setPaymentStep('card_input');
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Search Application Status
  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;

    setIsSearchingTrack(true);
    setTrackError(null);
    setTrackedApplication(null);

    try {
      const found = await etaService.trackApplication(trackQuery);
      if (found) {
        setTrackedApplication(found);
      } else {
        setTrackError(`No application record found for "${trackQuery}". Please verify your reference number or passport number.`);
      }
    } catch (err) {
      setTrackError('Error connecting to Kenya Immigration records database. Please try again.');
    } finally {
      setIsSearchingTrack(false);
    }
  };

  // Admin Actions
  const handleAdminStatusChange = async (appId: string, newStatus: EtaStatus) => {
    const res = await etaService.updateApplicationStatus(appId, newStatus, adminNotesInput);
    if (res.success && res.application) {
      setSelectedAdminApp(res.application);
      const apps = await etaService.getAllApplications();
      setAdminApplications(apps);
      alert(`Application ${appId} status updated to: ${newStatus.toUpperCase()}`);
    }
  };

  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Passcode for Immigration Desk Staff: push2026 or 0725
    if (adminPasscode.trim() === 'push2026' || adminPasscode.trim() === '0725' || adminPasscode.trim() === 'admin') {
      setIsAdminUnlocked(true);
      setAdminPasscodeError(false);
    } else {
      setAdminPasscodeError(true);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Header Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#0a2265] via-[#0d2a7a] to-[#041238] text-white py-14 sm:py-20 border-b border-slate-200 overflow-hidden">
        {/* Subtle decorative background patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Push World Travel Ltd Visa &amp; Immigration Assistance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-['Outfit',sans-serif] uppercase max-w-4xl mx-auto drop-shadow-sm">
            Kenya eTA Application &amp; Travel Insurance
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-4 mb-4 rounded-full" />

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-light">
            Effective January 2024, all foreign international travelers entering Kenya must obtain an authorized <strong>Electronic Travel Authorisation (eTA)</strong> prior to departure. Our dedicated immigration desk at <strong className="text-white">Push Building, Thome, Northern Bypass, Nairobi</strong> provides turnkey fast-track filing, passport verification, and comprehensive AMREF medical evacuation travel insurance.
          </p>

          {/* Key Assurance Highlights */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15 flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-amber-300 shrink-0" />
              <div>
                <span className="block text-xs font-bold text-white">Fast-Track Filing</span>
                <span className="text-[11px] text-slate-300">24 – 72 hr processing</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="block text-xs font-bold text-white">Travel Insurance</span>
                <span className="text-[11px] text-slate-300">AMREF Flying Doctors</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15 flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-sky-300 shrink-0" />
              <div>
                <span className="block text-xs font-bold text-white">Transparent Price</span>
                <span className="text-[11px] text-slate-300">USD 150 + 5% card fee</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15 flex items-center gap-2.5">
              <Building className="w-5 h-5 text-amber-300 shrink-0" />
              <div>
                <span className="block text-xs font-bold text-white">Nairobi Office Hub</span>
                <span className="text-[11px] text-slate-300">Push Bldg, Thome</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Section Sub-Navigation Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2 gap-2 text-xs sm:text-sm font-bold">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('apply')}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  activeTab === 'apply'
                    ? 'bg-[#0a2265] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>1. Apply for eTA &amp; Insurance</span>
              </button>

              <button
                onClick={() => setActiveTab('pricing')}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  activeTab === 'pricing'
                    ? 'bg-[#0a2265] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>2. Pricing &amp; Fees (USD 157.50)</span>
              </button>

              <button
                onClick={() => setActiveTab('track')}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  activeTab === 'track'
                    ? 'bg-[#0a2265] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>3. Track Status &amp; Download</span>
              </button>

              <button
                onClick={() => setActiveTab('insurance')}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  activeTab === 'insurance'
                    ? 'bg-[#0a2265] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>4. Insurance Policy</span>
              </button>

              <button
                onClick={() => setActiveTab('faq')}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  activeTab === 'faq'
                    ? 'bg-[#0a2265] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>5. eTA FAQs &amp; Rules</span>
              </button>
            </div>

            {/* Admin Desk Access Button */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                  : 'border-slate-300 text-slate-700 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-900'
              }`}
              title="Official Push World Travel Operations & Immigration Review"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Immigration Desk Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Content Views */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* ===================== TAB 1: APPLY FOR eTA & INSURANCE WIZARD ===================== */}
        {activeTab === 'apply' && (
          <div className="max-w-4xl mx-auto">
            {/* Multi-step progress bar */}
            <div className="mb-8 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-3 text-xs font-bold">
                <span className="text-[#0a2265] uppercase tracking-wider">
                  Step {currentStep} of 5: {
                    currentStep === 1 ? 'Personal & Passport Details' :
                    currentStep === 2 ? 'Kenya Travel & Accommodation' :
                    currentStep === 3 ? 'Health & Emergency Contacts' :
                    currentStep === 4 ? 'Document Uploads & Verification' :
                    'Package Summary & Payment Gateway'
                  }
                </span>
                <span className="text-[#ea580c] font-bold">
                  {Math.round((currentStep / 5) * 100)}% Complete
                </span>
              </div>

              {/* Progress bar line */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#0a2265] via-[#ea580c] to-emerald-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>

              {/* Step pills */}
              <div className="grid grid-cols-5 gap-1 sm:gap-2 mt-4 text-center">
                {[
                  { step: 1, title: 'Biodata' },
                  { step: 2, title: 'Trip' },
                  { step: 3, title: 'Health' },
                  { step: 4, title: 'Uploads' },
                  { step: 5, title: 'Payment' },
                ].map((s) => (
                  <button
                    key={s.step}
                    disabled={s.step > currentStep}
                    onClick={() => setCurrentStep(s.step)}
                    className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      currentStep === s.step
                        ? 'bg-[#0a2265] text-white shadow-xs'
                        : s.step < currentStep
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{s.step}. {s.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
              {/* STEP 1: Traveler Biodata */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0a2265] font-['Outfit',sans-serif]">
                      Applicant Identity &amp; Passport Biodata
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Enter information exactly as shown in your Machine Readable Passport (MRP).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Surname / Family Name *
                      </label>
                      <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        placeholder="e.g. SMITH"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none uppercase font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Given Names (First &amp; Middle) *
                      </label>
                      <input
                        type="text"
                        name="givenNames"
                        value={formData.givenNames}
                        onChange={handleInputChange}
                        placeholder="e.g. John Robert"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nationality / Citizenship *
                      </label>
                      <select
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white cursor-pointer font-medium"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Poland">Poland</option>
                        <option value="Spain">Spain</option>
                        <option value="Italy">Italy</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Norway">Norway</option>
                        <option value="India">India</option>
                        <option value="China">China</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Japan">Japan</option>
                        <option value="Other">Other International Country</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Country of Birth
                      </label>
                      <input
                        type="text"
                        name="countryOfBirth"
                        value={formData.countryOfBirth}
                        onChange={handleInputChange}
                        placeholder="e.g. United States"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Passport Number *
                      </label>
                      <input
                        type="text"
                        name="passportNumber"
                        value={formData.passportNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. A12345678"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none uppercase font-mono font-bold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Passport Issuing Country
                      </label>
                      <input
                        type="text"
                        name="passportIssuingCountry"
                        value={formData.passportIssuingCountry}
                        onChange={handleInputChange}
                        placeholder="e.g. United States"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Passport Issue Date *
                      </label>
                      <input
                        type="date"
                        name="passportIssueDate"
                        value={formData.passportIssueDate}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Passport Expiry Date * (Min. 6 mos validity)
                      </label>
                      <input
                        type="date"
                        name="passportExpiryDate"
                        value={formData.passportExpiryDate}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white cursor-pointer font-medium"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Marital Status
                      </label>
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white cursor-pointer font-medium"
                      >
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Occupation / Profession
                      </label>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        placeholder="e.g. Software Engineer, Doctor, Consultant"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Primary Email Address * (For eTA delivery)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. traveler@email.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp with Country Code *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +1 555 123 4567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Current Residential Address (Street, City, Postcode, Country)
                      </label>
                      <input
                        type="text"
                        name="residentialAddress"
                        value={formData.residentialAddress}
                        onChange={handleInputChange}
                        placeholder="e.g. 742 Evergreen Terrace, Springfield, OR 97477, USA"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Trip Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Kenya Trip & Travel Details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0a2265] font-['Outfit',sans-serif]">
                      Kenya Journey &amp; Arrival Particulars
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Information required by the Department of Immigration Services Kenya for entry validation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Purpose of Travel *
                      </label>
                      <select
                        name="purposeOfVisit"
                        value={formData.purposeOfVisit}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white cursor-pointer font-medium"
                      >
                        <option value="Holiday / Wildlife Safari">Holiday / Wildlife Safari</option>
                        <option value="Business & Meetings">Business &amp; Meetings</option>
                        <option value="Family & Friends">Visiting Family &amp; Friends</option>
                        <option value="Transit">Transit Through Kenya</option>
                        <option value="Conference / Event">International Conference / Summit</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Port of Entry into Kenya *
                      </label>
                      <select
                        name="portOfEntry"
                        value={formData.portOfEntry}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white cursor-pointer font-medium"
                      >
                        <option value="Jomo Kenyatta International Airport (JKIA) - Nairobi">Jomo Kenyatta International Airport (JKIA) - Nairobi</option>
                        <option value="Moi International Airport (MBA) - Mombasa">Moi International Airport (MBA) - Mombasa</option>
                        <option value="Kisumu International Airport (KIS)">Kisumu International Airport (KIS)</option>
                        <option value="Malindi Airport (MYD)">Malindi Airport (MYD)</option>
                        <option value="Namanga Land Border (Kenya - Tanzania)">Namanga Land Border (Kenya - Tanzania)</option>
                        <option value="Isebania Land Border (Kenya - Tanzania)">Isebania Land Border (Kenya - Tanzania)</option>
                        <option value="Busia Land Border (Kenya - Uganda)">Busia Land Border (Kenya - Uganda)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Expected Arrival Date in Kenya *
                      </label>
                      <input
                        type="date"
                        name="arrivalDate"
                        value={formData.arrivalDate}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Scheduled Departure Date from Kenya *
                      </label>
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Airline Carrier *
                      </label>
                      <input
                        type="text"
                        name="airline"
                        value={formData.airline}
                        onChange={handleInputChange}
                        placeholder="e.g. Kenya Airways, British Airways, Lufthansa"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Flight Number *
                      </label>
                      <input
                        type="text"
                        name="flightNumber"
                        value={formData.flightNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. KQ 101, BA 065, LH 590"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none uppercase font-bold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Accommodation Category *
                      </label>
                      <select
                        name="accommodationType"
                        value={formData.accommodationType}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white cursor-pointer font-medium"
                      >
                        <option value="Hotel / Safari Lodge">Hotel / Safari Lodge</option>
                        <option value="Push World Travel Tour">Push World Travel Safaris &amp; Tour</option>
                        <option value="Private Residence / Villa">Private Residence / Villa</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Hotel / Lodge Name in Kenya *
                      </label>
                      <input
                        type="text"
                        name="accommodationName"
                        value={formData.accommodationName}
                        onChange={handleInputChange}
                        placeholder="e.g. Mara Serena Safari Lodge / Push World Tour"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none font-semibold"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Physical Address / Location of Stay in Kenya
                      </label>
                      <input
                        type="text"
                        name="accommodationAddress"
                        value={formData.accommodationAddress}
                        onChange={handleInputChange}
                        placeholder="e.g. Maasai Mara National Reserve, Narok / Push Building, Thome, Nairobi"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Health &amp; Emergency</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Health & Emergency Contact */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0a2265] font-['Outfit',sans-serif]">
                      Health Declaration &amp; Emergency Contact
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Required for your AMREF Flying Doctors medical evacuation coverage and entry protocols.
                    </p>
                  </div>

                  {/* Yellow Fever Advisory Notice */}
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-950 space-y-1">
                      <strong className="block text-amber-900 font-bold">Kenya Yellow Fever Entry Protocol</strong>
                      <p>
                        A Yellow Fever vaccination certificate is mandatory if you are arriving from or transiting for more than 12 hours through countries with risk of Yellow Fever transmission. Direct arrivals from non-endemic countries (US, UK, Western Europe) are generally exempt unless combined with cross-border circuits.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-slate-900">
                        Yellow Fever Vaccination Status
                      </span>
                      <span className="text-[11px] text-slate-500">
                        I hold a valid Yellow Fever yellow card or exemption certificate.
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="yellowFeverVaccinated"
                        checked={formData.yellowFeverVaccinated}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0a2265]" />
                    </label>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#ea580c]" />
                      <span>Emergency Contact Details (Outside Kenya)</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Emergency Contact Full Name *
                        </label>
                        <input
                          type="text"
                          name="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={handleInputChange}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none font-semibold"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Relationship to Traveler *
                        </label>
                        <select
                          name="emergencyContactRelationship"
                          value={formData.emergencyContactRelationship}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white cursor-pointer font-medium"
                        >
                          <option value="Spouse">Spouse / Partner</option>
                          <option value="Parent">Parent</option>
                          <option value="Child">Adult Child</option>
                          <option value="Sibling">Sibling</option>
                          <option value="Friend">Friend / Colleague</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Emergency Contact Phone with Country Code *
                        </label>
                        <input
                          type="tel"
                          name="emergencyContactPhone"
                          value={formData.emergencyContactPhone}
                          onChange={handleInputChange}
                          placeholder="e.g. +1 555 987 6543"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Document Uploads</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Document Uploads & Declarations */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0a2265] font-['Outfit',sans-serif]">
                      Document Uploads &amp; Verification
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Upload clear, legible photos or scans. Our immigration desk inspects each file before government submission.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Document 1: Passport Bio Data */}
                    <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#0a2265] bg-slate-50/50 flex flex-col justify-between transition-colors">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-[#0a2265]" />
                            <span>1. Passport Bio-data Page *</span>
                          </span>
                          {formData.passportBioDataUrl && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Ready
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mb-3">
                          Full color page showing your portrait, signature, and MRZ machine-readable lines at the bottom.
                        </p>

                        {formData.passportBioDataUrl ? (
                          <div className="relative mb-3 h-36 rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
                            <img
                              src={formData.passportBioDataUrl}
                              alt="Passport bio preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, passportBioDataUrl: '' }))}
                              className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white p-1 rounded-full text-xs"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="flex-1 px-3 py-2 text-xs font-bold text-[#0a2265] bg-blue-50 hover:bg-blue-100 rounded-lg text-center cursor-pointer border border-blue-200 transition-colors">
                          <Upload className="w-3.5 h-3.5 inline mr-1" />
                          <span>Choose File</span>
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => handleFileUpload(e, 'passportBioDataUrl')}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={setSamplePassportBio}
                          className="px-2.5 py-2 text-[11px] font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg cursor-pointer"
                          title="Instant Sample Document"
                        >
                          Use Sample
                        </button>
                      </div>
                    </div>

                    {/* Document 2: Passport Photo / Selfie */}
                    <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#0a2265] bg-slate-50/50 flex flex-col justify-between transition-colors">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                            <User className="w-4 h-4 text-[#ea580c]" />
                            <span>2. Recent Passport Photo / Selfie *</span>
                          </span>
                          {formData.passportPhotoUrl && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Ready
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mb-3">
                          Passport-size portrait taken within last 6 months against a plain white/light background.
                        </p>

                        {formData.passportPhotoUrl ? (
                          <div className="relative mb-3 h-36 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center">
                            <img
                              src={formData.passportPhotoUrl}
                              alt="Passport portrait preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, passportPhotoUrl: '' }))}
                              className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white p-1 rounded-full text-xs"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="flex-1 px-3 py-2 text-xs font-bold text-[#ea580c] bg-orange-50 hover:bg-orange-100 rounded-lg text-center cursor-pointer border border-orange-200 transition-colors">
                          <Upload className="w-3.5 h-3.5 inline mr-1" />
                          <span>Choose Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'passportPhotoUrl')}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={setSamplePassportPhoto}
                          className="px-2.5 py-2 text-[11px] font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg cursor-pointer"
                          title="Instant Sample Photo"
                        >
                          Use Sample
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: Mandatory Applicant Declaration and Statutory Consents */}
                  <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-[#0a2265]" />
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                            4. Applicant Declaration &amp; Statutory Consent
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          In accordance with Kenya Department of Immigration Services guidelines, please review and confirm each mandatory declaration below.
                        </p>
                      </div>

                      {/* Quick Select All Toggle Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const allChecked =
                            formData.confirmInformationAccuracy &&
                            formData.authoriseProcessing &&
                            formData.acceptTermsPrivacy &&
                            formData.acknowledgeGovDecision &&
                            formData.acknowledgeNoGuarantee &&
                            formData.understandRefundPolicy &&
                            formData.consentSensitiveData;
                          const next = !allChecked;
                          setFormData((p) => ({
                            ...p,
                            confirmInformationAccuracy: next,
                            authoriseProcessing: next,
                            acceptTermsPrivacy: next,
                            acknowledgeGovDecision: next,
                            acknowledgeNoGuarantee: next,
                            understandRefundPolicy: next,
                            consentSensitiveData: next,
                            agreeToTerms: next,
                          }));
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0a2265]/10 hover:bg-[#0a2265]/20 text-[#0a2265] transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                      >
                        {formData.confirmInformationAccuracy &&
                        formData.authoriseProcessing &&
                        formData.acceptTermsPrivacy &&
                        formData.acknowledgeGovDecision &&
                        formData.acknowledgeNoGuarantee &&
                        formData.understandRefundPolicy &&
                        formData.consentSensitiveData
                          ? 'Deselect All'
                          : 'Select All Declarations'}
                      </button>
                    </div>

                    <div className="space-y-3.5 pt-1">
                      {/* Consent 1: Accurate Information & Document Match */}
                      <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="confirmInformationAccuracy"
                          checked={formData.confirmInformationAccuracy}
                          onChange={handleInputChange}
                          className="mt-0.5 w-4 h-4 text-[#0a2265] focus:ring-[#0a2265] rounded border-slate-300 shrink-0"
                          required
                        />
                        <div className="text-xs text-slate-700 leading-relaxed">
                          <span className="font-bold text-slate-900 block mb-0.5">
                            1. Accurate Information &amp; Travel Document Match *
                          </span>
                          <span>
                            I confirm that the supplied information is accurate, true, and exactly matches my valid passport and travel documents. I understand that false or mismatched information may lead to rejection without refund.
                          </span>
                        </div>
                      </label>

                      {/* Consent 2: Authorise Push World Travel Ltd */}
                      <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="authoriseProcessing"
                          checked={formData.authoriseProcessing}
                          onChange={handleInputChange}
                          className="mt-0.5 w-4 h-4 text-[#0a2265] focus:ring-[#0a2265] rounded border-slate-300 shrink-0"
                          required
                        />
                        <div className="text-xs text-slate-700 leading-relaxed">
                          <span className="font-bold text-slate-900 block mb-0.5">
                            2. Representation &amp; Processing Authorization *
                          </span>
                          <span>
                            I authorise <strong>Push World Travel Ltd</strong> to process and manage the information necessary to provide the requested Kenya eTA assistance, pre-checking, and travel services on my behalf.
                          </span>
                        </div>
                      </label>

                      {/* Consent 3: Privacy Policy and Service Terms */}
                      <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="acceptTermsPrivacy"
                          checked={formData.acceptTermsPrivacy}
                          onChange={handleInputChange}
                          className="mt-0.5 w-4 h-4 text-[#0a2265] focus:ring-[#0a2265] rounded border-slate-300 shrink-0"
                          required
                        />
                        <div className="text-xs text-slate-700 leading-relaxed">
                          <span className="font-bold text-slate-900 block mb-0.5">
                            3. Privacy Policy &amp; Service Terms Acceptance *
                          </span>
                          <span>
                            I have read, understood, and accepted the Push World Travel Ltd Privacy Policy and Service Terms &amp; Conditions governing electronic visa filing and travel operations.
                          </span>
                        </div>
                      </label>

                      {/* Consent 4: Government of Kenya Final Decision */}
                      <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="acknowledgeGovDecision"
                          checked={formData.acknowledgeGovDecision}
                          onChange={handleInputChange}
                          className="mt-0.5 w-4 h-4 text-[#0a2265] focus:ring-[#0a2265] rounded border-slate-300 shrink-0"
                          required
                        />
                        <div className="text-xs text-slate-700 leading-relaxed">
                          <span className="font-bold text-slate-900 block mb-0.5">
                            4. Sovereign Approval Authority *
                          </span>
                          <span>
                            I understand and acknowledge that the <strong>Government of Kenya (Department of Immigration Services)</strong> possesses sole and final sovereign authority on all eTA approval, review, or denial decisions.
                          </span>
                        </div>
                      </label>

                      {/* Consent 5: No Guarantee of Approval */}
                      <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="acknowledgeNoGuarantee"
                          checked={formData.acknowledgeNoGuarantee}
                          onChange={handleInputChange}
                          className="mt-0.5 w-4 h-4 text-[#0a2265] focus:ring-[#0a2265] rounded border-slate-300 shrink-0"
                          required
                        />
                        <div className="text-xs text-slate-700 leading-relaxed">
                          <span className="font-bold text-slate-900 block mb-0.5">
                            5. Submission &amp; Payment Does Not Guarantee Approval *
                          </span>
                          <span>
                            I understand that submitting an application or paying for assistance and travel insurance does not guarantee approval, issuance of an eTA, or border entry at the port of arrival.
                          </span>
                        </div>
                      </label>

                      {/* Consent 6: Applicable Refund & Cancellation Policy */}
                      <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="understandRefundPolicy"
                          checked={formData.understandRefundPolicy}
                          onChange={handleInputChange}
                          className="mt-0.5 w-4 h-4 text-[#0a2265] focus:ring-[#0a2265] rounded border-slate-300 shrink-0"
                          required
                        />
                        <div className="text-xs text-slate-700 leading-relaxed">
                          <span className="font-bold text-slate-900 block mb-0.5">
                            6. Refund &amp; Cancellation Terms *
                          </span>
                          <span>
                            I understand and accept the applicable refund and cancellation policy: government statutory application fees, card gateway costs, and administrative processing fees become non-refundable once an application is queued or submitted to the immigration portal.
                          </span>
                        </div>
                      </label>

                      {/* Consent 7: Sensitive Travel Documents & Authority Sharing Consent */}
                      <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="consentSensitiveData"
                          checked={formData.consentSensitiveData}
                          onChange={handleInputChange}
                          className="mt-0.5 w-4 h-4 text-[#0a2265] focus:ring-[#0a2265] rounded border-slate-300 shrink-0"
                          required
                        />
                        <div className="text-xs text-slate-700 leading-relaxed">
                          <span className="font-bold text-slate-900 block mb-0.5">
                            7. Sensitive Travel Documents &amp; Authority Data Sharing Consent *
                          </span>
                          <span>
                            I provide explicit consent for Push World Travel Ltd to collect, encrypt, and securely transmit my sensitive documents (passport bio-data, facial biometric photograph, travel itineraries, and contact details) to the Kenya Immigration Department, border control, and authorized AMREF medical evacuation underwriters.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Review Application &amp; Pay Securely</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Transparent Package Review & International Payment Checkout */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0a2265] font-['Outfit',sans-serif]">
                      Review Package &amp; Transparent Pricing
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Review all charges and travel coverage before confirming payment through our secure international gateway.
                    </p>
                  </div>

                  {/* The Proposed Push World Travel Ltd Package Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-amber-50/50 border-2 border-[#0a2265] shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c] block mb-0.5">
                          Selected Official Package
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-[#0a2265] font-['Outfit',sans-serif]">
                          Kenya eTA Application Assistance + Travel Insurance
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Applicant: <strong className="text-slate-900">{formData.givenNames} {formData.surname}</strong> ({formData.nationality} Passport: {formData.passportNumber})
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs text-slate-500 block">Base Package Price</span>
                        <span className="text-2xl font-black text-[#0a2265] font-['Outfit',sans-serif]">
                          USD 150.00
                        </span>
                      </div>
                    </div>

                    {/* What's Included */}
                    <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Official Kenya Government eTA Filing &amp; Submission</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>AMREF Flying Doctors Emergency Air Evacuation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Passport &amp; Photo Document Pre-check at Push Building, Thome</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Comprehensive Medical &amp; Trip Disruption Insurance ($100k)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Real-time SMS &amp; Email Delivery with QR verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>24/7 Priority Travel Desk Helpline (+254 725 356 926)</span>
                      </div>
                    </div>

                    {/* TRANSPARENT CHARGES BREAKDOWN REQUIRED BY USER */}
                    <div className="mt-4 pt-4 border-t border-slate-200/90 bg-white p-4 rounded-xl border border-slate-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#0a2265]" />
                        <span>Transparent Pricing &amp; Card Processing Fee Breakdown</span>
                      </h4>

                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center justify-between text-slate-700">
                          <span>Base package (Kenya eTA Assistance + Travel Insurance):</span>
                          <span className="font-semibold text-slate-900">USD 150.00</span>
                        </div>

                        <div className="flex items-center justify-between text-slate-700">
                          <span>Disclosed card processing fee at 5%:</span>
                          <span className="font-semibold text-[#ea580c]">+ USD 7.50</span>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-base sm:text-lg font-black text-[#0a2265]">
                          <span>Total payable by card:</span>
                          <span className="text-[#0a2265] font-['Outfit',sans-serif]">USD 157.50</span>
                        </div>
                      </div>

                      <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                        The payment gateway calculates this fee dynamically prior to authorization. All transactions are securely routed through 256-bit SSL encrypted international merchant processing.
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleFinalSubmit}
                      className="px-8 py-3.5 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Preparing Gateway...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-emerald-400" />
                          <span>Review Application &amp; Pay Securely</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB 2: TRANSPARENT PRICING & PAYMENT BREAKDOWN ===================== */}
        {activeTab === 'pricing' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1">
                Zero Hidden Charges
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] font-['Outfit',sans-serif]">
                Transparent Pricing &amp; Payment Gateway
              </h2>
              <div className="w-14 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-2 mb-4 rounded-full" />
              <p className="text-xs sm:text-sm text-slate-600">
                At Push World Travel Ltd, we believe in complete financial transparency. Review our all-inclusive service package and card processing breakdown below.
              </p>
            </div>

            {/* Feature Table Card */}
            <div className="bg-white rounded-2xl border-2 border-[#0a2265] shadow-lg overflow-hidden">
              <div className="bg-[#0a2265] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider inline-block mb-2">
                    Official Assistance Package
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif]">
                    Kenya eTA Application Assistance + Travel Insurance
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Turnkey visa filing, AMREF medical evacuation, and 24/7 document monitoring.
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-300 block">Total Payable by Card</span>
                  <span className="text-3xl sm:text-4xl font-black text-amber-300 font-['Outfit',sans-serif]">
                    USD 157.50
                  </span>
                  <span className="text-[11px] text-slate-300 block">Includes 5% card fee</span>
                </div>
              </div>

              {/* Exact breakdown demanded by customer */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Itemized Cost Breakdown
                  </h4>
                  <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">Base package:</span>
                      <span className="font-bold text-slate-900">USD 150.00</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">Disclosed card processing fee at 5%:</span>
                      <span className="font-bold text-[#ea580c]">USD 7.50</span>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-base sm:text-lg font-black text-[#0a2265]">
                      <span>Total payable by card:</span>
                      <span className="font-['Outfit',sans-serif]">USD 157.50</span>
                    </div>
                  </div>
                </div>

                {/* Multicurrency Conversions preview */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    International Multi-Currency Equivalent Reference
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">US Dollar</span>
                      <span className="text-sm font-bold text-slate-800">$157.50</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Euro</span>
                      <span className="text-sm font-bold text-slate-800">~ €145.20</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">British Pound</span>
                      <span className="text-sm font-bold text-slate-800">~ £123.80</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Kenya Shilling</span>
                      <span className="text-sm font-bold text-slate-800">~ KES 20,475</span>
                    </div>
                  </div>
                </div>

                {/* Apply CTA */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <div className="text-xs text-slate-500">
                    Need special corporate invoicing or group travel assistance? Contact our Nairobi office at <strong>0725 356 926</strong>.
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('apply');
                      setCurrentStep(1);
                    }}
                    className="px-6 py-3 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Start Application Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: TRACK APPLICATION STATUS ===================== */}
        {activeTab === 'track' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1">
                Real-Time Immigration Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] font-['Outfit',sans-serif]">
                Track Kenya eTA Status &amp; Download Document
              </h2>
              <div className="w-14 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-2 mb-4 rounded-full" />
              <p className="text-xs sm:text-sm text-slate-600">
                Enter your Push World Travel Reference Number (e.g. <strong className="text-slate-800">PWT-ETA-2026-881920</strong>) or your Passport Number.
              </p>
            </div>

            {/* Search Box */}
            <form onSubmit={handleTrackSubmit} className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={trackQuery}
                    onChange={(e) => setTrackQuery(e.target.value)}
                    placeholder="Enter Reference (PWT-ETA-...) or Passport No."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none uppercase font-bold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSearchingTrack}
                  className="px-6 py-3 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {isSearchingTrack ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Check Status</span>
                  )}
                </button>
              </div>

              {/* Sample Queries for quick testing */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold">Quick test examples:</span>
                <button
                  type="button"
                  onClick={() => {
                    setTrackQuery('PWT-ETA-2026-881920');
                  }}
                  className="text-[#0a2265] hover:underline font-mono font-bold"
                >
                  PWT-ETA-2026-881920 (Approved eTA)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setTrackQuery('PWT-ETA-2026-773912');
                  }}
                  className="text-[#0a2265] hover:underline font-mono font-bold"
                >
                  PWT-ETA-2026-773912 (Under Review)
                </button>
              </div>
            </form>

            {/* Error state */}
            {trackError && (
              <div className="p-4 bg-red-50 text-red-900 rounded-xl border border-red-200 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Search Result</strong>
                  <p>{trackError}</p>
                </div>
              </div>
            )}

            {/* Tracked Application Card */}
            {trackedApplication && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden animate-in fade-in">
                {/* Header status strip */}
                <div className={`p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  trackedApplication.status === 'approved' ? 'bg-emerald-700' :
                  trackedApplication.status === 'under_review' ? 'bg-[#0a2265]' :
                  trackedApplication.status === 'additional_info_required' ? 'bg-amber-600' :
                  'bg-slate-800'
                }`}>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                      Official Application Record
                    </span>
                    <h3 className="text-xl font-bold font-['Outfit',sans-serif]">
                      {trackedApplication.referenceNumber}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      {trackedApplication.status === 'approved' && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                      {trackedApplication.status === 'under_review' && <Clock className="w-4 h-4 text-amber-300 animate-spin" />}
                      <span>Status: {trackedApplication.status.replace(/_/g, ' ')}</span>
                    </span>
                  </div>
                </div>

                {/* Timeline display */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/60">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-900 block">Submitted</span>
                      <span className="text-[10px] text-slate-400">Application lodged</span>
                    </div>

                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto shadow-xs ${
                        trackedApplication.paymentStatus === 'paid' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                      }`}>
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-900 block">Paid ($157.50)</span>
                      <span className="text-[10px] text-slate-400">Card Verified</span>
                    </div>

                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto shadow-xs ${
                        ['under_review', 'approved'].includes(trackedApplication.status) ? 'bg-[#0a2265] text-white' : 'bg-slate-200 text-slate-400'
                      }`}>
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-900 block">Review Desk</span>
                      <span className="text-[10px] text-slate-400">Push Bldg, Thome</span>
                    </div>

                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto shadow-xs ${
                        trackedApplication.status === 'approved' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                      }`}>
                        <FileCheck2 className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-900 block">eTA Issued</span>
                      <span className="text-[10px] text-slate-400">Authorized for entry</span>
                    </div>
                  </div>
                </div>

                {/* Details body */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-slate-400 text-xs block">Applicant Full Legal Name:</span>
                      <strong className="text-slate-900 text-base">{trackedApplication.givenNames} {trackedApplication.surname}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-xs block">Nationality &amp; Passport:</span>
                      <strong className="text-slate-900">{trackedApplication.nationality} · {trackedApplication.passportNumber}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-xs block">Arrival Date in Kenya:</span>
                      <strong className="text-slate-900">{trackedApplication.arrivalDate} ({trackedApplication.portOfEntry})</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-xs block">Flight &amp; Airline:</span>
                      <strong className="text-slate-900">{trackedApplication.airline} - {trackedApplication.flightNumber}</strong>
                    </div>
                  </div>

                  {/* If Approved: Show Official eTA Certificate */}
                  {trackedApplication.status === 'approved' && (
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 border-2 border-emerald-600 shadow-md relative overflow-hidden">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-emerald-200 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                            <ShieldCheck className="w-7 h-7" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                              Republic of Kenya · Department of Immigration Services
                            </span>
                            <h4 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                              Official Electronic Travel Authorisation (eTA)
                            </h4>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-slate-500 block">eTA Authorization Number:</span>
                          <span className="font-mono font-black text-emerald-800 text-base sm:text-lg">
                            {trackedApplication.etaNumber || 'ETA-KE-2026-94812039'}
                          </span>
                        </div>
                      </div>

                      <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                        <div className="sm:col-span-2 space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 w-32 shrink-0">Validity:</span>
                            <strong className="text-slate-900">Valid for Entry (Single Journey / Tourism)</strong>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 w-32 shrink-0">Issue Date:</span>
                            <strong className="text-slate-900">{trackedApplication.approvedAt?.slice(0, 10) || '2026-10-19'}</strong>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 w-32 shrink-0">Insurance Policy:</span>
                            <strong className="text-emerald-700">AMREF Flying Doctors Medical Air Evac #PWT-INS-2026</strong>
                          </div>
                        </div>

                        {/* Visual Barcode & QR mock */}
                        <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-emerald-200 shadow-2xs">
                          <QrCode className="w-14 h-14 text-slate-900" />
                          <span className="text-[9px] font-mono text-slate-500 mt-1 uppercase">Scan for Immigration Boarding</span>
                        </div>
                      </div>

                      {/* Print and Download Actions */}
                      <div className="pt-3 border-t border-emerald-200/80 flex items-center justify-between">
                        <span className="text-[11px] text-emerald-800 font-medium">
                          ✓ Present digital copy or printed document at airport check-in counter and JKIA/Mombasa eGates.
                        </span>
                        <button
                          onClick={() => window.print()}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Download / Print eTA</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Payment Receipt Summary or Pending Payment Callout */}
                  {trackedApplication.paymentStatus === 'paid' && trackedApplication.paymentDetails ? (
                    <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-emerald-950 block">Payment Receipt: {trackedApplication.paymentDetails.receiptNumber}</span>
                        <span className="text-emerald-800">
                          Transaction ID: {trackedApplication.paymentDetails.transactionId} · {trackedApplication.paymentDetails.paidAt.slice(0, 10)}
                        </span>
                        <span className="text-[10px] text-emerald-700 block mt-0.5">
                          ✓ Verified by Push World Travel International Gateway (3D-Secure Authorized)
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-emerald-800 block">Amount Settled</span>
                        <strong className="text-sm font-bold text-emerald-950">USD 157.50 (Paid by Card)</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-amber-50 rounded-xl border-2 border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Payment Pending Backend Verification</span>
                        </div>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          Your application has been received, but the fee of <strong>USD 157.50</strong> has not yet been settled. Card payment must be verified before our immigration desk can submit your application to the government portal.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPaymentApplication(trackedApplication);
                          setCardholderName(`${trackedApplication.givenNames} ${trackedApplication.surname}`);
                          setIsPaymentModalOpen(true);
                        }}
                        className="px-5 py-2.5 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                      >
                        <CreditCard className="w-4 h-4 text-amber-300" />
                        <span>Review Application &amp; Pay Securely</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 4: TRAVEL INSURANCE DETAILS ===================== */}
        {activeTab === 'insurance' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                AMREF Flying Doctors Partnership
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] font-['Outfit',sans-serif]">
                Comprehensive Kenya Travel Insurance Coverage
              </h2>
              <div className="w-14 h-1 bg-gradient-to-r from-emerald-600 to-teal-500 mx-auto mt-2 mb-4 rounded-full" />
              <p className="text-xs sm:text-sm text-slate-600">
                Included in our $150 package to give international travelers complete peace of mind while on safari in remote wilderness reserves or along coastal beaches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                    <Plane className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Airborne Medical Evacuation
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Direct air ambulance airlift from any bush airstrip across the Maasai Mara, Amboseli, Tsavo, and Samburu directly to Nairobi premier medical hospitals (Nairobi Hospital &amp; Aga Khan).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700">
                  Coverage: 100% Wilderness Airlift
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0a2265] flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Emergency Medical Treatment
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Covers inpatient hospitalization, safari doctor consultations, emergency surgery, prescription medications, and dental pain relief during your stay in Kenya.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-[#0a2265]">
                  Policy Limit: Up to USD 100,000
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Trip &amp; Baggage Disruption
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Compensation for lost baggage on regional connecting safari bush flights, emergency accommodation during flight diversions, and 24/7 client dispatch.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-[#ea580c]">
                  Coverage: USD 2,500 Baggage &amp; Delay
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <strong className="block text-slate-900 text-sm mb-1">Underwritten by East African Licensed Medical Insurers</strong>
                Push World Travel Ltd issues your certificate of insurance simultaneously with your authorized Kenya eTA.
              </div>
              <button
                onClick={() => {
                  setActiveTab('apply');
                  setCurrentStep(1);
                }}
                className="px-6 py-2.5 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shrink-0"
              >
                Apply with Insurance Included
              </button>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: FAQs & RULES ===================== */}
        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1">
                Immigration Guidelines
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2265] font-['Outfit',sans-serif]">
                Frequently Asked Questions Regarding Kenya eTA
              </h2>
              <div className="w-14 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-2 mb-4 rounded-full" />
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'What is the Kenya Electronic Travel Authorisation (eTA)?',
                  a: 'The Kenya eTA is an official electronic travel permit mandated by the Government of Kenya in January 2024. It replaces the previous paper visas and eVisa system for all foreign nationals entering Kenya. Each traveler, including infants and children, must possess an approved eTA before boarding their flight.',
                },
                {
                  q: 'How long before my trip should I submit my eTA application?',
                  a: 'Applications can be submitted up to 3 months prior to travel, and no later than 3 days (72 hours) before departure. We strongly recommend applying at least 1 to 2 weeks in advance to allow adequate time for document verification and government clearance.',
                },
                {
                  q: 'What is included in the Push World Travel USD 150 package?',
                  a: 'The $150 package covers: 1) Official Kenya government eTA filing fee and priority processing; 2) Document verification and photo formatting at our Nairobi office; 3) Comprehensive AMREF Flying Doctors medical air evacuation and emergency hospital insurance; 4) 24/7 WhatsApp customer dispatch; and 5) Instant PDF eTA delivery with immigration QR code.',
                },
                {
                  q: 'Why is there a 5% card processing fee (USD 7.50)?',
                  a: 'The 5% card processing fee covers secure international merchant gateway compliance, 3D-Secure fraud prevention, multi-currency conversion, and PCI-DSS Level 1 banking authorization, bringing the total billed amount to exactly USD 157.50 with full upfront disclosure before card submission.',
                },
                {
                  q: 'What are the passport validity requirements?',
                  a: 'Your passport must be valid for at least six (6) months beyond your planned arrival date in Kenya, and must have at least one blank page for border stamps.',
                },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <h4 className="text-sm font-bold text-slate-900 mb-2 font-['Outfit',sans-serif]">
                    {item.q}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 6: IMMIGRATION DESK ADMIN PORTAL ===================== */}
        {activeTab === 'admin' && (
          <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in">
            {/* If Locked, show Passcode Prompt */}
            {!isAdminUnlocked ? (
              <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0a2265] text-white flex items-center justify-center mx-auto shadow-md">
                  <Lock className="w-7 h-7 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Push World Operations Desk Portal
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Restricted to immigration compliance staff at Push Building, Thome.
                  </p>
                </div>

                <form onSubmit={handleAdminUnlock} className="space-y-3 pt-2">
                  <input
                    type="password"
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                    placeholder="Enter Staff Passcode (e.g. push2026 or 0725)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-center font-mono text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                    autoFocus
                  />

                  {adminPasscodeError && (
                    <p className="text-xs text-red-600 font-semibold">
                      Invalid passcode. Hint: Use <strong>push2026</strong> or <strong>0725</strong>
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    Unlock Immigration Queue
                  </button>
                </form>

                <p className="text-[11px] text-slate-400">
                  Allows staff to inspect applicant dossiers, review passport photos, process status updates, and issue government eTA numbers.
                </p>
              </div>
            ) : (
              /* Unlocked Admin Dashboard */
              <div className="space-y-6">
                {/* Admin Header with Metrics */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h2 className="text-xl sm:text-2xl font-bold text-[#0a2265] font-['Outfit',sans-serif]">
                        Kenya eTA Processing Desk · Nairobi Operations
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Headquarters: Push Building, Thome, Northern Bypass · Helpline 0725 356 926
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsAdminUnlocked(false)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Lock Portal
                    </button>
                  </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-xs text-slate-400 font-bold uppercase block">Total Applications</span>
                    <span className="text-2xl font-black text-[#0a2265] font-['Outfit',sans-serif]">
                      {adminApplications.length}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">In Immigration Queue</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-xs text-amber-600 font-bold uppercase block">Under Review</span>
                    <span className="text-2xl font-black text-amber-600 font-['Outfit',sans-serif]">
                      {adminApplications.filter((a) => a.status === 'under_review' || a.status === 'submitted').length}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Awaiting Approval</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-xs text-emerald-600 font-bold uppercase block">Approved eTAs</span>
                    <span className="text-2xl font-black text-emerald-600 font-['Outfit',sans-serif]">
                      {adminApplications.filter((a) => a.status === 'approved').length}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Issued with Certificate</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-xs text-sky-600 font-bold uppercase block">Processed Revenue</span>
                    <span className="text-2xl font-black text-sky-700 font-['Outfit',sans-serif]">
                      USD {(adminApplications.filter((a) => a.paymentStatus === 'paid').length * 157.5).toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">At $157.50 / applicant</span>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {(['all', 'submitted', 'under_review', 'approved'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setAdminFilter(filter)}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          adminFilter === filter
                            ? 'bg-[#0a2265] text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {filter.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      placeholder="Search applicant or passport..."
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#0a2265]"
                    />
                  </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                        <tr>
                          <th className="p-3">Reference / Date</th>
                          <th className="p-3">Applicant Name</th>
                          <th className="p-3">Passport &amp; Country</th>
                          <th className="p-3">Arrival &amp; Flight</th>
                          <th className="p-3">Payment</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {adminApplications
                          .filter((app) => {
                            if (adminFilter !== 'all' && app.status !== adminFilter) return false;
                            if (adminSearch) {
                              const s = adminSearch.toLowerCase();
                              return (
                                app.referenceNumber.toLowerCase().includes(s) ||
                                app.surname.toLowerCase().includes(s) ||
                                app.givenNames.toLowerCase().includes(s) ||
                                app.passportNumber.toLowerCase().includes(s)
                              );
                            }
                            return true;
                          })
                          .map((app) => (
                            <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-3 font-mono font-bold text-[#0a2265]">
                                {app.referenceNumber}
                                <span className="block font-sans font-normal text-[10px] text-slate-400">
                                  {app.createdAt.slice(0, 10)}
                                </span>
                              </td>
                              <td className="p-3 font-bold text-slate-900">
                                {app.surname}, {app.givenNames}
                                <span className="block font-normal text-[10px] text-slate-500">
                                  {app.email}
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="font-mono font-bold text-slate-800">{app.passportNumber}</span>
                                <span className="block text-[10px] text-slate-500">{app.nationality}</span>
                              </td>
                              <td className="p-3">
                                <span>{app.arrivalDate}</span>
                                <span className="block text-[10px] text-slate-500">{app.flightNumber} ({app.portOfEntry.split(' ')[0]})</span>
                              </td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                  ${app.pricing?.totalAmount || 157.5} Paid
                                </span>
                              </td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                                  app.status === 'under_review' ? 'bg-blue-100 text-[#0a2265]' :
                                  'bg-slate-100 text-slate-700'
                                }`}>
                                  {app.status.replace(/_/g, ' ')}
                                </span>
                                {app.etaNumber && (
                                  <span className="block font-mono text-[9px] text-slate-500">
                                    {app.etaNumber}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => setSelectedAdminApp(app)}
                                  className="px-3 py-1 bg-[#0a2265] hover:bg-[#07194a] text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
                                >
                                  Review Dossier
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Selected Application Modal Drawer in Admin View */}
                {selectedAdminApp && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 space-y-6">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div>
                          <span className="text-[10px] font-bold text-[#ea580c] uppercase tracking-wider block">
                            Dossier Inspection · Push World Travel Immigration Desk
                          </span>
                          <h3 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                            {selectedAdminApp.referenceNumber}
                          </h3>
                        </div>
                        <button
                          onClick={() => setSelectedAdminApp(null)}
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Bio Details */}
                      <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div>
                          <span className="text-slate-400 block">Full Name:</span>
                          <strong className="text-slate-900">{selectedAdminApp.givenNames} {selectedAdminApp.surname}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Passport:</span>
                          <strong className="text-slate-900 font-mono">{selectedAdminApp.passportNumber} ({selectedAdminApp.nationality})</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Email &amp; Phone:</span>
                          <span className="text-slate-900">{selectedAdminApp.email} · {selectedAdminApp.phone}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Arrival &amp; Flight:</span>
                          <span className="text-slate-900">{selectedAdminApp.arrivalDate} · {selectedAdminApp.flightNumber}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 block">Stay in Kenya:</span>
                          <span className="text-slate-900">{selectedAdminApp.accommodationName} ({selectedAdminApp.accommodationAddress})</span>
                        </div>
                      </div>

                      {/* Uploaded Documents Preview */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Uploaded Identity Documents
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-slate-200 rounded-xl p-2 bg-slate-50 text-center">
                            <span className="text-[10px] font-bold text-slate-500 block mb-1">Passport Bio-Data</span>
                            {selectedAdminApp.passportBioDataUrl ? (
                              <img
                                src={selectedAdminApp.passportBioDataUrl}
                                alt="Bio-data preview"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="h-32 flex items-center justify-center text-slate-400 text-xs">No upload</div>
                            )}
                          </div>

                          <div className="border border-slate-200 rounded-xl p-2 bg-slate-50 text-center">
                            <span className="text-[10px] font-bold text-slate-500 block mb-1">Applicant Photo</span>
                            {selectedAdminApp.passportPhotoUrl ? (
                              <img
                                src={selectedAdminApp.passportPhotoUrl}
                                alt="Passport portrait"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="h-32 flex items-center justify-center text-slate-400 text-xs">No upload</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status Action Buttons */}
                      <div className="pt-4 border-t border-slate-200 space-y-3">
                        <label className="block text-xs font-bold text-slate-700">
                          Immigration Officer Notes:
                        </label>
                        <textarea
                          rows={2}
                          value={adminNotesInput}
                          onChange={(e) => setAdminNotesInput(e.target.value)}
                          placeholder="Add approval remarks or compliance notes..."
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-[#0a2265]"
                        />

                        <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => handleAdminStatusChange(selectedAdminApp.id, 'under_review')}
                            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                          >
                            Mark In Review
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAdminStatusChange(selectedAdminApp.id, 'approved')}
                            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Approve eTA &amp; Issue Certificate</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===================== INTERNATIONAL PAYMENT GATEWAY CHECKOUT MODAL ===================== */}
      {isPaymentModalOpen && paymentApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="bg-[#0a2265] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-['Outfit',sans-serif]">
                    Push World International Payment Gateway
                  </h3>
                  <span className="text-[10px] text-white/70 block">
                    256-Bit Encrypted · PCI-DSS Level 1 Secure Checkout
                  </span>
                </div>
              </div>

              {paymentStep !== 'processing' && (
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* STEP: Card Input */}
            {paymentStep === 'card_input' && (
              <form onSubmit={executePayment} className="p-6 space-y-4">
                {/* Transparent fee summary box */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-slate-600 mb-1">
                    <span>Kenya eTA + Travel Insurance:</span>
                    <strong className="text-slate-900">USD 150.00</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 mb-2">
                    <span>Disclosed card processing fee at 5%:</span>
                    <strong className="text-[#ea580c]">+ USD 7.50</strong>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-black text-[#0a2265]">
                    <span>Total Billed to Card:</span>
                    <span className="text-base font-['Outfit',sans-serif]">USD 157.50</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Cardholder Name (as on card) *
                  </label>
                  <input
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder="e.g. JOHN R SMITH"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none uppercase font-semibold"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Card Number *
                    </label>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Visa / Mastercard / Amex
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4000 1234 5678 9010"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none font-mono font-bold tracking-wider"
                      required
                    />
                    <CreditCard className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none font-mono font-bold text-center"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      CVV / CVC Code *
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="•••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none font-mono font-bold text-center"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Card Billing Country
                  </label>
                  <select
                    value={billingCountry}
                    onChange={(e) => setBillingCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0a2265] focus:outline-none bg-white font-medium"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other Country</option>
                  </select>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0a2265] hover:bg-[#07194a] text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Review Application &amp; Pay Securely (USD 157.50)</span>
                  </button>
                </div>

                <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3D Secure 2.0 Card Verification · Push World Travel Ltd Merchant Services</span>
                </p>
              </form>
            )}

            {/* STEP: Processing animation */}
            {paymentStep === 'processing' && (
              <div className="p-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-[#0a2265] border-t-transparent animate-spin mx-auto" />
                <h4 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Connecting to International Banking Network...
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Authorizing USD 157.50 with your card issuer via 3D Secure verification. Please do not close or refresh your browser.
                </p>
              </div>
            )}

            {/* STEP: Payment Success */}
            {paymentStep === 'success' && completedPayment && (
              <div className="p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                    Payment Authorized &amp; Confirmed
                  </span>
                  <h4 className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    USD 157.50 Paid Successfully
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Your Kenya eTA dossier and travel insurance application have been submitted to our Nairobi processing desk.
                  </p>
                </div>

                {/* Receipt Box */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Receipt Number:</span>
                    <strong className="text-slate-900 font-mono">{completedPayment.receiptNumber}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Transaction ID:</span>
                    <strong className="text-slate-900 font-mono">{completedPayment.transactionId}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Application Reference:</span>
                    <strong className="text-[#0a2265] font-mono font-bold">{completedPayment.referenceNumber}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Payment Card:</span>
                    <span className="text-slate-900 font-semibold">{completedPayment.cardBrand.toUpperCase()} •••• {completedPayment.cardLast4}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Base Package:</span>
                    <span className="text-slate-900">USD 150.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">5% Card Fee:</span>
                    <span className="text-[#ea580c]">USD 7.50</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
                    <span>Total Charged:</span>
                    <span className="text-[#0a2265]">USD 157.50</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      setIsPaymentModalOpen(false);
                      setTrackQuery(completedPayment.referenceNumber);
                      setActiveTab('track');
                      etaService.trackApplication(completedPayment.referenceNumber).then(setTrackedApplication);
                    }}
                    className="w-full py-3 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Track Status Now
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
