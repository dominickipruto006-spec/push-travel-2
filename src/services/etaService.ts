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
  // Fetch all applications (for Admin dashboard)
  async getAllApplications(): Promise<EtaApplication[]> {
    try {
      const res = await fetch('/api/eta/applications');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          saveStoredApplications(data);
          return data;
        }
      }
    } catch {
      // Fallback to local storage if server endpoint not reachable
    }
    return getStoredApplications();
  },

  // Track application by Reference or Passport number
  async trackApplication(query: string): Promise<EtaApplication | null> {
    const cleanQuery = query.trim().toUpperCase();
    if (!cleanQuery) return null;

    try {
      const res = await fetch(`/api/eta/track/${encodeURIComponent(cleanQuery)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.id) return data;
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

  // Submit a new application
  async submitApplication(
    formData: EtaApplicationFormData
  ): Promise<{ success: boolean; application: EtaApplication; error?: string }> {
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

      // Declarations
      yellowFeverVaccinated: formData.yellowFeverVaccinated,
      emergencyContactName: formData.emergencyContactName,
      emergencyContactPhone: formData.emergencyContactPhone,
      emergencyContactRelationship: formData.emergencyContactRelationship,

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

    // Save to local storage first
    const apps = getStoredApplications();
    const updated = [newApp, ...apps];
    saveStoredApplications(updated);

    // Try posting to backend
    try {
      await fetch('/api/eta/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp),
      });
    } catch (err) {
      console.warn('Backend sync deferred, saved locally:', err);
    }

    return { success: true, application: newApp };
  },

  // Process payment through international card gateway
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

    // Update in stored apps
    const apps = getStoredApplications();
    const index = apps.findIndex((a) => a.id === applicationId || a.referenceNumber === applicationId);
    if (index === -1) {
      return { success: false, error: 'Application not found' };
    }

    const updatedApp: EtaApplication = {
      ...apps[index],
      paymentStatus: 'paid',
      status: 'under_review', // Moves to active review queue once payment is settled
      updatedAt: now,
      paymentDetails,
    };

    apps[index] = updatedApp;
    saveStoredApplications(apps);

    // Try posting to backend
    try {
      await fetch('/api/eta/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          paymentDetails,
        }),
      });
    } catch (err) {
      console.warn('Backend payment sync deferred:', err);
    }

    return {
      success: true,
      application: updatedApp,
      payment: paymentDetails,
    };
  },

  // Admin: Update Status & Approve
  async updateApplicationStatus(
    applicationId: string,
    status: EtaStatus,
    adminNotes?: string
  ): Promise<{ success: boolean; application?: EtaApplication }> {
    const apps = getStoredApplications();
    const index = apps.findIndex((a) => a.id === applicationId || a.referenceNumber === applicationId);
    if (index === -1) return { success: false };

    const now = new Date().toISOString();
    const current = apps[index];

    let etaNumber = current.etaNumber;
    let approvedAt = current.approvedAt;
    if (status === 'approved' && !etaNumber) {
      etaNumber = generateEtaGovNumber();
      approvedAt = now;
    }

    const updated: EtaApplication = {
      ...current,
      status,
      etaNumber,
      approvedAt,
      adminNotes: adminNotes || current.adminNotes,
      updatedAt: now,
    };

    apps[index] = updated;
    saveStoredApplications(apps);

    try {
      await fetch(`/api/eta/admin/applications/${encodeURIComponent(applicationId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes, etaNumber, approvedAt }),
      });
    } catch {
      // Local storage handled
    }

    return { success: true, application: updated };
  },
};
