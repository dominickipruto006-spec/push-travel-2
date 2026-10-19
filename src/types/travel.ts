export type SafariCountry = 'Kenya' | 'Tanzania' | 'Uganda' | 'Rwanda' | 'Multi-Country' | 'International';

export type PackageCategory = 
  | 'Safari & Wildlife'
  | 'Beach Holidays'
  | 'Luxury Escapes'
  | 'Gorilla Trekking'
  | 'International Getaways'
  | 'Corporate & Team Building';

export interface TourPackage {
  id: string;
  title: string;
  countries: SafariCountry[];
  durationDays: number;
  durationNights: number;
  category: PackageCategory;
  tag?: string;
  image: string;
  overview: string;
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    accommodation: string;
    mealPlan: string;
  }[];
  inclusions: string[];
  exclusions: string[];
}

export interface TravelService {
  id: string;
  title: string;
  shortDescription: string;
  iconName: string;
  image: string;
  deliverables: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hotels & Resorts' | 'Wildlife & Safaris' | 'Beaches & Coast' | 'Landscapes' | 'International' | 'Company Premises';
  location: string;
  imageUrl: string;
  caption: string;
  isUserAdded?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  country: SafariCountry;
  tagline: string;
  description: string;
  image: string;
  bestTime: string;
  wildlife: string[];
  highlights: string[];
}

export interface BigFiveAnimal {
  id: string;
  name: string;
  swahiliName: string;
  scientificName: string;
  funFact: string;
  bestParks: string[];
  diet: string;
  conservationStatus: string;
  image: string;
}

export interface QuoteRequest {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  email: string;
  safariStartDate: string;
  durationDays: string;
  adultsCount: string;
  childrenCount: string;
  estimatedBudget: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'KES';
  safariType: 'Safari Only' | 'Safari & Beach combined' | 'Beach Only';
  countriesOfInterest: string;
  otherTourDescription: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export type SupportedLanguage = 'en' | 'nl' | 'fr' | 'de' | 'ru' | 'es';
