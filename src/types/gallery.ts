export type GalleryCategory =
  | 'Safaris'
  | 'Destinations'
  | 'Hotels and Resorts'
  | 'Beaches'
  | 'Wildlife'
  | 'International Travel';

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Safaris',
  'Destinations',
  'Hotels and Resorts',
  'Beaches',
  'Wildlife',
  'International Travel',
];

export interface GalleryImage {
  id: string;
  title: string;
  caption?: string;
  description?: string;
  category: GalleryCategory;
  location?: string;
  imageUrl: string;
  storagePath?: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryUploadPayload {
  title: string;
  caption?: string;
  description?: string;
  category: GalleryCategory;
  location?: string;
  fileBase64?: string;
  imageUrl?: string;
  fileName?: string;
  displayOrder?: number;
  isPublished?: boolean;
}
