import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'eta_applications.json');
const PAYMENTS_FILE = path.join(DATA_DIR, 'eta_payments.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial sample seed data if empty
const INITIAL_SEED_APPLICATIONS = [
  {
    id: 'PWT-ETA-2026-881920',
    referenceNumber: 'PWT-ETA-2026-881920',
    createdAt: '2026-10-18T08:30:00.000Z',
    updatedAt: '2026-10-19T14:15:00.000Z',
    status: 'approved',
    etaNumber: 'ETA-KE-2026-94812039',
    approvedAt: '2026-10-19T14:15:00.000Z',
    surname: 'MONTGOMERY',
    givenNames: 'Arthur James',
    nationality: 'United Kingdom',
    countryOfBirth: 'United Kingdom',
    passportNumber: 'GB882910492',
    passportIssueDate: '2022-04-12',
    passportExpiryDate: '2032-04-11',
    passportIssuingCountry: 'United Kingdom',
    dateOfBirth: '1984-06-22',
    gender: 'Male',
    maritalStatus: 'Married',
    occupation: 'Architectural Director',
    email: 'arthur.montgomery@architectural-uk.com',
    phone: '+44 7700 900452',
    residenceCountry: 'United Kingdom',
    residenceCity: 'London',
    residentialAddress: '42 Kensington Church Street, London W8 4DB',
    purposeOfVisit: 'Holiday / Wildlife Safari',
    arrivalDate: '2026-11-15',
    departureDate: '2026-11-25',
    portOfEntry: 'Jomo Kenyatta International Airport (JKIA) - Nairobi',
    airline: 'Kenya Airways',
    flightNumber: 'KQ 101',
    accommodationType: 'Push World Travel Tour',
    accommodationName: 'Push World Travel - Mara Serena Safari Lodge & Amboseli',
    accommodationAddress: 'Push Building, Thome, Northern Bypass, Nairobi',
    yellowFeverVaccinated: true,
    emergencyContactName: 'Claire Montgomery',
    emergencyContactPhone: '+44 7700 900891',
    emergencyContactRelationship: 'Spouse',
    passportBioDataUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    passportPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    packageName: 'Kenya eTA Assistance + Comprehensive Travel Insurance',
    pricing: {
      baseAmount: 150.0,
      processingFeeRate: 0.05,
      processingFee: 7.5,
      totalAmount: 157.5,
      currency: 'USD',
    },
    paymentStatus: 'paid',
    paymentDetails: {
      transactionId: 'TXN-PWT-99482103',
      referenceNumber: 'PWT-ETA-2026-881920',
      cardBrand: 'visa',
      cardLast4: '4242',
      cardholderName: 'Arthur J Montgomery',
      paidAt: '2026-10-18T08:35:12.000Z',
      baseAmount: 150.0,
      processingFee: 7.5,
      totalAmount: 157.5,
      currency: 'USD',
      paymentMethod: 'International Credit Card (Visa 3D-Secure Verified)',
      receiptNumber: 'RCPT-2026-881920',
    },
    adminNotes: 'Verified passport bio-data and 10-year validity. Issued official eTA with AMREF Medical Air Evacuation policy #PWT-INS-2026-0819.',
    reviewedBy: 'Dominic K. - Immigration Operations Desk',
  },
  {
    id: 'PWT-ETA-2026-773912',
    referenceNumber: 'PWT-ETA-2026-773912',
    createdAt: '2026-10-20T11:05:00.000Z',
    updatedAt: '2026-10-20T13:45:00.000Z',
    status: 'under_review',
    surname: 'WEBER',
    givenNames: 'Hannah Sophie',
    nationality: 'Germany',
    countryOfBirth: 'Germany',
    passportNumber: 'C48910023K',
    passportIssueDate: '2023-01-18',
    passportExpiryDate: '2033-01-17',
    passportIssuingCountry: 'Germany',
    dateOfBirth: '1991-09-14',
    gender: 'Female',
    maritalStatus: 'Single',
    occupation: 'Environmental Scientist',
    email: 'hannah.weber@berlin-eco.de',
    phone: '+49 171 8920194',
    residenceCountry: 'Germany',
    residenceCity: 'Berlin',
    residentialAddress: 'Kastanienallee 84, 10435 Berlin',
    purposeOfVisit: 'Holiday / Wildlife Safari',
    arrivalDate: '2026-11-20',
    departureDate: '2026-12-02',
    portOfEntry: 'Jomo Kenyatta International Airport (JKIA) - Nairobi',
    airline: 'Lufthansa',
    flightNumber: 'LH 590',
    accommodationType: 'Hotel / Safari Lodge',
    accommodationName: 'Ol Pejeta Bush Camp & Push World Safari Cruiser',
    accommodationAddress: 'Ol Pejeta Conservancy, Nanyuki, Kenya',
    yellowFeverVaccinated: true,
    emergencyContactName: 'Markus Weber',
    emergencyContactPhone: '+49 171 4455667',
    emergencyContactRelationship: 'Father',
    passportBioDataUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    passportPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    packageName: 'Kenya eTA Assistance + Comprehensive Travel Insurance',
    pricing: {
      baseAmount: 150.0,
      processingFeeRate: 0.05,
      processingFee: 7.5,
      totalAmount: 157.5,
      currency: 'USD',
    },
    paymentStatus: 'paid',
    paymentDetails: {
      transactionId: 'TXN-PWT-77391201',
      referenceNumber: 'PWT-ETA-2026-773912',
      cardBrand: 'mastercard',
      cardLast4: '8814',
      cardholderName: 'Hannah S Weber',
      paidAt: '2026-10-20T11:12:44.000Z',
      baseAmount: 150.0,
      processingFee: 7.5,
      totalAmount: 157.5,
      currency: 'USD',
      paymentMethod: 'International Debit Card (Mastercard 3DS)',
      receiptNumber: 'RCPT-2026-773912',
    },
    adminNotes: 'Submitted to Kenya Immigration eTA portal queue. Fast-track processing active.',
    reviewedBy: 'Staff Travel Desk - Push Building, Thome',
  },
];

// Helper to read applications from file
function readApplications(): any[] {
  try {
    if (!fs.existsSync(APPLICATIONS_FILE)) {
      fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(INITIAL_SEED_APPLICATIONS, null, 2));
      return INITIAL_SEED_APPLICATIONS;
    }
    const data = fs.readFileSync(APPLICATIONS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : INITIAL_SEED_APPLICATIONS;
  } catch (err) {
    console.error('Error reading applications file:', err);
    return INITIAL_SEED_APPLICATIONS;
  }
}

// Helper to write applications to file
function writeApplications(apps: any[]): void {
  try {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(apps, null, 2));
  } catch (err) {
    console.error('Error writing applications file:', err);
  }
}

// Helper to record payment log
function recordPayment(payment: any): void {
  try {
    let payments: any[] = [];
    if (fs.existsSync(PAYMENTS_FILE)) {
      const data = fs.readFileSync(PAYMENTS_FILE, 'utf-8');
      payments = JSON.parse(data);
    }
    payments.unshift(payment);
    fs.writeFileSync(PAYMENTS_FILE, JSON.stringify(payments, null, 2));
  } catch (err) {
    console.error('Error recording payment:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // --- API Routes ---

  // 1. Get all applications (Admin & overview)
  app.get('/api/eta/applications', (req, res) => {
    const apps = readApplications();
    res.json(apps);
  });

  // 2. Track application by Reference or Passport
  app.get('/api/eta/track/:query', (req, res) => {
    const query = req.params.query.trim().toUpperCase();
    const apps = readApplications();
    const found = apps.find(
      (a) =>
        a.referenceNumber.toUpperCase() === query ||
        a.passportNumber.toUpperCase() === query ||
        (a.etaNumber && a.etaNumber.toUpperCase() === query) ||
        a.id.toUpperCase() === query
    );
    if (!found) {
      return res.status(404).json({ error: 'Application not found with provided reference or passport number' });
    }
    res.json(found);
  });

  // 3. Submit new application
  app.post('/api/eta/applications', (req, res) => {
    try {
      const newApp = req.body;
      if (!newApp || !newApp.surname || !newApp.passportNumber) {
        return res.status(400).json({ error: 'Missing required applicant fields' });
      }

      const apps = readApplications();
      // Prepend so latest appears first
      apps.unshift(newApp);
      writeApplications(apps);

      res.status(201).json({ success: true, application: newApp });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to save application' });
    }
  });

  // 4. Process international card payment
  app.post('/api/eta/payments/process', (req, res) => {
    try {
      const { applicationId, paymentDetails } = req.body;
      if (!applicationId || !paymentDetails) {
        return res.status(400).json({ error: 'Missing payment payload' });
      }

      const apps = readApplications();
      const idx = apps.findIndex((a) => a.id === applicationId || a.referenceNumber === applicationId);
      if (idx === -1) {
        return res.status(404).json({ error: 'Application not found for payment' });
      }

      const now = new Date().toISOString();
      apps[idx].paymentStatus = 'paid';
      apps[idx].status = 'under_review';
      apps[idx].updatedAt = now;
      apps[idx].paymentDetails = paymentDetails;

      writeApplications(apps);
      recordPayment({ ...paymentDetails, recordedAt: now });

      res.json({ success: true, application: apps[idx], payment: paymentDetails });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Payment processing failed' });
    }
  });

  // 5. Admin: Update application status & approve
  app.patch('/api/eta/admin/applications/:id', (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminNotes, etaNumber, approvedAt } = req.body;

      const apps = readApplications();
      const idx = apps.findIndex((a) => a.id === id || a.referenceNumber === id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Application not found' });
      }

      const now = new Date().toISOString();
      if (status) apps[idx].status = status;
      if (adminNotes !== undefined) apps[idx].adminNotes = adminNotes;
      if (etaNumber) apps[idx].etaNumber = etaNumber;
      if (approvedAt) apps[idx].approvedAt = approvedAt;
      apps[idx].updatedAt = now;

      writeApplications(apps);
      res.json({ success: true, application: apps[idx] });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to update application' });
    }
  });

  // 6. Admin summary metrics
  app.get('/api/eta/stats', (req, res) => {
    const apps = readApplications();
    const total = apps.length;
    const approved = apps.filter((a) => a.status === 'approved').length;
    const underReview = apps.filter((a) => a.status === 'under_review').length;
    const submitted = apps.filter((a) => a.status === 'submitted').length;
    const paidApps = apps.filter((a) => a.paymentStatus === 'paid');
    const totalRevenue = paidApps.reduce((acc, a) => acc + (a.pricing?.totalAmount || 157.5), 0);

    res.json({
      totalApplications: total,
      approved,
      underReview,
      submitted,
      paidCount: paidApps.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      currency: 'USD',
    });
  });

  // Vite integration: Dev middleware or Static serving
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Push World Travel Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
});
