/**
 * App Configuration
 *
 * Central config file for your entire app.
 * Everything is customizable - replace with your own values.
 *
 * What's configured here:
 * - Branding (name, description, logo)
 * - SEO (meta tags, keywords, social previews)
 * - Stripe pricing plans
 * - Email settings
 * - Auth settings
 *
 * Steps to customize:
 * 1. Change domain, creatorName, and appName at the top
 * 2. Update social URLs with your handles
 * 3. Replace Stripe priceIds with yours from Stripe dashboard
 * 4. Configure email addresses for your domain
 * 5. Adjust pricing plans and features
 */

import { Tier } from "./types";

// Change these to your own values
const domain = "yourdomain.tld";
const creatorName = "";
const appName = "LogoFast";

export const config = {
  /**
   * App name
   * Used in: Meta tags, header, footer, emails
   */
  name: appName,

  /**
   * App description
   * Used in: Meta tags, SEO, social previews
   */
  description: "Concisely explain what you do and what value you bring in",

  /**
   * Full site URL
   * Used in: Canonical links, social previews, redirects
   * Example: https://shipfast.so
   */
  siteUrl: `https://${domain}`,

  /**
   * Logo URL
   * Used in: Meta tags, header, favicons
   */
  logoUrl: "/logo.svg",

  /**
   * Open Graph image
   * Used when: Links shared on social media
   * Size: 1200x630px recommended
   */
  ogImageUrl: `https://${domain}/og.jpg`,

  /**
   * Social profile URLs
   * Replace with your actual usernames
   */
  socialUrls: {
    x: "https://x.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    github: "https://github.com/yourusername",
    instagram: "https://instagram.com/yourusername",
  },

  /**
   * Creator info
   * Used in: Meta tags, attribution, footer
   */
  creator: {
    name: creatorName,
    twitter: "@yourtwitterusername",
  },

  /**
   * Schema.org category
   * Helps: SEO and search engines
   */
  category: "SoftwareApplication",

  /**
   * SEO keywords
   * Add terms relevant to your app
   */
  keywords: ["keyword1", "keyword2", "keyword3", "more keywords..."],

  /**
   * Site locale
   * Used for: SEO and internationalization
   */
  locale: "en_US",

  /**
   * Website type
   * Used in: Structured data / SEO
   */
  type: "website",

  /**
   * Stripe Configuration
   *
   * Mode options:
   * - "payment" → One-time payments (single checkout)
   * - "subscription" → Recurring billing (monthly/yearly)
   *
   * URLs:
   * - successUrl: Where to send users after successful payment
   * - cancelUrl: Where to send users if they cancel checkout
   *
   * Plans:
   * IMPORTANT: Replace priceId with your own from Stripe dashboard
   * Get your price IDs: Dashboard → Products → Click product → Copy price ID
   */
  stripe: {
    successUrl: `https://${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `https://${domain}/#pricing`,
    mode: "subscription", // or "payment" for one-time

    /**
     * Pricing plans
     * Customize features, prices, and descriptions
     */
    plans: [
      {
        isFeatured: false, // Highlights this plan in UI
        name: "Free",
        description: "Get started for free!",
        price: 0, // Display price
        priceAnchor: 0, // Crossed-out price (optional)
        priceId: "", // REPLACE WITH YOUR STRIPE PRICE ID

        /**
         * Feature list
         * Set isAvailable: false to show as disabled
         */
        features: [
          { text: "Next.js 16 boilerplate" },
          { text: "Auth (Google, GitHub, magic links)" },
          { text: "Stripe payments ready" },
          { text: "Email service setup" },
          { text: "Database configured" },
          { text: "50+ UI components" },
          { text: "SEO optimized", isAvailable: false  },
          { text: "Full source code", isAvailable: false  },
          { text: "Lifetime updates", isAvailable: false },
        ],
        action: "login",
        shortcut: "l", // Keyboard shortcut (not shown when logo present)
      },
      {
        isFeatured: true, // Highlights this plan in UI
        name: "Individual Plan",
        description: "Perfect for individual users",
        price: 197, // Display price
        priceAnchor: 297, // Crossed-out price (optional)
        priceId: "price_asdfjasldfjaskdfljasdlfk", // REPLACE WITH YOUR STRIPE PRICE ID

        /**
         * Feature list
         * Set isAvailable: false to show as disabled
         */
        features: [
          { text: "Next.js 16 boilerplate" },
          { text: "Auth (Google, GitHub, magic links)" },
          { text: "Stripe payments ready" },
          { text: "Email service setup" },
          { text: "Database configured" },
          { text: "50+ UI components" },
          { text: "SEO optimized" },
          { text: "Full source code" },
          { text: "Lifetime updates", isAvailable: false },
        ],
        action: "checkout",
        shortcut: "p", // Keyboard shortcut (not shown when logo present)
      },
      {
        isFeatured: false,
        name: "Team Plan",
        description: "Ideal for teams and small businesses",
        price: 397,
        yearlyPrice: 897,
        priceAnchor: 497,
        priceId: "price_asdfjasldfjaskdfljasdlfk", // REPLACE WITH YOUR STRIPE PRICE ID
        yearlyPriceId: "price_asdfjasldfjaskdfljasdlfk",
        features: [
          { text: "Next.js 16 boilerplate" },
          { text: "Auth (Google, GitHub, magic links)" },
          { text: "Stripe payments ready" },
          { text: "Email service setup" },
          { text: "Database configured" },
          { text: "50+ UI components" },
          { text: "SEO optimized" },
          { text: "Full source code" },
          { text: "Lifetime updates", isAvailable: true },
        ],
        action: "checkout",
        shortcut: "t",
      },
    ] as Tier[],
  },

  /**
   * Resend Email Configuration
   *
   * Email addresses used throughout the app.
   *
   * Development:
   * Use @resend.dev emails (e.g., onboarding@resend.dev)
   *
   * Production:
   * 1. Verify your domain in Resend dashboard
   * 2. Update to your domain emails
   *
   * Email types:
   * - fromNoReply: Automated emails (signup, confirmations, receipts)
   * - fromAdmin: Manual or admin messages
   * - supportEmail: User support contact email
   */
  resend: {
    fromNoReply: `${creatorName} <noreply@${domain}>`,
    fromAdmin: `${creatorName} at ${appName} <admin@${domain}>`,
    supportEmail: `support@${domain}`,
  },

  /**
   * Auth Configuration
   *
   * loginUrl: Auth0 login endpoint (default: /auth/login)
   * returnTo: Where to redirect after successful login
   */
  auth: {
    loginUrl: "/auth/login",
    returnTo: "/dashboard",
  },
} as const;
