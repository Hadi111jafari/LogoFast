/**
 * Instructions for updating the Privacy Policy:
 *
 * 1. Go to https://chat.openai.com/
 * 2. Copy-paste the prompt below
 * 3. Replace with your own app/website data
 * 4. Paste the generated Privacy Policy markdown inside the privacy.mdx file
 *
 * Prompt to use in ChatGPT:
 * ---
 * You are an excellent lawyer.
 * Write a clear and professional Privacy Policy for my website.
 * Context:
 * - Website/Product: ShipFast.so (https://shipfast.so)
 * - Description: SaaS boilerplate/production-ready starter kit for developers
 * - User data collected: name, email, payment information
 * - Non-personal data collected: web cookies
 * - Purpose: provide and improve the service
 * - Data sharing: personal data is never shared with third parties
 * - Children's privacy: we do not knowingly collect data from children
 * - Third-party services: may use Google login
 * - User rights: users can refuse to provide data but may lose access
 * - External links: website may contain links to sites we don’t control
 * - Compliance: data controller/processor, comply with applicable laws including GDPR
 * - Updates: notify users by email
 * - Contact: support@shipfast.so
 *
 * Include sections:
 * 1. Introduction
 * 2. Information we collect (personal and non-personal)
 * 3. Purpose of data collection
 * 4. Data sharing
 * 5. Children's privacy
 * 6. Third-party services (if applicable)
 * 7. Data retention and protection
 * 8. User rights
 * 9. External links
 * 10. Legal compliance
 * 11. Updates to the Privacy Policy
 * 12. Contact information
 * Make it professional, readable, suitable for a SaaS website.
 * Include an effective date.
 * Use markdown for styling and formatting.
 * Do not add any explaination. Answer:
 * ---
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Privacy from "./privacy.mdx";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our website and services.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <article className="prose dark:prose-invert">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <Privacy />
      </article>
    </section>
  );
}
