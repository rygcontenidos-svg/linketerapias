export type UserRole = "patient" | "therapist" | "company";

export type FeaturedPlan = "basico" | "estandar" | "premium";

export interface TherapistCardData {
  slug: string;
  name: string;
  specialty: string;
  subtitle?: string;
  city: string;
  rating: number;
  reviews: number;
  featured: boolean;
}
