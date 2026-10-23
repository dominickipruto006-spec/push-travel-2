import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Search,
  Filter,
  Eye,
  EyeOff,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  User,
  CreditCard,
  Image as ImageIcon,
  Upload,
  Plus,
  ArrowUpDown,
  RefreshCw,
  X,
  ExternalLink,
  ChevronRight,
  Database,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Check,
  Edit2,
  ChevronDown,
} from 'lucide-react';
import { EtaApplication, EtaStatus } from '../../types/eta';
import { etaService } from '../../services/etaService';
import { GalleryImage, GalleryCategory, GALLERY_CATEGORIES, GalleryUploadPayload } from '../../types/gallery';
import { galleryService } from '../../services/galleryService';
import { adminAuthService, AdminUser } from '../../services/adminAuthService';

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(adminAuthService.getCurrentUser());
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Dashboard Section Tab
  const [activeTab, setActiveTab] = useState<'eta' | 'gallery' | 'system'>('eta');

  // ==========================================
  // eTA Applications State
  // ==========================================
  const [applications, setApplications] = useState<EtaApplication[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EtaStatus>('all');
  const [selectedApp, setSelectedApp] = useState<EtaApplication | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusUpdateNote, setStatusUpdateNote] = useState('');
  const [newEtaNumber, setNewEtaNumber] = useState('');
  const [deleteConfirmAppId, setDeleteConfirmAppId] = useState<string | null>(null);
  const [isDeletingApp, setIsDeletingApp] = useState(false);
  const [documentLoading, setDocumentLoading] = useState<string | null>(null);

  // Pagination for applications
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ==========================================
  // Gallery Management State
  // ==========================================
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deleteConfirmImageId, setDeleteConfirmImageId] = useState<string | null>(null);

  // Upload/Edit Form
  const [formTitle, setFormTitle] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<GalleryCategory>('Safaris');
  const [formLocation, setFormLocation] = useState('');
  const [formFileBase64, setFormFileBase64] = useState<string>('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDisplayOrder, setFormDisplayOrder] = useState<number>(1);
  const [formIsPublished, setFormIsPublished] = useState<boolean>(true);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [galleryMessage, setGalleryMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ==========================================
  // System / Supabase Status State
  // ==========================================
  const [supabaseStatus, setSupabaseStatus] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // ------------------------------------------
  // Data Fetching
  // ------------------------------------------
  const fetchApplications = useCallback(async () => {
    setLoadingApps(true);
    try {
      const data = await etaService.getAllApplications(currentUser?.token);
      setApplications(data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoadingApps(false);
    }
  }, [currentUser?.token]);

  const fetchGallery = useCallback(async () => {
    setLoadingGallery(true);
    try {
      const data = await galleryService.getAllImages(currentUser?.token);
      setGalleryImages(data);
    } catch (err) {
      console.error('Error fetching admin gallery:', err);
    } finally {
      setLoadingGallery(false);
    }
  }, [currentUser?.token]);

  const fetchSystemStatus = useCallback(async () => {
    try {
      const [statusRes, logsRes] = await Promise.all([
        fetch('/api/admin/supabase-status'),
        fetch('/api/admin/audit-logs', { headers: { Authorization: `Bearer ${currentUser?.token || ''}` } }),
      ]);
      if (statusRes.ok) setSupabaseStatus(await statusRes.json());
      if (logsRes.ok) setAuditLogs(await logsRes.json());
    } catch (e) {}
  }, [currentUser?.token]);

  useEffect(() => {
    if (currentUser) {
      fetchApplications();
      fetchGallery();
      fetchSystemStatus();
    }
  }, [currentUser, fetchApplications, fetchGallery, fetchSystemStatus]);

  // ------------------------------------------
  // Authentication Handlers
  // ------------------------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const res = await adminAuthService.login(loginEmail, loginPassword, true);
      if (res.success && res.user) {
        setCurrentUser(res.user);
      } else {
        setLoginError(res.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    adminAuthService.logout();
    setCurrentUser(null);
  };

  // ------------------------------------------
  // eTA Actions
  // ------------------------------------------
  const handleUpdateStatus = async (status: EtaStatus) => {
    if (!selectedApp) return;
    setIsUpdatingStatus(true);
    try {
      const res = await etaService.updateApplicationStatus(
        selectedApp.id,
        status,
        statusUpdateNote || selectedApp.adminNotes,
        status === 'approved' ? (newEtaNumber || selectedApp.etaNumber || `ETA-KE-2026-${Math.floor(10000000 + Math.random() * 90000000)}`) : undefined,
        status === 'approved' ? new Date().toISOString() : undefined,
        currentUser?.token
      );

      if (res.success && res.application) {
        setSelectedApp(res.application);
        setApplications((prev) => prev.map((a) => (a.id === selectedApp.id ? res.application! : a)));
        setStatusUpdateNote('');
        setNewEtaNumber('');
        alert(`Application ${selectedApp.referenceNumber} status updated to: ${status.toUpperCase()}`);
      }
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    setIsDeletingApp(true);
    try {
      const res = await etaService.deleteApplication(id, currentUser?.token);
      if (res.success) {
        setApplications((prev) => prev.filter((a) => a.id !== id && a.referenceNumber !== id));
        if (selectedApp?.id === id) setSelectedApp(null);
        setDeleteConfirmAppId(null);
        alert('Application record and documents deleted successfully');
      }
    } catch (err) {
      alert('Failed to delete application');
    } finally {
      setIsDeletingApp(false);
    }
  };

  const handleViewSecureDocument = async (storagePath: string) => {
    setDocumentLoading(storagePath);
    try {
      const res = await etaService.getSecureDocumentUrl(storagePath, currentUser?.token);
      if (res.success && res.signedUrl) {
        window.open(res.signedUrl, '_blank', 'noopener,noreferrer');
      } else {
        alert(res.error || 'Could not generate signed download link for this document.');
      }
    } catch (e: any) {
      alert('Error fetching secure document: ' + e.message);
    } finally {
      setDocumentLoading(null);
    }
  };

  // ------------------------------------------
  // Gallery Actions
  // ------------------------------------------
  const handleOpenUploadModal = (img?: GalleryImage) => {
    if (img) {
      setEditingImage(img);
      setFormTitle(img.title);
      setFormCaption(img.caption || '');
      setFormDescription(img.description || '');
      setFormCategory(img.category);
      setFormLocation(img.location || '');
      setFormFileBase64('');
      setFormImageUrl(img.imageUrl);
      setFormDisplayOrder(img.displayOrder || 1);
      setFormIsPublished(img.isPublished !== false);
    } else {
      setEditingImage(null);
      setFormTitle('');
      setFormCaption('');
      setFormDescription('');
      setFormCategory('Safaris');
      setFormLocation('Kenya');
      setFormFileBase64('');
      setFormImageUrl('');
      setFormDisplayOrder(galleryImages.length + 1);
      setFormIsPublished(true);
    }
    setIsUploadModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormFileBase64(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please enter an image title');
      return;
    }
    if (!formFileBase64 && !formImageUrl) {
      alert('Please upload an image file or provide an image URL');
      return;
    }

    setIsSavingImage(true);
    setGalleryMessage(null);

    try {
      if (editingImage) {
        const res = await galleryService.updateImage(
          editingImage.id,
          {
            title: formTitle,
            caption: formCaption,
            description: formDescription,
            category: formCategory,
            location: formLocation,
            displayOrder: Number(formDisplayOrder),
            isPublished: formIsPublished,
            fileBase64: formFileBase64 || undefined,
            imageUrl: formImageUrl || undefined,
          },
          currentUser?.token
        );
        if (res.success && res.image) {
          setGalleryImages((prev) => prev.map((img) => (img.id === editingImage.id ? res.image! : img)));
          setIsUploadModalOpen(false);
          setGalleryMessage({ type: 'success', text: `Image "${formTitle}" updated successfully.` });
        } else {
          setGalleryMessage({ type: 'error', text: res.error || 'Failed to update image' });
        }
      } else {
        const payload: GalleryUploadPayload = {
          title: formTitle,
          caption: formCaption,
          description: formDescription,
          category: formCategory,
          location: formLocation,
          fileBase64: formFileBase64 || undefined,
          imageUrl: formImageUrl || undefined,
          displayOrder: Number(formDisplayOrder),
          isPublished: formIsPublished,
        };
        const res = await galleryService.createImage(payload, currentUser?.token);
        if (res.success && res.image) {
          setGalleryImages((prev) => [res.image!, ...prev]);
          setIsUploadModalOpen(false);
          setGalleryMessage({ type: 'success', text: `New image "${formTitle}" published to gallery.` });
        } else {
          setGalleryMessage({ type: 'error', text: res.error || 'Failed to publish image' });
        }
      }
    } catch (err: any) {
      setGalleryMessage({ type: 'error', text: err.message || 'Error saving image' });
    } finally {
      setIsSavingImage(false);
    }
  };

  const handleTogglePublish = async (img: GalleryImage) => {
    try {
      const res = await galleryService.togglePublish(img.id, !img.isPublished, currentUser?.token);
      if (res.success && res.image) {
        setGalleryImages((prev) => prev.map((i) => (i.id === img.id ? res.image! : i)));
      }
    } catch (err) {
      alert('Failed to toggle publish status');
    }
  };

  const handleDeleteGalleryImage = async (id: string) => {
    try {
      const res = await galleryService.deleteImage(id, currentUser?.token);
      if (res.success) {
        setGalleryImages((prev) => prev.filter((i) => i.id !== id));
        setDeleteConfirmImageId(null);
        setGalleryMessage({ type: 'success', text: 'Image deleted from gallery and storage.' });
      }
    } catch (err) {
      alert('Failed to delete image');
    }
  };

  // ==========================================
  // Render: Login Screen if Unauthenticated
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in">
          {/* Header */}
          <div className="bg-[#0a2265] text-white p-6 text-center relative">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-7 h-7 text-amber-300" />
            </div>
            <h1 className="text-xl font-bold font-['Outfit',sans-serif]">
              Push World Travel Portal
            </h1>
            <p className="text-xs text-white/75 mt-1">
              Immigration &amp; Website Administration Dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
            {loginError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span className="font-medium">{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Administrator Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter authorized administrator email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-50 focus:bg-white border-2 border-slate-300 focus:border-[#0a2265] text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-[#0a2265]/15 transition-all shadow-xs"
                  required
                  autoComplete="email"
                />
                <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-100 hover:bg-slate-50 focus:bg-white border-2 border-slate-300 focus:border-[#0a2265] text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-[#0a2265]/15 transition-all shadow-xs"
                  required
                  autoComplete="current-password"
                />
                <Lock className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-[#0a2265] rounded-lg transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#0a2265] shrink-0" />
              <span>Restricted authorized staff portal. All administrative access is logged and audited.</span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 bg-[#0a2265] hover:bg-[#07194a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In to Admin Portal</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onNavigateHome}
                className="text-xs text-slate-600 hover:text-[#0a2265] font-semibold cursor-pointer transition-colors"
              >
                ← Return to Push World Travel Website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesStatus;
    const matchesQuery =
      (app.referenceNumber && app.referenceNumber.toLowerCase().includes(q)) ||
      (app.surname && app.surname.toLowerCase().includes(q)) ||
      (app.givenNames && app.givenNames.toLowerCase().includes(q)) ||
      (app.passportNumber && app.passportNumber.toLowerCase().includes(q)) ||
      (app.nationality && app.nationality.toLowerCase().includes(q)) ||
      (app.email && app.email.toLowerCase().includes(q));
    return matchesStatus && matchesQuery;
  });

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage) || 1;
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Application Stats
  const statTotal = applications.length;
  const statPending = applications.filter((a) => a.status === 'submitted').length;
  const statReview = applications.filter((a) => a.status === 'under_review').length;
  const statApproved = applications.filter((a) => a.status === 'approved').length;
  const statPaidCount = applications.filter((a) => a.paymentStatus === 'paid').length;
  const statTotalRevenue = statPaidCount * 157.5;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Admin Bar */}
      <header className="bg-[#0a2265] text-white border-b border-blue-950 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-wide font-['Outfit',sans-serif] block">
                Push World Travel · Admin Dashboard
              </span>
              <span className="text-[10px] text-white/70 block">
                Thome, Northern Bypass, Nairobi · Dispatch Desk
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Supabase status badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/10">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>{supabaseStatus?.configured ? 'Supabase Connected' : 'Local Persistence (Dual-Mode)'}</span>
            </div>

            <a
              href="/push-world-travel-dist.zip"
              download="push-world-travel-dist.zip"
              className="hidden md:flex items-center gap-1 text-xs bg-amber-400 hover:bg-amber-300 text-slate-900 px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer shadow-xs"
              title="Download HostAfrica production build ZIP"
            >
              <Download className="w-3.5 h-3.5" />
              <span>HostAfrica ZIP</span>
            </a>

            <button
              onClick={onNavigateHome}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Public Website
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#07194a] px-4 sm:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('eta')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'eta'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-white/75 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>1. eTA Applications ({applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'gallery'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-white/75 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>2. Gallery Management ({galleryImages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('system')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'system'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-white/75 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>3. Supabase &amp; Audit Logs</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* ========================================================================= */}
        {/* TAB 1: eTA APPLICATIONS MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'eta' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Submissions
                </span>
                <span className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  {statTotal}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">All time records</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/30 shadow-2xs">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                  Pending Review
                </span>
                <span className="text-2xl font-black text-amber-800 font-['Outfit',sans-serif]">
                  {statPending}
                </span>
                <span className="text-[11px] text-amber-600 block mt-0.5">Awaiting inspection</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/30 shadow-2xs">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                  In Progress
                </span>
                <span className="text-2xl font-black text-[#0a2265] font-['Outfit',sans-serif]">
                  {statReview}
                </span>
                <span className="text-[11px] text-blue-600 block mt-0.5">Queued with immigration</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-2xs">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                  eTA Issued / Approved
                </span>
                <span className="text-2xl font-black text-emerald-800 font-['Outfit',sans-serif]">
                  {statApproved}
                </span>
                <span className="text-[11px] text-emerald-600 block mt-0.5">Completed entries</span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Revenue
                </span>
                <span className="text-2xl font-black text-emerald-700 font-['Outfit',sans-serif]">
                  ${statTotalRevenue.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">{statPaidCount} paid @ $157.50</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 w-full sm:max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by reference, surname, passport, email..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0a2265]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as any);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#0a2265] w-full sm:w-auto"
                >
                  <option value="all">All Statuses</option>
                  <option value="submitted">Submitted / Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="additional_info_required">Awaiting Information</option>
                  <option value="approved">Approved / Completed</option>
                  <option value="rejected">Rejected</option>
                </select>

                <button
                  onClick={fetchApplications}
                  className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Refresh Table"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-4 py-3">Reference</th>
                      <th className="px-4 py-3">Applicant Name</th>
                      <th className="px-4 py-3">Nationality &amp; Passport</th>
                      <th className="px-4 py-3">Arrival Date</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Payment</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingApps ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                          <div className="w-6 h-6 border-2 border-[#0a2265] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                          <span>Loading applications from database...</span>
                        </td>
                      </tr>
                    ) : paginatedApps.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                          No applications match the search filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedApps.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3 font-mono font-bold text-[#0a2265]">
                            {app.referenceNumber}
                            <span className="block text-[10px] text-slate-400 font-sans">
                              {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '—'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-slate-900 block">
                              {app.givenNames} {app.surname}
                            </span>
                            <span className="text-[11px] text-slate-500">{app.email}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-semibold text-slate-700 block">{app.nationality}</span>
                            <span className="font-mono text-[11px] text-slate-500">{app.passportNumber}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-700">
                            {app.arrivalDate || '—'}
                            <span className="block text-[10px] text-slate-400">{app.airline} {app.flightNumber}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] inline-flex items-center gap-1 ${
                                app.status === 'approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : app.status === 'under_review'
                                  ? 'bg-blue-100 text-[#0a2265]'
                                  : app.status === 'additional_info_required'
                                  ? 'bg-amber-100 text-amber-800'
                                  : app.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {app.status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                              {app.status === 'under_review' && <Clock className="w-3 h-3" />}
                              <span>{app.status.replace('_', ' ')}</span>
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                app.paymentStatus === 'paid'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {app.paymentStatus === 'paid' ? '$157.50 Paid' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedApp(app)}
                                className="p-1.5 bg-[#0a2265]/10 hover:bg-[#0a2265] text-[#0a2265] hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="View & Review Application"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmAppId(app.id)}
                                className="p-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Bar */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>
                  Showing {paginatedApps.length} of {filteredApps.length} applications
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="px-2.5 py-1 rounded bg-white border border-slate-200 disabled:opacity-40 cursor-pointer"
                  >
                    Previous
                  </button>
                  <span className="font-bold text-slate-800">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="px-2.5 py-1 rounded bg-white border border-slate-200 disabled:opacity-40 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Application Detail Modal / Drawer */}
            {selectedApp && (
              <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
                  {/* Modal Header */}
                  <div className="bg-[#0a2265] text-white p-5 flex items-center justify-between sticky top-0 z-10">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                        Immigration Officer Audit View
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif]">
                        {selectedApp.givenNames} {selectedApp.surname} · {selectedApp.referenceNumber}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedApp(null)}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-6 text-xs sm:text-sm">
                    {/* Status & Action Bar */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-500 block">Current Status:</span>
                        <span className="text-sm font-black text-[#0a2265] uppercase">
                          {selectedApp.status.replace('_', ' ')}
                        </span>
                        {selectedApp.etaNumber && (
                          <span className="block text-xs font-mono font-bold text-emerald-700 mt-0.5">
                            eTA No: {selectedApp.etaNumber}
                          </span>
                        )}
                      </div>

                      {/* Status Change Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          disabled={isUpdatingStatus}
                          onClick={() => handleUpdateStatus('under_review')}
                          className="px-3 py-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-[#0a2265] font-bold text-xs cursor-pointer"
                        >
                          Mark Under Review
                        </button>
                        <button
                          disabled={isUpdatingStatus}
                          onClick={() => handleUpdateStatus('additional_info_required')}
                          className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs cursor-pointer"
                        >
                          Request Info
                        </button>
                        <button
                          disabled={isUpdatingStatus}
                          onClick={() => handleUpdateStatus('approved')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                        >
                          Approve &amp; Issue eTA
                        </button>
                        <button
                          disabled={isUpdatingStatus}
                          onClick={() => handleUpdateStatus('rejected')}
                          className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </div>

                    {/* Biodata & Passport Grid */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b pb-1">
                        1. Applicant Biodata &amp; Passport Details
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl">
                        <div>
                          <span className="text-slate-400 text-[11px] block">Full Name:</span>
                          <strong className="text-slate-800">{selectedApp.givenNames} {selectedApp.surname}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block">Nationality:</span>
                          <strong className="text-slate-800">{selectedApp.nationality}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block">Passport Number:</span>
                          <strong className="text-slate-800 font-mono">{selectedApp.passportNumber}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block">Passport Expiry:</span>
                          <strong className="text-slate-800">{selectedApp.passportExpiryDate}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block">Email:</span>
                          <strong className="text-slate-800">{selectedApp.email}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block">Phone / WhatsApp:</span>
                          <strong className="text-slate-800">{selectedApp.phone}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Travel & Accommodation */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b pb-1">
                        2. Kenya Travel &amp; Accommodation
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl">
                        <div>
                          <span className="text-slate-400 text-[11px] block">Purpose:</span>
                          <strong className="text-slate-800">{selectedApp.purposeOfVisit}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block">Arrival Date:</span>
                          <strong className="text-slate-800">{selectedApp.arrivalDate}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block">Port of Entry:</span>
                          <strong className="text-slate-800">{selectedApp.portOfEntry}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block">Flight:</span>
                          <strong className="text-slate-800">{selectedApp.airline} {selectedApp.flightNumber}</strong>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 text-[11px] block">Accommodation / Lodge:</span>
                          <strong className="text-slate-800">{selectedApp.accommodationName}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Secure Private Documents with Short-Lived Signed URLs */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b pb-1 flex items-center justify-between">
                        <span>3. Secure Private Travel Documents (Supabase Storage: eta-documents)</span>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          Protected RLS
                        </span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Doc 1: Passport Biodata */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#0a2265]" />
                            <div>
                              <span className="font-bold text-slate-900 block">Passport Bio-data Page</span>
                              <span className="text-[10px] text-slate-400">Restricted storage object</span>
                            </div>
                          </div>
                          {selectedApp.passportBioDataUrl ? (
                            <button
                              onClick={() => handleViewSecureDocument(selectedApp.passportBioDataUrl)}
                              disabled={documentLoading === selectedApp.passportBioDataUrl}
                              className="px-3 py-1.5 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              {documentLoading === selectedApp.passportBioDataUrl ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Download className="w-3.5 h-3.5" />
                              )}
                              <span>Download / View</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400">Not uploaded</span>
                          )}
                        </div>

                        {/* Doc 2: Passport Photo */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-[#ea580c]" />
                            <div>
                              <span className="font-bold text-slate-900 block">Recent Passport Photo</span>
                              <span className="text-[10px] text-slate-400">Biometric selfie scan</span>
                            </div>
                          </div>
                          {selectedApp.passportPhotoUrl ? (
                            <button
                              onClick={() => handleViewSecureDocument(selectedApp.passportPhotoUrl)}
                              disabled={documentLoading === selectedApp.passportPhotoUrl}
                              className="px-3 py-1.5 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              {documentLoading === selectedApp.passportPhotoUrl ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Download className="w-3.5 h-3.5" />
                              )}
                              <span>Download / View</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400">Not uploaded</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Internal Notes */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b pb-1">
                        4. Internal Immigration Desk Notes
                      </h4>
                      <div className="space-y-2">
                        <textarea
                          rows={3}
                          value={statusUpdateNote || selectedApp.adminNotes || ''}
                          onChange={(e) => setStatusUpdateNote(e.target.value)}
                          placeholder="Add internal notes on verification, passport validity checks, AMREF policy numbers..."
                          className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                        />
                        <button
                          onClick={() => handleUpdateStatus(selectedApp.status)}
                          className="px-4 py-2 bg-slate-800 hover:bg-black text-white text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Save Internal Notes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmAppId && (
              <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-slate-900 text-base">Permanently Delete Application?</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      This will remove the application and permanently delete all associated passport documents from storage.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeleteConfirmAppId(null)}
                      className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isDeletingApp}
                      onClick={() => handleDeleteApplication(deleteConfirmAppId)}
                      className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
                    >
                      {isDeletingApp ? 'Deleting...' : 'Yes, Delete'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: GALLERY MANAGEMENT (Add, Edit, Reorder, Publish, Delete) */}
        {/* ========================================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Gallery Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#0a2265] font-['Outfit',sans-serif]">
                  Website Gallery Management
                </h2>
                <p className="text-xs text-slate-500">
                  Manage public photo albums, upload high-resolution images, and publish without code deployment.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenUploadModal()}
                  className="px-4 py-2 bg-[#0a2265] hover:bg-[#07194a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Upload New Image</span>
                </button>
                <button
                  onClick={fetchGallery}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                  title="Refresh Gallery"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notification message */}
            {galleryMessage && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                  galleryMessage.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                <span>{galleryMessage.text}</span>
                <button onClick={() => setGalleryMessage(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 p-1.5 rounded-xl">
              {['All', ...GALLERY_CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    galleryCategoryFilter === cat
                      ? 'bg-white text-[#0a2265] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages
                .filter((img) => galleryCategoryFilter === 'All' || img.category === galleryCategoryFilter)
                .map((img) => (
                  <div
                    key={img.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                  >
                    <div>
                      {/* Thumbnail with Publish Badge */}
                      <div className="relative h-44 bg-slate-900 overflow-hidden">
                        <img
                          src={img.imageUrl}
                          alt={img.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              img.isPublished
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {img.isPublished ? 'Published' : 'Draft / Hidden'}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2 bg-black/60 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                          #{img.displayOrder || 1}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-3.5 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea580c] block">
                          {img.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                          {img.title}
                        </h4>
                        {img.caption && (
                          <p className="text-[11px] text-slate-500 line-clamp-2">{img.caption}</p>
                        )}
                        {img.location && (
                          <span className="text-[10px] text-slate-400 block mt-1">📍 {img.location}</span>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleTogglePublish(img)}
                        className={`text-[11px] font-bold hover:underline cursor-pointer ${
                          img.isPublished ? 'text-amber-700' : 'text-emerald-700'
                        }`}
                      >
                        {img.isPublished ? 'Unpublish' : 'Publish'}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenUploadModal(img)}
                          className="p-1.5 rounded-lg bg-slate-200 hover:bg-[#0a2265] text-slate-700 hover:text-white transition-colors cursor-pointer"
                          title="Edit Image Details or Replace"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmImageId(img.id)}
                          className="p-1.5 rounded-lg bg-red-100 hover:bg-red-600 text-red-600 hover:text-white transition-colors cursor-pointer"
                          title="Delete Image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Upload / Edit Modal */}
            {isUploadModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 animate-in fade-in">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto border border-slate-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                    <h3 className="font-bold text-base text-[#0a2265] font-['Outfit',sans-serif]">
                      {editingImage ? 'Edit Gallery Image' : 'Upload Image to Public Gallery'}
                    </h3>
                    <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveGalleryImage} className="space-y-4 text-xs sm:text-sm">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Image Title *
                      </label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. Mara River Wildebeest Crossing"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0a2265] focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Category *
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-[#0a2265]"
                        >
                          {GALLERY_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          placeholder="e.g. Maasai Mara, Kenya"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0a2265]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Caption / Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={formCaption}
                        onChange={(e) => setFormCaption(e.target.value)}
                        placeholder="Describe the wildlife, beach resort, or landscape scene..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0a2265]"
                      />
                    </div>

                    {/* File Upload or Image URL */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Image File (Upload or Paste URL)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-[#0a2265] hover:file:bg-blue-100 cursor-pointer"
                      />
                      <div className="mt-2 text-center text-slate-400 text-[11px]">— OR —</div>
                      <input
                        type="url"
                        value={formImageUrl}
                        onChange={(e) => setFormImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/... or hosted URL"
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>

                    {/* Instant Preview */}
                    {(formFileBase64 || formImageUrl) && (
                      <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                          Preview:
                        </span>
                        <img
                          src={formFileBase64 || formImageUrl}
                          alt="Preview"
                          className="w-full h-36 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 items-center">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Display Order
                        </label>
                        <input
                          type="number"
                          value={formDisplayOrder}
                          onChange={(e) => setFormDisplayOrder(parseInt(e.target.value, 10) || 1)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                        />
                      </div>

                      <div className="pt-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formIsPublished}
                            onChange={(e) => setFormIsPublished(e.target.checked)}
                            className="w-4 h-4 text-[#0a2265] rounded"
                          />
                          <span className="text-xs font-bold text-slate-700">
                            Publish immediately to website
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsUploadModalOpen(false)}
                        className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingImage}
                        className="flex-1 py-2.5 rounded-xl bg-[#0a2265] hover:bg-[#07194a] text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm"
                      >
                        {isSavingImage ? 'Saving...' : editingImage ? 'Save Changes' : 'Publish Image'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Gallery Delete Modal */}
            {deleteConfirmImageId && (
              <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-slate-900 text-base">Permanently Delete Image?</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      This image will be removed from the public website gallery and deleted from storage.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeleteConfirmImageId(null)}
                      className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteGalleryImage(deleteConfirmImageId)}
                      className="flex-1 py-2 rounded-xl bg-red-600 text-white font-bold text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SYSTEM STATUS, SUPABASE & AUDIT LOGS */}
        {/* ========================================================================= */}
        {activeTab === 'system' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Supabase Status Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-['Outfit',sans-serif]">
                      Supabase Cloud Database &amp; Storage Architecture
                    </h3>
                    <p className="text-xs text-slate-500">
                      Private document vault: <code className="font-mono text-slate-800 font-bold">eta-documents</code> · Public photo album: <code className="font-mono text-slate-800 font-bold">gallery-media</code>
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    supabaseStatus?.configured ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-[#0a2265]'
                  }`}
                >
                  {supabaseStatus?.configured ? 'Configured & Active' : 'Dual-Mode Active'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Target Database</span>
                  <strong className="text-slate-800 text-sm">PostgreSQL / Supabase</strong>
                  <span className="text-[11px] text-slate-500 block mt-1">Table: <code className="font-mono">eta_applications</code></span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Document Security</span>
                  <strong className="text-slate-800 text-sm">Row Level Security (RLS)</strong>
                  <span className="text-[11px] text-slate-500 block mt-1">15-minute signed URL tokens</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Kenyan Compliance</span>
                  <strong className="text-slate-800 text-sm">Data Protection Act 2019</strong>
                  <span className="text-[11px] text-slate-500 block mt-1">Audit trail &amp; deletion enforcement</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 block">
                  To connect your personal Supabase project directly:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  1. Run the prepared migration file located at <code className="bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">supabase/migrations/20261022_push_world_schema.sql</code> in your Supabase SQL Editor.
                  <br />
                  2. Add <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">SUPABASE_URL</code> and <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">SUPABASE_SERVICE_ROLE_KEY</code> to your environment secrets.
                </p>
              </div>
            </div>

            {/* Audit Log Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-['Outfit',sans-serif]">
                    Administrative Action Audit Log
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Real-time immutable log of document views, status updates, image publishing, and deletions.
                  </p>
                </div>
                <button onClick={fetchSystemStatus} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto max-h-80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-500 font-bold uppercase text-[10px] sticky top-0">
                    <tr>
                      <th className="px-4 py-2.5">Timestamp</th>
                      <th className="px-4 py-2.5">Action</th>
                      <th className="px-4 py-2.5">Target</th>
                      <th className="px-4 py-2.5">Actor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {auditLogs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-slate-400">
                          No audit log events recorded yet.
                        </td>
                      </tr>
                    ) : (
                      auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50">
                          <td className="px-4 py-2.5 font-mono text-[11px] text-slate-500">
                            {new Date(log.createdAt).toLocaleString()}
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-mono text-[10px]">
                              {log.action}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 font-mono text-[11px] text-slate-600">
                            {log.targetType}: {log.targetId}
                          </td>
                          <td className="px-4 py-2.5 text-slate-500">{log.actor}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
