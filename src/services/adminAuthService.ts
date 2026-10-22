export interface AdminUser {
  email: string;
  name: string;
  role: 'super_admin' | 'immigration_officer' | 'gallery_manager';
  token: string;
}

const ADMIN_TOKEN_KEY = 'push_world_admin_session_token';
const ADMIN_USER_KEY = 'push_world_admin_user_data';

export const adminAuthService = {
  getToken(): string | null {
    try {
      return sessionStorage.getItem(ADMIN_TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  getCurrentUser(): AdminUser | null {
    try {
      const raw = sessionStorage.getItem(ADMIN_USER_KEY) || localStorage.getItem(ADMIN_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  async login(email: string, password: string, remember: boolean = false): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Invalid administrator credentials' };
      }

      const user: AdminUser = {
        email: data.user.email,
        name: data.user.name || 'Push World Admin',
        role: data.user.role || 'super_admin',
        token: data.token,
      };

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(ADMIN_TOKEN_KEY, user.token);
      storage.setItem(ADMIN_USER_KEY, JSON.stringify(user));

      return { success: true, user };
    } catch (err: any) {
      return { success: false, error: err.message || 'Authentication server unreachable' };
    }
  },

  logout(): void {
    try {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      sessionStorage.removeItem(ADMIN_USER_KEY);
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_USER_KEY);
    } catch (err) {
      console.warn('Error during logout:', err);
    }
  },

  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  },
};
