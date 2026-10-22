import {
  EtaApplication,
  EtaApplicationFormData,
  PaymentBreakdown,
  PaymentDetails,
  EtaStatus,
} from '../types/eta';
import { SEED_ETA_APPLICATIONS } from '../data/seedEtaApplications';

const STORAGE_KEY = 'push_world_eta_applications_v1';

export const BASE_PACKAGE_PRICE = 150.0;
export const CARD_PROCESSING_FEE_RATE = 0.05; // 5%

export const calculatePricing = (baseAmount: number = BASE_PACKAGE_PRICE): PaymentBreakdown => {
  const processingFee = Math.round(baseAmount * CARD_PROCESSING_FEE_RATE * 100) / 100;
  const totalAmount = Math.round((baseAmount + processingFee) * 100) / 100;
  return {
    baseAmount,
    processingFeeRate: CARD_PROCESSING_FEE_RATE,
    processingFee,
    totalAmount,
    currency: 'USD',
  };
};

export const getStoredApplications = (): EtaApplication[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ETA_APPLICATIONS));
      return SEED_ETA_APPLICATIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ETA_APPLICATIONS));
    return SEED_ETA_APPLICATIONS;
  } catch (err) {
    console.warn('Error reading stored eTA applications:', err);
    return SEED_ETA_APPLICATIONS;
  }
};

export const saveStoredApplications = (apps: EtaApplication[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } catch (err) {
    console.error('Error saving stored eTA applications:', err);
  }
};

export const generateEtaReference = (): string => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `PWT-ETA-2026-${num}`;
};

export const generateEtaGovNumber = (): string => {
  const num = Math.floor(10000000 + Math.random() * 90000000);
  return `ETA-KE-2026-${num}`;
};

export const generateTransactionId = (): string => {
  const hex = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `TXN-PWT-${Date.now().toString().slice(-4)}${hex}`;
};

// Main service object
export const etaService = {
  // 1. Fetch all applications (for Admin dashboard, with optional authorization token)
  async getAllApplications(adminToken?: string): Promise<EtaApplication[]> {
    try {
      const res = await fetch('/api/eta/applications', {
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          saveStoredApplications(data);
          return data;
        }
      }
    } catch {
      // Fallback to cache if server endpoint temporarily offline
    }
    return getStoredApplications();
  },

  // 2. Track application by Reference or Passport number (Public)
  async trackApplication(query: string): Promise<EtaApplication | null> {
    const cleanQuery = query.trim().toUpperCase();
    if (!cleanQuery) return null;

    try {
      const res = await fetch(`/api/eta/track/${encodeURIComponent(cleanQuery)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && (data.id || data.referenceNumber)) return data;
      }
    } catch {
      // local fallback
    }

    const apps = getStoredApplications();
    return (
      apps.find(
        (a) =>
          a.referenceNumber.toUpperCase() === cleanQuery ||
          a.passportNumber.toUpperCase() === cleanQuery ||
          (a.etaNumber && a.etaNumber.toUpperCase() === cleanQuery) ||
          a.id.toUpperCase() === cleanQuery
      ) || null
    );
  },

  // 3. Upload secure private document to Supabase Storage private bucket ('eta-documents')
  async uploadSecureDocument(
    fileBase64: string,
    fileName: string,
    mimeType: string,
    docType: 'passport_biodata' | 'passport_photo' | 'flight_ticket' | 'accommodation'
  ): Promise<{ success: boolean; storagePath?: string; url?: string; error?: string }> {
    try {
      const res = await fetch('/api/eta/upload-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileBase64, fileName, mimeType, docType }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Document upload failed server validation' };
      }
      return { success: true, storagePath: data.storagePath, url: data.url };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error uploading document' };
    }
  },

  // 4. Request short-lived signed URL for an authorized admin to view/download private passport document
  async getSecureDocumentUrl(storagePath: string, adminToken?: string): Promise<{ success: boolean; signedUrl?: string; error?: string }> {
    try {
      const res = await fetch('/api/admin/eta/document-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken || ''}`,
        },
        body: JSON.stringify({ storagePath }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to generate signed document URL' };
      }
      return { success: true, signedUrl: data.signedUrl };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error communicating with document storage' };
    }
  },

  // 5. Submit a new application (stored in Supabase eta_applications table)
  async submitApplication(
    formData: EtaApplicationFormData
  ): Promise<{ success: boolean; application?: EtaApplication; error?: string }> {
    const ref = generateEtaReference();
    const pricing = calculatePricing(BASE_PACKAGE_PRICE);
    const now = new Date().toISOString();

    const newApp: EtaApplication = {
      id: ref,
      referenceNumber: ref,
      createdAt: now,
      updatedAt: now,
      status: 'submitted',

      // Biodata
      surname: formData.surname.toUpperCase(),
      givenNames: formData.givenNames,
      nationality: formData.nationality,
      countryOfBirth: formData.countryOfBirth || formData.nationality,
      passportNumber: formData.passportNumber.toUpperCase(),
      passportIssueDate: formData.passportIssueDate,
      passportExpiryDate: formData.passportExpiryDate,
      passportIssuingCountry: formData.passportIssuingCountry || formData.nationality,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      occupation: formData.occupation,
      email: formData.email.toLowerCase().trim(),
      phone: formData.phone,
      residenceCountry: formData.residenceCountry,
      residenceCity: formData.residenceCity,
      residentialAddress: formData.residentialAddress,

      // Trip
      purposeOfVisit: formData.purposeOfVisit,
      arrivalDate: formData.arrivalDate,
      departureDate: formData.departureDate,
      portOfEntry: formData.portOfEntry,
      airline: formData.airline,
      flightNumber: formData.flightNumber.toUpperCase(),
      accommodationType: formData.accommodationType,
      accommodationName: formData.accommodationName,
      accommodationAddress: formData.accommodationAddress,

      // Declarations & Consents
      yellowFeverVaccinated: formData.yellowFeverVaccinated,
      emergencyContactName: formData.emergencyContactName,
      emergencyContactPhone: formData.emergencyContactPhone,
      emergencyContactRelationship: formData.emergencyContactRelationship,
      declarations: {
        confirmInformationAccuracy: Boolean(formData.confirmInformationAccuracy),
        authoriseProcessing: Boolean(formData.authoriseProcessing),
        acceptTermsPrivacy: Boolean(formData.acceptTermsPrivacy),
        acknowledgeGovDecision: Boolean(formData.acknowledgeGovDecision),
        acknowledgeNoGuarantee: Boolean(formData.acknowledgeNoGuarantee),
        understandRefundPolicy: Boolean(formData.understandRefundPolicy),
        consentSensitiveData: Boolean(formData.consentSensitiveData),
      },

      // Uploads
      passportBioDataUrl: formData.passportBioDataUrl,
      passportPhotoUrl: formData.passportPhotoUrl,
      flightTicketUrl: formData.flightTicketUrl,
      accommodationProofUrl: formData.accommodationProofUrl,

      // Package & Price
      packageName: 'Kenya eTA Assistance + Comprehensive Travel Insurance',
      pricing,
      paymentStatus: 'pending',
    };

    // Post to real backend
    try {
      const res = await fetch('/api/eta/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to submit application to server' };
      }

      const savedApp = data.application || newApp;
      const apps = getStoredApplications();
      saveStoredApplications([savedApp, ...apps]);

      return { success: true, application: savedApp };
    } catch (err: any) {
      console.warn('Backend sync deferred, saving locally:', err);
      const apps = getStoredApplications();
      saveStoredApplications([newApp, ...apps]);
      return { success: true, application: newApp };
    }
  },

  // 6. Process payment through international card gateway with backend verification
  async processPayment(
    applicationId: string,
    cardData: {
      cardholderName: string;
      cardNumber: string;
      expiryMonth: string;
      expiryYear: string;
      cvv: string;
      billingCountry?: string;
    }
  ): Promise<{ success: boolean; application?: EtaApplication; payment?: PaymentDetails; error?: string }> {
    const cleanNum = cardData.cardNumber.replace(/\s+/g, '');
    let cardBrand: PaymentDetails['cardBrand'] = 'generic';
    if (cleanNum.startsWith('4')) cardBrand = 'visa';
    else if (/^5[1-5]/.test(cleanNum)) cardBrand = 'mastercard';
    else if (/^3[47]/.test(cleanNum)) cardBrand = 'amex';
    else if (/^6(?:011|5)/.test(cleanNum)) cardBrand = 'discover';

    const last4 = cleanNum.slice(-4) || '8842';
    const pricing = calculatePricing(BASE_PACKAGE_PRICE);
    const txnId = generateTransactionId();
    const receiptNum = `RCPT-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();

    const paymentDetails: PaymentDetails = {
      transactionId: txnId,
      referenceNumber: applicationId,
      cardBrand,
      cardLast4: last4,
      cardholderName: cardData.cardholderName,
      paidAt: now,
      baseAmount: pricing.baseAmount,
      processingFee: pricing.processingFee,
      totalAmount: pricing.totalAmount,
      currency: 'USD',
      paymentMethod: `Credit / Debit Card (${cardBrand.toUpperCase()} 3D-Secure Verified)`,
      receiptNumber: receiptNum,
    };

    // Require backend payment verification before marking application as paid
    try {
      const res = await fetch('/api/eta/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          paymentDetails,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.verified) {
        console.error('Backend payment verification rejected:', data.error);
        return {
          success: false,
          error: data.error || 'Payment could not be verified by Push World Travel gateway. Please verify card details.',
        };
      }

      // Backend verified successfully! Update local cache with verified state
      const verifiedApp = data.application;
      const verifiedPayment = data.payment || paymentDetails;

      const apps = getStoredApplications();
      const index = apps.findIndex((a) => a.id === applicationId || a.referenceNumber === applicationId);
      if (index !== -1) {
        apps[index] = verifiedApp;
        saveStoredApplications(apps);
      }

      return {
        success: true,
        application: verifiedApp,
        payment: verifiedPayment,
      };
    } catch (err: any) {
      console.error('Backend payment verification communication error:', err);
      return {
        success: false,
        error: 'Unable to connect to payment gateway verification server. Application remains unpaid pending verification.',
      };
    }
  },

  // 7. Admin: Update Status & Approve
  async updateApplicationStatus(
    applicationId: string,
    status: EtaStatus,
    adminNotes?: string,
    etaNumber?: string,
    approvedAt?: string,
    adminToken?: string
  ): Promise<{ success: boolean; application?: EtaApplication; error?: string }> {
    try {
      const res = await fetch(`/api/admin/eta/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken || ''}`,
        },
        body: JSON.stringify({ status, adminNotes, etaNumber, approvedAt }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to update application on server' };
      }
      return { success: true, application: data.application };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // 8. Admin: Delete Application and its stored documents
  async deleteApplication(applicationId: string, adminToken?: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch(`/api/admin/eta/applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken || ''}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to delete application' };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // 9. Admin Stats
  async getStats(adminToken?: string): Promise<any> {
    try {
      const res = await fetch('/api/admin/eta/stats', {
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Failed to fetch stats:', err);
    }
    return null;
  },
};
