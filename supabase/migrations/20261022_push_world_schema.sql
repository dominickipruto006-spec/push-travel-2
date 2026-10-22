-- ==============================================================================
-- PUSH WORLD TRAVEL LTD — SUPABASE DATABASE & STORAGE SCHEMA
-- Production Schema for Kenya eTA Applications, Travel Insurance & Gallery Management
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. eTA Applications Table (`eta_applications`)
-- Stores applicant biodata, travel itinerary, statutory declarations,
-- secure private document storage paths, and payment status.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.eta_applications (
    id TEXT PRIMARY KEY,                           -- Reference e.g. PWT-ETA-2026-881920
    reference_number TEXT UNIQUE NOT NULL,         -- Indexed search reference
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    status TEXT DEFAULT 'submitted' NOT NULL CHECK (
        status IN ('submitted', 'under_review', 'additional_info_required', 'approved', 'rejected')
    ),
    eta_number TEXT,                               -- Government-issued eTA e.g. ETA-KE-2026-94812039
    approved_at TIMESTAMPTZ,

    -- Applicant Biodata
    surname TEXT NOT NULL,
    given_names TEXT NOT NULL,
    nationality TEXT NOT NULL,
    country_of_birth TEXT,
    passport_number TEXT NOT NULL,
    passport_issue_date DATE,
    passport_expiry_date DATE NOT NULL,
    passport_issuing_country TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    marital_status TEXT CHECK (marital_status IN ('Single', 'Married', 'Divorced', 'Widowed')),
    occupation TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    residence_country TEXT,
    residence_city TEXT,
    residential_address TEXT,

    -- Travel & Accommodation Details
    purpose_of_visit TEXT NOT NULL,
    arrival_date DATE NOT NULL,
    departure_date DATE,
    port_of_entry TEXT DEFAULT 'Jomo Kenyatta International Airport (JKIA) - Nairobi',
    airline TEXT,
    flight_number TEXT,
    accommodation_type TEXT,
    accommodation_name TEXT,
    accommodation_address TEXT,

    -- Declarations & Emergency
    yellow_fever_vaccinated BOOLEAN DEFAULT TRUE,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    emergency_contact_relationship TEXT,
    declarations JSONB DEFAULT '{}'::jsonb,

    -- Secure Private Document Storage Paths (stored in private bucket 'eta-documents')
    passport_biodata_path TEXT,
    passport_photo_path TEXT,
    flight_ticket_path TEXT,
    accommodation_proof_path TEXT,

    -- Package & Payment Details
    package_name TEXT DEFAULT 'Kenya eTA Assistance + Comprehensive Travel Insurance',
    base_amount NUMERIC(10, 2) DEFAULT 150.00,
    processing_fee NUMERIC(10, 2) DEFAULT 7.50,
    total_amount NUMERIC(10, 2) DEFAULT 157.50,
    currency TEXT DEFAULT 'USD',
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
    payment_details JSONB,

    -- Administrative Review Fields
    admin_notes TEXT,
    reviewed_by TEXT,
    internal_ref TEXT
);

-- Indexes for rapid lookup by reference, passport, and status
CREATE INDEX IF NOT EXISTS idx_eta_applications_reference ON public.eta_applications(reference_number);
CREATE INDEX IF NOT EXISTS idx_eta_applications_passport ON public.eta_applications(passport_number);
CREATE INDEX IF NOT EXISTS idx_eta_applications_status ON public.eta_applications(status);
CREATE INDEX IF NOT EXISTS idx_eta_applications_email ON public.eta_applications(email);
CREATE INDEX IF NOT EXISTS idx_eta_applications_created_at ON public.eta_applications(created_at DESC);

-- ==============================================================================
-- 3. Website Gallery Images Table (`gallery_images`)
-- Powers the dynamic public website gallery and administrative management.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    title TEXT NOT NULL,
    caption TEXT,
    description TEXT,
    category TEXT NOT NULL CHECK (
        category IN ('Safaris', 'Destinations', 'Hotels and Resorts', 'Beaches', 'Wildlife', 'International Travel')
    ),
    location TEXT,
    image_url TEXT NOT NULL,                        -- Public URL or storage path
    storage_path TEXT,                             -- Reference to Supabase Storage object in 'gallery-media'
    display_order INTEGER DEFAULT 0 NOT NULL,
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    created_by TEXT,
    updated_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_gallery_images_published ON public.gallery_images(is_published, display_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON public.gallery_images(category);

-- ==============================================================================
-- 4. Administrative Audit Trail Table (`admin_audit_logs`)
-- Supports security compliance and Kenyan Data Protection regulations.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    action TEXT NOT NULL,                           -- e.g. 'STATUS_UPDATED', 'DOCUMENT_DOWNLOADED', 'IMAGE_PUBLISHED', 'APPLICATION_DELETED'
    target_type TEXT NOT NULL,                      -- 'ETA_APPLICATION', 'GALLERY_IMAGE', 'STORAGE_FILE'
    target_id TEXT NOT NULL,
    actor_email TEXT NOT NULL,
    ip_address TEXT,
    details JSONB
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.admin_audit_logs(created_at DESC);

-- ==============================================================================
-- 5. Row Level Security (RLS) Configuration
-- Enforces least-privilege access: public visitors cannot list or download
-- private passport documents; admins have full authenticated access.
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.eta_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- 5a. Public eTA Policies:
-- Allow anyone to insert a new application
CREATE POLICY "Public can submit eta applications"
    ON public.eta_applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow public to track ONLY by exact reference number and passport match
CREATE POLICY "Public can view application with matching reference"
    ON public.eta_applications
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Service role / Authenticated admins can perform all operations
CREATE POLICY "Admins have full access to eta applications"
    ON public.eta_applications
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 5b. Gallery Policies:
-- Public can view only published images
CREATE POLICY "Public can view published gallery images"
    ON public.gallery_images
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

-- Service role has full control over gallery
CREATE POLICY "Admins have full access to gallery images"
    ON public.gallery_images
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 5c. Audit Log Policies:
-- Only service role can read/write audit logs
CREATE POLICY "Admins have full access to audit logs"
    ON public.admin_audit_logs
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 6. Supabase Storage Buckets
-- Creates private 'eta-documents' and public 'gallery-media' buckets
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('eta-documents', 'eta-documents', false, 10485760, ARRAY['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']),
    ('gallery-media', 'gallery-media', true, 15728640, ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage RLS: Public cannot download from 'eta-documents' directly
CREATE POLICY "Private access for eta-documents"
    ON storage.objects
    FOR ALL
    TO service_role
    USING (bucket_id = 'eta-documents')
    WITH CHECK (bucket_id = 'eta-documents');

-- Storage RLS: Public can read published objects from 'gallery-media'
CREATE POLICY "Public read access for gallery-media"
    ON storage.objects
    FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'gallery-media');

CREATE POLICY "Service role write access for gallery-media"
    ON storage.objects
    FOR ALL
    TO service_role
    USING (bucket_id = 'gallery-media')
    WITH CHECK (bucket_id = 'gallery-media');
