export type EtaStatus =
  | 'submitted'
  | 'payment_pending'
  | 'under_review'
  | 'approved'
  | 'additional_info_required'
  | 'rejected';

export interface PaymentBreakdown {
  baseAmount: number; // 150.00
  processingFeeRate: number; // 0.05 (5%)
  processingFee: number; // 7.50
  totalAmount: number; // 157.50
  currency: string; // 'USD'
}

export interface PaymentDetails {
  transactionId: string;
  referenceNumber: string;
  cardBrand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'generic';
  cardLast4: string;
  cardholderName: string;
  paidAt: string;
  baseAmount: number;
  processingFee: number;
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  receiptNumber: string;
}

export interface EtaApplication {
  id: string; // e.g. 'PWT-ETA-849201'
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
  status: EtaStatus;
  etaNumber?: string; // 'ETA-KE-2026-XXXXXX'
  approvedAt?: string;

  // Applicant Biodata
  surname: string;
  givenNames: string;
  nationality: string;
  countryOfBirth: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportIssuingCountry: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  occupation: string;
  email: string;
  phone: string;
  residenceCountry: string;
  residenceCity: string;
  residentialAddress: string;

  // Trip & Arrival Details
  purposeOfVisit: 'Holiday / Wildlife Safari' | 'Business & Meetings' | 'Family & Friends' | 'Transit' | 'Conference / Event';
  arrivalDate: string;
  departureDate: string;
  portOfEntry: string;
  airline: string;
  flightNumber: string;
  accommodationType: string;
  accommodationName: string;
  accommodationAddress: string;

  // Declarations & Consents
  yellowFeverVaccinated: boolean;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  declarations?: {
    confirmInformationAccuracy: boolean;
    authoriseProcessing: boolean;
    acceptTermsPrivacy: boolean;
    acknowledgeGovDecision: boolean;
    acknowledgeNoGuarantee: boolean;
    understandRefundPolicy: boolean;
    consentSensitiveData: boolean;
  };

  // Document Uploads (base64 or hosted URLs)
  passportBioDataUrl: string;
  passportPhotoUrl: string;
  flightTicketUrl?: string;
  accommodationProofUrl?: string;

  // Package & Pricing
  packageName: string;
  pricing: PaymentBreakdown;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentDetails?: PaymentDetails;

  // Administrative Review
  adminNotes?: string;
  reviewedBy?: string;
  internalRef?: string;
}

export interface EtaApplicationFormData {
  // Step 1: Personal & Passport
  surname: string;
  givenNames: string;
  nationality: string;
  countryOfBirth: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportIssuingCountry: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  occupation: string;
  email: string;
  phone: string;
  residenceCountry: string;
  residenceCity: string;
  residentialAddress: string;

  // Step 2: Trip & Travel
  purposeOfVisit: 'Holiday / Wildlife Safari' | 'Business & Meetings' | 'Family & Friends' | 'Transit' | 'Conference / Event';
  arrivalDate: string;
  departureDate: string;
  portOfEntry: string;
  airline: string;
  flightNumber: string;
  accommodationType: string;
  accommodationName: string;
  accommodationAddress: string;

  // Step 3: Health & Emergency
  yellowFeverVaccinated: boolean;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;

  // Step 4: Documents
  passportBioDataUrl: string;
  passportPhotoUrl: string;
  flightTicketUrl?: string;
  accommodationProofUrl?: string;

  // Step 4: Mandatory Applicant Declarations & Consents
  confirmInformationAccuracy: boolean;
  authoriseProcessing: boolean;
  acceptTermsPrivacy: boolean;
  acknowledgeGovDecision: boolean;
  acknowledgeNoGuarantee: boolean;
  understandRefundPolicy: boolean;
  consentSensitiveData: boolean;

  // Backward compatibility aliases
  agreeToTerms?: boolean;
}
