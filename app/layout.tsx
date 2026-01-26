import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from "@/config";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: config.name,
    template: `%s | ${config.name}`,
  },
  description: config.description,
  keywords: config.keywords.join(", "),
  authors: [{ name: config.creator.name, url: config.siteUrl }],
  creator: config.creator.name,
  publisher: config.creator.name,
  category: config.category,
  alternates: { canonical: config.siteUrl },
  openGraph: {
    type: "website",
    locale: config.locale,
    url: config.siteUrl,
    title: config.name,
    description: config.description,
    siteName: config.name,
    images: [
      {
        url: config.ogImageUrl,
        width: 1200,
        height: 630,
        alt: config.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.name,
    description: config.description,
    images: [config.ogImageUrl],
    creator: config.creator.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
};

const schemaOrg = {
  website: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.name,
    description: config.description,
    url: config.siteUrl,
    image: config.ogImageUrl,
    author: {
      "@type": "Person",
      name: config.creator.name,
    },
    datePublished: "2026-01-30",
    applicationCategory: config.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "12",
    },
    offers: [
      {
        "@type": "Offer",
        price: "9.00",
        priceCurrency: "USD",
      },
    ],
  },
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.name,
    url: config.siteUrl,
    logo: `${config.siteUrl}/logo.png`,
    sameAs: [config.socialUrls.x, config.socialUrls.github],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={sans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrg.website),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrg.organization),
          }}
        />
      </head>
      <body className="antialiased">
        <NextTopLoader
          height={5}
          color="#d9db4d"
          shadow="0 0 20px #d9db4d"
          showSpinner={false}
          easing={"ease-out"}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster
          position="top-center"
          richColors={true}
          closeButton={true}
          duration={5000}
        />
        <Analytics />
      </body>
    </html>
  );
}
