/**
 * Instructions for updating Terms & Conditions:
 *
 * 1. Go to https://chat.openai.com
 * 2. Copy-paste the prompt below
 * 3. REPLACE with your own app/website data
 * 4. Paste the generated Terms & Conditions text inside the <pre> tag below
 *
 * Prompt to use in ChatGPT:
 * ---
 * You are a professional lawyer.
 * I need your help to write detailed Terms & Conditions for my website and software.
 * Context:
 * - Website/Product: ShipFast.so (https://shipfast.so)
 * - Description: SaaS boilerplate/production-ready starter kit for developers, creators, entrepreneurs, and small businesses
 * - License: Single-purchase software license, can be terminated by licensor at any time
 * - Refunds: No refunds or exchanges after purchase
 * - Liability: Limit liability for all damages, disclaim warranties and software fitness
 * - User Responsibilities: Users are responsible for their content
 * - Price: Prices may change; early purchases may have discounts
 * - Governing Law: UAE
 * - Updates: Include a last updated date
 *
 * Include the following sections:
 * 1. Introduction
 * 2. Agreement to Terms and Conditions
 * 3. Unlimited Access Software License with Termination Rights
 * 4. Refunds
 * 5. Disclaimer
 * 6. Warranties and Limitation of Liability
 * 7. Responsibilities
 * 8. Price Adjustments
 * 9. General Terms and Governing Law
 * Make it professional, legally sound, detailed, but readable.
 * Use markdown for styling and formatting.
 * Do not add any explaination. Answer:
 * ---
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Tos from "./tos.mdx";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "These Terms of Service define the rules, rights, and responsibilities when using our website and services.",
};

export default function TermsPage() {
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

        <Tos />
      </article>
    </section>
  );
}
