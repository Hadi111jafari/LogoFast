/**
 * @section: Footer
 * @Purpose: Provide navigation, legal info, and contact.
 * @Description: Include links to docs, blog, contact, privacy policy, and terms. Optionally, company info. Keep it simple and minimal.
 */

import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { config } from "@/config";
import Link from "next/link";
import ThemeToggle from "@/components/themeToggle";

const NAV_SECTIONS = [
  {
    heading: "Product",
    items: [
      { text: "Features", url: "#features" },
      { text: "Pricing", url: "#pricing" },
      { text: "Testimonials", url: "#testimonials" },
      { text: "FAQ", url: "#faq" },
    ],
  },
  {
    heading: "Company",
    items: [
      { text: "About", url: "#about" },
      { text: "Blog", url: "/blog" },
      { text: "Careers", url: "#careers" },
      { text: "Contact", url: "#contact" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { text: "Documentation", url: "/docs" },
      { text: "Support", url: "#support" },
      { text: "Status", url: "#status" },
      { text: "Changelog", url: "#changelog" },
    ],
  },
];

const SOCIALS = [
  { icon: <Instagram className="size-5" />, url: "#", name: "Instagram" },
  { icon: <Facebook className="size-5" />, url: "#", name: "Facebook" },
  { icon: <Twitter className="size-5" />, url: "#", name: "Twitter" },
  { icon: <Linkedin className="size-5" />, url: "#", name: "LinkedIn" },
];

const LEGAL_LINKS = [
  { text: "Terms of Service", url: "/tos" },
  { text: "Privacy Policy", url: "/privacy" },
];

export default function Footer({
  brand = {
    homeUrl: config.siteUrl,
    logoUrl: config.logoUrl,
    name: config.name,
  },
  navSections = NAV_SECTIONS,
  tagline = config.description,
  socials = SOCIALS,
  legalPages = LEGAL_LINKS,
}) {
  return (
    <footer
      id="footer"
      className={cn(
        "border-t pt-16 pb-8 md:pt-20 md:pb-10 bg-linear-to-b from-background to-muted/30",
      )}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-16">
          {/* Brand Column */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href={brand.homeUrl}
              className="flex items-center gap-3 mb-6 group"
            >
              <img
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold group-hover:text-primary transition-colors">
                {brand.name}
              </span>
            </Link>

            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed mb-6">
              {tagline}
            </p>

            {/* Social Links */}
            <nav aria-label="Social media">
              <ul className="flex items-center gap-4">
                {socials.map((social, idx) => (
                  <li key={idx}>
                    <Link
                      href={social.url}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Navigation Columns */}
          <nav
            className="w-full md:w-2/3 flex flex-wrap justify-center md:justify-end gap-12 lg:gap-20"
            aria-label="Footer navigation"
          >
            {navSections.map((section, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center md:items-start text-center md:text-left min-w-30"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {section.heading}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.url}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col items-center gap-4 text-sm text-muted-foreground md:flex-row md:justify-between">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Legal Links */}
            <nav aria-label="Legal">
              <ul className="flex items-center gap-6">
                {legalPages.map((page, idx) => (
                  <li key={idx}>
                    <Link
                      href={page.url}
                      className="hover:text-primary transition-colors"
                    >
                      {page.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
