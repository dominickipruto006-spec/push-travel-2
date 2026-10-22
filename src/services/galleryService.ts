import { GalleryImage, GalleryUploadPayload } from '../types/gallery';
import { INITIAL_GALLERY_ITEMS } from '../data/travelData';

// Map existing travelData INITIAL_GALLERY_ITEMS to standard GalleryImage objects
export const INITIAL_DEFAULT_GALLERY_IMAGES: GalleryImage[] = INITIAL_GALLERY_ITEMS.map((item, index) => {
  let category: any = 'Safaris';
  if (item.category === 'Wildlife & Safaris') category = 'Wildlife';
  else if (item.category === 'Beaches & Coast') category = 'Beaches';
  else if (item.category === 'Hotels & Resorts') category = 'Hotels and Resorts';
  else if (item.category === 'Landscapes') category = 'Destinations';
  else if (item.category === 'International') category = 'International Travel';

  return {
    id: item.id,
    title: item.title,
    caption: item.caption,
    description: item.caption,
    category,
    location: item.location,
    imageUrl: item.imageUrl,
    displayOrder: index,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
});

export const galleryService = {
  // 1. Public: Get published images
  async getPublishedImages(): Promise<GalleryImage[]> {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn('Failed to fetch published gallery from API, using fallback:', err);
    }
    return INITIAL_DEFAULT_GALLERY_IMAGES;
  },

  // 2. Admin: Get all images (published and drafts)
  async getAllImages(adminToken?: string): Promise<GalleryImage[]> {
    try {
      const res = await fetch('/api/admin/gallery', {
        headers: {
          Authorization: `Bearer ${adminToken || ''}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          return data;
        }
      }
    } catch (err) {
      console.error('Failed to fetch admin gallery images:', err);
    }
    return INITIAL_DEFAULT_GALLERY_IMAGES;
  },

  // 3. Admin: Create image
  async createImage(payload: GalleryUploadPayload, adminToken?: string): Promise<{ success: boolean; image?: GalleryImage; error?: string }> {
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken || ''}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to create gallery image' };
      }
      return { success: true, image: data.image };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error creating image' };
    }
  },

  // 4. Admin: Update image
  async updateImage(id: string, updates: Partial<GalleryImage> & { fileBase64?: string }, adminToken?: string): Promise<{ success: boolean; image?: GalleryImage; error?: string }> {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken || ''}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to update gallery image' };
      }
      return { success: true, image: data.image };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error updating image' };
    }
  },

  // 5. Admin: Delete image
  async deleteImage(id: string, adminToken?: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken || ''}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to delete gallery image' };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error deleting image' };
    }
  },

  // 6. Admin: Toggle publish
  async togglePublish(id: string, isPublished: boolean, adminToken?: string): Promise<{ success: boolean; image?: GalleryImage; error?: string }> {
    return this.updateImage(id, { isPublished }, adminToken);
  },

  // 7. Admin: Reorder images
  async reorderImages(orderedIds: string[], adminToken?: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch('/api/admin/gallery/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken || ''}`,
        },
        body: JSON.stringify({ orderedIds }),
      });
      const data = await res.json();
      return { success: res.ok, error: data.error };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
