// Header
export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export interface HeaderProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
}

// login
export interface ButtonLoginProps {
  className?: string;
  variant?: "default" | "outline";
}

// Checkout
export interface CheckoutButtonProps {
  priceId?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  className?: string;
  shortcut?: string;
  showLogo?: boolean;
}

// Pricing
export interface TierFeature {
  text: string;
  isAvailable?: boolean;
}

export interface Tier {
  isFeatured?: boolean;
  name: string;
  description?: string;
  price?: number; // monthly price
  yearlyPrice?: number; // yearly price (optional)
  priceAnchor?: number;
  priceId?: string; // monthly Stripe price ID
  yearlyPriceId?: string; // yearly Stripe price ID (optional)
  features: TierFeature[];
  shortcut?: string;
  action: "login" | "checkout"; // Determines to show ButtonCheckout or ButtonLogin in the pricing card
}

// Features
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Testimonials
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatarId: number;
}

// problem
export interface ProblemProps {
  time: number | string;
  task: string;
  icon: React.ReactNode;
}

// FAQ
export interface FAQItem {
  question: string;
  answer: string;
}

// Dashboard

export interface Auth0User {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
}

export type SubStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing"
  | "none";

export interface SubscriptionInfo {
  plan: string;
  status: SubStatus;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}
