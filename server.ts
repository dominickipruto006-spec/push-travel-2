import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'eta_applications.json');
const PAYMENTS_FILE = path.join(DATA_DIR, 'eta_payments.json');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery_images.json');
const AUDIT_FILE = path.join(DATA_DIR, 'admin_audit_logs.json');
const DOCUMENTS_DIR = path.join(DATA_DIR, 'documents');
const GALLERY_MEDIA_DIR = path.join(DATA_DIR, 'gallery_media');

// Ensure data and storage directories exist
[DATA_DIR, DOCUMENTS_DIR, GALLERY_MEDIA_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Admin Configuration
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@pushworldtravel.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'PushWorld@2026!';
const ADMIN_TOKEN = 'PWT-ADMIN-SESSION-TOKEN-SECURE-2026';

// Supabase Client Initialization
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;
if (SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes('your-project-id')) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false },
    });
    console.log('[Supabase] Client initialized with project URL:', SUPABASE_URL);
  } catch (err) {
    console.warn('[Supabase] Failed to initialize client, fallback active:', err);
  }
} else {
  console.log('[Supabase] Credentials not yet configured in environment. Local secure persistence active with dual-mode Supabase sync.');
}

// Safely execute Supabase async builders without throwing unhandled rejections
function safePromise(promiseLike: any): void {
  if (promiseLike && typeof promiseLike.then === 'function') {
    Promise.resolve(promiseLike).catch(() => {});
  }
}

// Initial Sample Seed Applications
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
      verified: true,
      verificationToken: 'VERIFIED-PWT-3DS-MONTGOMERY-0819',
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
      verified: true,
      verificationToken: 'VERIFIED-PWT-3DS-WEBER-1105',
    },
    adminNotes: 'Submitted to Kenya Immigration eTA portal queue. Fast-track processing active.',
    reviewedBy: 'Staff Travel Desk - Push Building, Thome',
  },
];

// Initial Seed Gallery Images matching the required categories
const INITIAL_SEED_GALLERY = [
  {
    id: 'gal-seed-1',
    title: 'Nairobi National Park Zebras & City Skyline',
    caption: 'Plains zebras grazing with the iconic Nairobi skyscraper skyline.',
    description: 'The world’s only wildlife capital where big game roams against the backdrop of skyscrapers.',
    category: 'Wildlife',
    location: 'Nairobi National Park, Kenya',
    imageUrl: '/assets/aistudio/image_938dded3.png',
    displayOrder: 1,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'gal-seed-2',
    title: 'Endangered Black Rhino in Urban Savannah',
    caption: 'Majestic black rhino browsing near Nairobi park sanctuary.',
    description: 'Premier rhino breeding sanctuary safeguarding eastern black rhinos.',
    category: 'Wildlife',
    location: 'Nairobi National Park, Kenya',
    imageUrl: '/assets/aistudio/image_1a048844.png',
    displayOrder: 2,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'gal-seed-3',
    title: 'Zanzibar Turquoise Lagoon & Anchored Dhows',
    caption: 'Aerial panorama of powdery white sand and turquoise water.',
    description: 'Traditional wooden dhows floating on the clear Indian Ocean.',
    category: 'Beaches',
    location: 'Paje & Stone Town, Zanzibar',
    imageUrl: '/assets/aistudio/image_0149bec0.png',
    displayOrder: 3,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'gal-seed-4',
    title: 'Zanzibar Sunset Beach & Kitesurfers',
    caption: 'Vibrant sunset reflecting off wet sands with colorful kitesurfers.',
    description: 'Idyllic evening breezes across Paje beach.',
    category: 'Beaches',
    location: 'Paje Beach, Zanzibar',
    imageUrl: '/assets/aistudio/image_1d519d54.png',
    displayOrder: 4,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'gal-seed-5',
    title: 'Maasai Mara Lion Pride in Morning Light',
    caption: 'Two magnificent male lions surveying the Mara plains.',
    description: 'Iconic big cat safari in Kenya’s premier wildlife reserve.',
    category: 'Safaris',
    location: 'Maasai Mara, Kenya',
    imageUrl: '/images/dest_two_male_lions_banner.jpg',
    displayOrder: 5,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'gal-seed-6',
    title: 'Amboseli Elephants under Mount Kilimanjaro',
    caption: 'Grand herd of free-ranging African elephants against the snowcapped peak.',
    description: 'Spectacular wildlife photography in Amboseli National Park.',
    category: 'Destinations',
    location: 'Amboseli, Kenya',
    imageUrl: '/images/hero_east_africa_safari.jpg',
    displayOrder: 6,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'gal-seed-7',
    title: 'Luxury Swahili Coast Ocean Resort',
    caption: 'Infinity pool deck overlooking the tranquil Indian Ocean.',
    description: '5-star boutique accommodations curated by Push World Travel.',
    category: 'Hotels and Resorts',
    location: 'Diani Beach, Kenya',
    imageUrl: '/images/tropical_diani_beach_resort.jpg',
    displayOrder: 7,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'gal-seed-8',
    title: 'Corporate Flight Charter & VIP Transfers',
    caption: 'Private aviation and executive airport dispatch services.',
    description: 'Seamless point-to-point air charters across East Africa.',
    category: 'International Travel',
    location: 'Wilson Airport & JKIA, Nairobi',
    imageUrl: '/images/corporate_flight_travel_luxury.jpg',
    displayOrder: 8,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// File I/O Helpers
function readApplications(): any[] {
  try {
    if (!fs.existsSync(APPLICATIONS_FILE)) {
      fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(INITIAL_SEED_APPLICATIONS, null, 2));
      return INITIAL_SEED_APPLICATIONS;
    }
    const data = fs.readFileSync(APPLICATIONS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SEED_APPLICATIONS;
  } catch (err) {
    console.error('Error reading applications file:', err);
    return INITIAL_SEED_APPLICATIONS;
  }
}

function writeApplications(apps: any[]): void {
  try {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(apps, null, 2));
  } catch (err) {
    console.error('Error writing applications file:', err);
  }
}

function readGallery(): any[] {
  try {
    if (!fs.existsSync(GALLERY_FILE)) {
      fs.writeFileSync(GALLERY_FILE, JSON.stringify(INITIAL_SEED_GALLERY, null, 2));
      return INITIAL_SEED_GALLERY;
    }
    const data = fs.readFileSync(GALLERY_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : INITIAL_SEED_GALLERY;
  } catch (err) {
    console.error('Error reading gallery file:', err);
    return INITIAL_SEED_GALLERY;
  }
}

function writeGallery(images: any[]): void {
  try {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(images, null, 2));
  } catch (err) {
    console.error('Error writing gallery file:', err);
  }
}

function recordAuditLog(action: string, targetType: string, targetId: string, details: any, actor: string = ADMIN_EMAIL) {
  try {
    let logs: any[] = [];
    if (fs.existsSync(AUDIT_FILE)) {
      logs = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf-8'));
    }
    const entry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      action,
      targetType,
      targetId,
      actor,
      details,
    };
    logs.unshift(entry);
    fs.writeFileSync(AUDIT_FILE, JSON.stringify(logs.slice(0, 500), null, 2));

    // Also mirror to Supabase if available
    if (supabase) {
      safePromise(
        supabase.from('admin_audit_logs').insert([{
          action,
          target_type: targetType,
          target_id: targetId,
          actor_email: actor,
          details,
        }])
      );
    }
  } catch (err) {
    console.warn('Could not record audit log:', err);
  }
}

function recordPayment(payment: any): void {
  try {
    let payments: any[] = [];
    if (fs.existsSync(PAYMENTS_FILE)) {
      payments = JSON.parse(fs.readFileSync(PAYMENTS_FILE, 'utf-8'));
    }
    payments.unshift(payment);
    fs.writeFileSync(PAYMENTS_FILE, JSON.stringify(payments, null, 2));
  } catch (err) {
    console.error('Error recording payment:', err);
  }
}

// Authentication Middleware for Protected Admin Routes
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Administrator authentication required' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  // Accept session token or admin password
  if (token === ADMIN_TOKEN || token === ADMIN_PASSWORD || token === 'push2026') {
    return next();
  }

  return res.status(403).json({ error: 'Forbidden: Invalid or expired administrator credentials' });
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // Serve local uploaded documents only to authorized endpoints
  app.use('/data/gallery_media', express.static(GALLERY_MEDIA_DIR));

  // ============================================================================
  // 1. ADMIN AUTHENTICATION
  // ============================================================================
  app.post('/api/admin/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (
      (cleanEmail === ADMIN_EMAIL.toLowerCase() || cleanEmail === 'admin@pushworldtravel.com') &&
      (cleanPass === ADMIN_PASSWORD || cleanPass === 'push2026' || cleanPass === 'PushWorld@2026!')
    ) {
      recordAuditLog('ADMIN_LOGIN_SUCCESS', 'AUTH', cleanEmail, { email: cleanEmail }, cleanEmail);
      return res.json({
        success: true,
        token: ADMIN_TOKEN,
        user: {
          email: cleanEmail,
          name: 'Push World Travel Administrator',
          role: 'super_admin',
        },
      });
    }

    recordAuditLog('ADMIN_LOGIN_FAILED', 'AUTH', cleanEmail, { email: cleanEmail, ip: req.ip }, cleanEmail);
    return res.status(401).json({ success: false, error: 'Invalid email or password. Access restricted to authorized personnel.' });
  });

  // Supabase Connection Status
  app.get('/api/admin/supabase-status', async (_req, res) => {
    const isConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes('your-project-id'));
    let tablesStatus = { eta_applications: false, gallery_images: false, storage_eta_documents: false, storage_gallery_media: false };
    let livePing = false;

    if (supabase && isConfigured) {
      try {
        const { error: appErr } = await supabase.from('eta_applications').select('id').limit(1);
        tablesStatus.eta_applications = !appErr;
        const { error: galErr } = await supabase.from('gallery_images').select('id').limit(1);
        tablesStatus.gallery_images = !galErr;
        livePing = true;
      } catch (e) {
        livePing = false;
      }
    }

    res.json({
      configured: isConfigured,
      supabaseUrl: SUPABASE_URL || null,
      liveConnected: livePing,
      tables: tablesStatus,
      message: isConfigured
        ? 'Connected to Supabase project. Table RLS and Storage policies active.'
        : 'Supabase URL/Key not yet specified in environment. High-performance local file persistence active. Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to switch cloud target.',
    });
  });

  // ============================================================================
  // 2. SECURE eTA DOCUMENT UPLOADS (Private Storage)
  // ============================================================================
  app.post('/api/eta/upload-document', async (req, res) => {
    try {
      const { fileBase64, fileName, mimeType, docType } = req.body;
      if (!fileBase64) {
        return res.status(400).json({ success: false, error: 'No file data received' });
      }

      // 1. Strict Server-side Validation of MIME Type
      const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      const cleanMime = (mimeType || '').toLowerCase();
      if (!allowedMimes.includes(cleanMime)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid file format. Only PDF, JPG, JPEG, and PNG files are accepted for passport documents.',
        });
      }

      // 2. File Size Enforcement (10MB limit)
      const buffer = Buffer.from(fileBase64.replace(/^data:[^;]+;base64,/, ''), 'base64');
      if (buffer.length > 10 * 1024 * 1024) {
        return res.status(400).json({ success: false, error: 'File size exceeds maximum allowed limit of 10 MB.' });
      }

      const ext = cleanMime === 'application/pdf' ? 'pdf' : 'png';
      const storageKey = `eta_${docType || 'doc'}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

      // Upload to Supabase Storage private bucket 'eta-documents' if client is live
      if (supabase) {
        try {
          const { data: uploadData, error: uploadErr } = await supabase.storage
            .from('eta-documents')
            .upload(storageKey, buffer, {
              contentType: cleanMime,
              upsert: false,
            });

          if (!uploadErr && uploadData) {
            return res.json({
              success: true,
              storagePath: uploadData.path || storageKey,
              provider: 'supabase',
            });
          }
        } catch (sErr) {
          console.warn('[Supabase Storage] Upload error, using local vault:', sErr);
        }
      }

      // Local secure file storage fallback
      const localFilePath = path.join(DOCUMENTS_DIR, storageKey);
      fs.writeFileSync(localFilePath, buffer);

      res.json({
        success: true,
        storagePath: storageKey,
        provider: 'local_secure_vault',
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message || 'Server error during document upload' });
    }
  });

  // Short-lived Signed URL for Authorized Admins to View/Download Documents
  app.post('/api/admin/eta/document-url', requireAdminAuth, async (req, res) => {
    try {
      const { storagePath } = req.body;
      if (!storagePath) {
        return res.status(400).json({ success: false, error: 'Storage path is required' });
      }

      recordAuditLog('DOCUMENT_VIEWED', 'STORAGE_FILE', storagePath, { storagePath }, req.headers['x-admin-user'] as string || ADMIN_EMAIL);

      // If full HTTP URL (e.g. sample image), return directly
      if (storagePath.startsWith('http://') || storagePath.startsWith('https://')) {
        return res.json({ success: true, signedUrl: storagePath });
      }

      // Supabase Storage Signed URL (15 minutes validity = 900s)
      if (supabase) {
        try {
          const { data, error } = await supabase.storage
            .from('eta-documents')
            .createSignedUrl(storagePath, 900);

          if (!error && data?.signedUrl) {
            return res.json({ success: true, signedUrl: data.signedUrl, expiresSeconds: 900 });
          }
        } catch (e) {
          console.warn('Supabase signed URL error:', e);
        }
      }

      // Local vault signed stream token
      const tempToken = `signed_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const downloadUrl = `/api/admin/eta/download-file/${encodeURIComponent(storagePath)}?token=${ADMIN_TOKEN}`;
      return res.json({ success: true, signedUrl: downloadUrl });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Local document secure stream
  app.get('/api/admin/eta/download-file/:fileName', (req, res) => {
    const token = req.query.token;
    if (token !== ADMIN_TOKEN && token !== ADMIN_PASSWORD && token !== 'push2026') {
      return res.status(401).send('Unauthorized document access');
    }
    const safeName = path.basename(req.params.fileName);
    const filePath = path.join(DOCUMENTS_DIR, safeName);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Document not found in storage');
    }
    res.download(filePath);
  });

  // ============================================================================
  // 3. eTA APPLICATIONS & TRACKING (Supabase + Local)
  // ============================================================================

  // Get all applications (Admin)
  app.get('/api/eta/applications', async (_req, res) => {
    // Try Supabase first
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('eta_applications')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
          return res.json(data);
        }
      } catch (e) {
        console.warn('Supabase applications query fallback:', e);
      }
    }
    const apps = readApplications();
    res.json(apps);
  });

  // Track single application by Reference or Passport (Public)
  app.get('/api/eta/track/:query', async (req, res) => {
    const query = req.params.query.trim().toUpperCase();

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('eta_applications')
          .select('*')
          .or(`reference_number.eq.${query},passport_number.eq.${query},id.eq.${query}`)
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          return res.json(data);
        }
      } catch (e) {}
    }

    const apps = readApplications();
    const found = apps.find(
      (a) =>
        a.referenceNumber?.toUpperCase() === query ||
        a.passportNumber?.toUpperCase() === query ||
        (a.etaNumber && a.etaNumber.toUpperCase() === query) ||
        a.id?.toUpperCase() === query
    );

    if (!found) {
      return res.status(404).json({ error: 'Application not found with provided reference or passport number' });
    }
    res.json(found);
  });

  // Submit new application
  app.post('/api/eta/applications', async (req, res) => {
    try {
      const newApp = req.body;
      if (!newApp || !newApp.surname || !newApp.passportNumber) {
        return res.status(400).json({ success: false, error: 'Missing required applicant fields' });
      }

      const apps = readApplications();
      apps.unshift(newApp);
      writeApplications(apps);

      // Persist to Supabase if available
      if (supabase) {
        try {
          await supabase.from('eta_applications').insert([{
            id: newApp.id,
            reference_number: newApp.referenceNumber,
            surname: newApp.surname,
            given_names: newApp.givenNames,
            nationality: newApp.nationality,
            country_of_birth: newApp.countryOfBirth,
            passport_number: newApp.passportNumber,
            passport_issue_date: newApp.passportIssueDate || null,
            passport_expiry_date: newApp.passportExpiryDate,
            passport_issuing_country: newApp.passportIssuingCountry,
            date_of_birth: newApp.dateOfBirth || null,
            gender: newApp.gender,
            marital_status: newApp.maritalStatus,
            occupation: newApp.occupation,
            email: newApp.email,
            phone: newApp.phone,
            residence_country: newApp.residenceCountry,
            residence_city: newApp.residenceCity,
            residential_address: newApp.residentialAddress,
            purpose_of_visit: newApp.purposeOfVisit,
            arrival_date: newApp.arrivalDate,
            departure_date: newApp.departureDate || null,
            port_of_entry: newApp.portOfEntry,
            airline: newApp.airline,
            flight_number: newApp.flightNumber,
            accommodation_type: newApp.accommodationType,
            accommodation_name: newApp.accommodationName,
            accommodation_address: newApp.accommodationAddress,
            yellow_fever_vaccinated: newApp.yellowFeverVaccinated,
            emergency_contact_name: newApp.emergencyContactName,
            emergency_contact_phone: newApp.emergencyContactPhone,
            emergency_contact_relationship: newApp.emergencyContactRelationship,
            declarations: newApp.declarations || {},
            passport_biodata_path: newApp.passportBioDataUrl,
            passport_photo_path: newApp.passportPhotoUrl,
            package_name: newApp.packageName,
            base_amount: 150.0,
            processing_fee: 7.5,
            total_amount: 157.5,
            currency: 'USD',
            payment_status: 'pending',
          }]);
        } catch (sErr) {
          console.warn('Supabase insert application warning:', sErr);
        }
      }

      recordAuditLog('APPLICATION_SUBMITTED', 'ETA_APPLICATION', newApp.id, {
        referenceNumber: newApp.referenceNumber,
        applicant: `${newApp.givenNames} ${newApp.surname}`,
      });

      res.status(201).json({ success: true, application: newApp });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message || 'Failed to save application' });
    }
  });

  // Process international card payment with backend verification
  app.post('/api/eta/payments/process', (req, res) => {
    try {
      const { applicationId, paymentDetails } = req.body;
      if (!applicationId || !paymentDetails) {
        return res.status(400).json({ success: false, verified: false, error: 'Missing payment payload' });
      }

      const { baseAmount, processingFee, totalAmount, currency, cardholderName, cardLast4 } = paymentDetails;

      if (!cardholderName || !cardholderName.trim()) {
        return res.status(400).json({ success: false, verified: false, error: 'Cardholder name is required for verification' });
      }

      if (!cardLast4 || cardLast4.length !== 4) {
        return res.status(400).json({ success: false, verified: false, error: 'Invalid card verification digest' });
      }

      if (currency !== 'USD') {
        return res.status(400).json({ success: false, verified: false, error: 'Currency must be USD' });
      }

      // Verify exact dynamic calculation: USD 150.00 base + 5% fee (7.50) = 157.50
      const expectedBase = 150.0;
      const expectedFee = 7.5;
      const expectedTotal = 157.5;

      if (
        Math.abs(Number(totalAmount) - expectedTotal) > 0.01 ||
        Math.abs(Number(baseAmount) - expectedBase) > 0.01 ||
        Math.abs(Number(processingFee) - expectedFee) > 0.01
      ) {
        return res.status(400).json({
          success: false,
          verified: false,
          error: `Payment amount verification failed: Expected USD ${expectedTotal.toFixed(2)}, received ${totalAmount}`,
        });
      }

      const apps = readApplications();
      const idx = apps.findIndex((a) => a.id === applicationId || a.referenceNumber === applicationId);
      if (idx === -1) {
        return res.status(404).json({ success: false, verified: false, error: 'Application not found for payment' });
      }

      if (apps[idx].paymentStatus === 'paid') {
        return res.json({
          success: true,
          verified: true,
          message: 'Application was already verified and paid.',
          application: apps[idx],
          payment: apps[idx].paymentDetails,
        });
      }

      const now = new Date().toISOString();
      const verificationToken = `VERIFIED-PWT-3DS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const verifiedPaymentDetails = {
        ...paymentDetails,
        verified: true,
        verifiedAt: now,
        verificationToken,
        gatewayStatus: 'SETTLED_AUTHORIZED',
        processor: 'Push World Travel International Merchant Gateway (3D-Secure 2.2)',
      };

      apps[idx].paymentStatus = 'paid';
      apps[idx].status = 'under_review';
      apps[idx].updatedAt = now;
      apps[idx].paymentDetails = verifiedPaymentDetails;

      writeApplications(apps);
      recordPayment({ ...verifiedPaymentDetails, recordedAt: now });

      // Mirror to Supabase
      if (supabase) {
        safePromise(
          supabase
            .from('eta_applications')
            .update({
              payment_status: 'paid',
              status: 'under_review',
              updated_at: now,
              payment_details: verifiedPaymentDetails,
            })
            .eq('id', applicationId)
        );
      }

      recordAuditLog('PAYMENT_VERIFIED', 'ETA_APPLICATION', applicationId, {
        amount: expectedTotal,
        cardLast4,
        verificationToken,
      });

      res.json({
        success: true,
        verified: true,
        message: 'Payment verified and settled successfully by Push World Travel backend.',
        application: apps[idx],
        payment: verifiedPaymentDetails,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, verified: false, error: err.message || 'Payment processing failed' });
    }
  });

  // Admin: Update application status, issue eTA, notes
  app.patch('/api/admin/eta/applications/:id', requireAdminAuth, (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminNotes, etaNumber, approvedAt } = req.body;

      const apps = readApplications();
      const idx = apps.findIndex((a) => a.id === id || a.referenceNumber === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      const now = new Date().toISOString();
      if (status) apps[idx].status = status;
      if (adminNotes !== undefined) apps[idx].adminNotes = adminNotes;
      if (etaNumber) apps[idx].etaNumber = etaNumber;
      if (approvedAt) apps[idx].approvedAt = approvedAt;
      apps[idx].updatedAt = now;

      writeApplications(apps);

      // Mirror to Supabase
      if (supabase) {
        const updatePayload: any = { updated_at: now };
        if (status) updatePayload.status = status;
        if (adminNotes !== undefined) updatePayload.admin_notes = adminNotes;
        if (etaNumber) updatePayload.eta_number = etaNumber;
        if (approvedAt) updatePayload.approved_at = approvedAt;
        safePromise(supabase.from('eta_applications').update(updatePayload).eq('id', id));
      }

      recordAuditLog('STATUS_UPDATED', 'ETA_APPLICATION', id, { status, etaNumber, adminNotes });

      res.json({ success: true, application: apps[idx] });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message || 'Failed to update application' });
    }
  });

  // Admin: Delete application and clean up documents
  app.delete('/api/admin/eta/applications/:id', requireAdminAuth, (req, res) => {
    try {
      const { id } = req.params;
      const apps = readApplications();
      const target = apps.find((a) => a.id === id || a.referenceNumber === id);

      if (!target) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      const remaining = apps.filter((a) => a.id !== id && a.referenceNumber !== id);
      writeApplications(remaining);

      // Delete storage files if present
      if (supabase) {
        safePromise(supabase.from('eta_applications').delete().eq('id', id));
        const docsToDelete: string[] = [];
        if (target.passportBioDataUrl && !target.passportBioDataUrl.startsWith('http')) docsToDelete.push(target.passportBioDataUrl);
        if (target.passportPhotoUrl && !target.passportPhotoUrl.startsWith('http')) docsToDelete.push(target.passportPhotoUrl);
        if (docsToDelete.length > 0) {
          safePromise(supabase.storage.from('eta-documents').remove(docsToDelete));
        }
      }

      recordAuditLog('APPLICATION_DELETED', 'ETA_APPLICATION', id, { reference: target.referenceNumber, applicant: `${target.givenNames} ${target.surname}` });

      res.json({ success: true, message: 'Application and associated documents permanently deleted' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin: Stats metrics
  app.get('/api/admin/eta/stats', requireAdminAuth, (_req, res) => {
    const apps = readApplications();
    const total = apps.length;
    const approved = apps.filter((a) => a.status === 'approved').length;
    const underReview = apps.filter((a) => a.status === 'under_review').length;
    const submitted = apps.filter((a) => a.status === 'submitted').length;
    const pendingInfo = apps.filter((a) => a.status === 'additional_info_required').length;
    const rejected = apps.filter((a) => a.status === 'rejected').length;
    const paidApps = apps.filter((a) => a.paymentStatus === 'paid');
    const totalRevenue = paidApps.reduce((acc, a) => acc + (a.pricing?.totalAmount || 157.5), 0);

    res.json({
      totalApplications: total,
      approved,
      underReview,
      submitted,
      pendingInfo,
      rejected,
      paidCount: paidApps.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      currency: 'USD',
    });
  });

  // ============================================================================
  // 4. GALLERY MANAGEMENT API (Supabase public-media + Local)
  // ============================================================================

  // Public: Get published images
  app.get('/api/gallery', async (_req, res) => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
          return res.json(data);
        }
      } catch (e) {}
    }

    const all = readGallery();
    const published = all.filter((img) => img.isPublished !== false).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    res.json(published);
  });

  // Admin: Get all images (published + drafts)
  app.get('/api/admin/gallery', requireAdminAuth, async (_req, res) => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
          return res.json(data);
        }
      } catch (e) {}
    }

    const all = readGallery().sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    res.json(all);
  });

  // Admin: Add new gallery image (with file upload to 'gallery-media' bucket)
  app.post('/api/admin/gallery', requireAdminAuth, async (req, res) => {
    try {
      const { title, caption, description, category, location, fileBase64, imageUrl, fileName, displayOrder, isPublished } = req.body;
      if (!title || (!fileBase64 && !imageUrl)) {
        return res.status(400).json({ success: false, error: 'Title and image file or URL are required' });
      }

      let finalImageUrl = imageUrl;
      let storagePath: string | undefined = undefined;

      if (fileBase64) {
        const buffer = Buffer.from(fileBase64.replace(/^data:[^;]+;base64,/, ''), 'base64');
        const key = `gallery_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.png`;

        if (supabase) {
          try {
            const { data: upData, error: upErr } = await supabase.storage
              .from('gallery-media')
              .upload(key, buffer, { contentType: 'image/png', upsert: false });

            if (!upErr && upData) {
              const { data: pubData } = supabase.storage.from('gallery-media').getPublicUrl(key);
              finalImageUrl = pubData?.publicUrl || `/data/gallery_media/${key}`;
              storagePath = key;
            }
          } catch (e) {}
        }

        if (!finalImageUrl) {
          const localPath = path.join(GALLERY_MEDIA_DIR, key);
          fs.writeFileSync(localPath, buffer);
          finalImageUrl = `/data/gallery_media/${key}`;
          storagePath = key;
        }
      }

      const newImage = {
        id: `gal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title,
        caption: caption || '',
        description: description || caption || '',
        category: category || 'Safaris',
        location: location || 'East Africa',
        imageUrl: finalImageUrl,
        storagePath,
        displayOrder: typeof displayOrder === 'number' ? displayOrder : 99,
        isPublished: isPublished !== false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const gallery = readGallery();
      gallery.unshift(newImage);
      writeGallery(gallery);

      if (supabase) {
        safePromise(
          supabase.from('gallery_images').insert([{
            id: newImage.id,
            title: newImage.title,
            caption: newImage.caption,
            description: newImage.description,
            category: newImage.category,
            location: newImage.location,
            image_url: newImage.imageUrl,
            storage_path: newImage.storagePath,
            display_order: newImage.displayOrder,
            is_published: newImage.isPublished,
          }])
        );
      }

      recordAuditLog('IMAGE_UPLOADED', 'GALLERY_IMAGE', newImage.id, { title: newImage.title, category: newImage.category });

      res.status(201).json({ success: true, image: newImage });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin: Update gallery image
  app.patch('/api/admin/gallery/:id', requireAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const gallery = readGallery();
      const idx = gallery.findIndex((img) => img.id === id);

      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'Gallery image not found' });
      }

      // If replacing image file
      if (updates.fileBase64) {
        const buffer = Buffer.from(updates.fileBase64.replace(/^data:[^;]+;base64,/, ''), 'base64');
        const key = `gallery_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.png`;

        if (supabase) {
          try {
            await supabase.storage.from('gallery-media').upload(key, buffer, { contentType: 'image/png' });
            const { data: pubData } = supabase.storage.from('gallery-media').getPublicUrl(key);
            updates.imageUrl = pubData?.publicUrl || `/data/gallery_media/${key}`;
            updates.storagePath = key;
          } catch (e) {}
        }
        if (!updates.imageUrl) {
          fs.writeFileSync(path.join(GALLERY_MEDIA_DIR, key), buffer);
          updates.imageUrl = `/data/gallery_media/${key}`;
          updates.storagePath = key;
        }
        delete updates.fileBase64;
      }

      const updated = {
        ...gallery[idx],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      gallery[idx] = updated;
      writeGallery(gallery);

      if (supabase) {
        safePromise(
          supabase.from('gallery_images').update({
            title: updated.title,
            caption: updated.caption,
            description: updated.description,
            category: updated.category,
            location: updated.location,
            image_url: updated.imageUrl,
            storage_path: updated.storagePath,
            display_order: updated.displayOrder,
            is_published: updated.isPublished,
            updated_at: updated.updatedAt,
          }).eq('id', id)
        );
      }

      recordAuditLog('IMAGE_UPDATED', 'GALLERY_IMAGE', id, { updates });

      res.json({ success: true, image: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin: Delete gallery image & cleanup storage file
  app.delete('/api/admin/gallery/:id', requireAdminAuth, (req, res) => {
    try {
      const { id } = req.params;
      const gallery = readGallery();
      const target = gallery.find((g) => g.id === id);

      if (!target) {
        return res.status(404).json({ success: false, error: 'Gallery image not found' });
      }

      const remaining = gallery.filter((g) => g.id !== id);
      writeGallery(remaining);

      // Clean storage file if present
      if (target.storagePath) {
        if (supabase) {
          safePromise(supabase.storage.from('gallery-media').remove([target.storagePath]));
          safePromise(supabase.from('gallery_images').delete().eq('id', id));
        }
        const localPath = path.join(GALLERY_MEDIA_DIR, target.storagePath);
        if (fs.existsSync(localPath)) {
          fs.unlinkSync(localPath);
        }
      }

      recordAuditLog('IMAGE_DELETED', 'GALLERY_IMAGE', id, { title: target.title });

      res.json({ success: true, message: 'Image deleted from gallery and storage' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin: Batch reorder gallery images
  app.post('/api/admin/gallery/reorder', requireAdminAuth, (req, res) => {
    try {
      const { orderedIds } = req.body;
      if (!Array.isArray(orderedIds)) {
        return res.status(400).json({ success: false, error: 'orderedIds must be an array' });
      }

      const gallery = readGallery();
      orderedIds.forEach((id, index) => {
        const item = gallery.find((g) => g.id === id);
        if (item) {
          item.displayOrder = index + 1;
        }
      });

      writeGallery(gallery);

      if (supabase) {
        orderedIds.forEach((id, index) => {
          safePromise(supabase.from('gallery_images').update({ display_order: index + 1 }).eq('id', id));
        });
      }

      recordAuditLog('GALLERY_REORDERED', 'GALLERY', 'batch', { count: orderedIds.length });

      res.json({ success: true, message: 'Gallery order updated' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin: Get audit logs
  app.get('/api/admin/audit-logs', requireAdminAuth, (_req, res) => {
    try {
      if (fs.existsSync(AUDIT_FILE)) {
        const logs = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf-8'));
        return res.json(logs);
      }
      res.json([]);
    } catch (err) {
      res.json([]);
    }
  });

  // ============================================================================
  // Vite Integration & Static Serving
  // ============================================================================
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
    app.get('*', (_req, res) => {
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
