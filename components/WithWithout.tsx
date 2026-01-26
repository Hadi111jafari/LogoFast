/**
 * @section: With / Without / Comparison
 * @Purpose: Highlight the advantage of using your product over doing it manually or using alternatives.
 * @Description: Use a table, cards, or visuals to show "With product" vs "Without product" or competitor.
 * Keep it short, clear, and focused on the main value gain.
 */
"use client";

import {
  Zap,
  Code2,
  Lock,
  Mail,
  CreditCard,
  Database,
  Palette,
  FileText,
  CircleX,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { config } from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type WithItem = {
  icon: LucideIcon;
  text: string;
};

const without = [
  "Days configuring authentication from scratch",
  "Fighting Stripe webhooks and payment flows",
  "Emails landing in spam (DKIM, SPF, DMARC chaos)",
  "Rebuilding the same landing page components",
  "Googling 'how to structure Next.js apps'",
  "Dealing with database migrations manually",
  "Setting up SEO meta tags for every page",
  "No docs, just Stack Overflow and hope",
];

const withItems: WithItem[] = [
  { icon: Lock, text: "Auth ready: email, password, and social sign-in" },
  { icon: CreditCard, text: "Stripe integrated: webhooks and flows wired" },
  { icon: Mail, text: "Emails deliver: DNS configured, templates included" },
  { icon: Palette, text: "UI components: beautiful, accessible, ready" },
  { icon: Code2, text: "Clean structure: best practices built-in" },
  { icon: Database, text: "Database setup: schema and migrations ready" },
  { icon: FileText, text: "SEO optimized: meta tags and sitemaps done" },
  { icon: Zap, text: "Full docs: clear guides for customization" },
];

/**
 *
 * You can use this as comparison as well.
 */

export default function WithWithout() {
  return (
    <section
      id="comparison"
      className="py-16 sm:py-20 md:py-24 lg:py-28 bg-linear-to-b from-background via-muted/30 to-background"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <Badge variant="secondary" className="uppercase">
            The Difference
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            From scratch vs shipfast.so
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Stop wasting weeks on setup. See what changes with a
            production-ready foundation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 rounded-lg overflow-hidden bg-muted">
          <div className="relative bg-linear-to-br from-red-50/70 to-red-50/30 dark:from-red-950/30 dark:to-red-950/15 p-8 lg:p-10 md:border-r md:border-dashed border-foreground/20">
            {/*<div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 dark:bg-red-600/10 rounded-bl-full" />*/}

            <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-red-100 mb-8 flex items-center gap-3">
              {/*Replace with your competitor(s) logo(s)*/}
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>
              Building from scratch
            </h3>

            <ul className="space-y-4">
              {without.map((item, idx) => (
                <li key={idx}>
                  <div className="flex items-start gap-3">
                    <CircleX className="size-5 shrink-0 text-red-600 dark:text-red-500 mt-0.5" />
                    <span className="text-sm sm:text-base leading-relaxed">
                      {item}
                    </span>
                  </div>
                  {idx < without.length - 1 && (
                    <hr className="mt-4 border-red-200/70 dark:border-red-900/30" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative bg-linear-to-br from-emerald-50/70 to-emerald-50/30 dark:from-emerald-950/30 dark:to-emerald-950/15 p-8 lg:p-10">
            {/*<div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 dark:bg-emerald-600/10 rounded-bl-full" />*/}

            <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-emerald-100 mb-8 flex items-center gap-3">
              <Image
                src={config.logoUrl}
                alt="Shipfast Logo"
                width={40}
                height={40}
                loading="lazy"
              />
              Using shipfast.so
            </h3>

            <ul className="space-y-4">
              {withItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx}>
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-emerald-100/60 dark:bg-emerald-900/40 shrink-0">
                        <Icon className="size-4 text-emerald-800 dark:text-emeral-500" />
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed font-medium">
                        {item.text}
                      </span>
                    </div>
                    {idx < withItems.length - 1 && <hr className="mt-4" />}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/*Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center space-y-2">
          <p className="text-xl sm:text-2xl font-bold">Ready to ship faster?</p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Skip the setup. Start with everything you need and focus on what
            makes your product unique.
          </p>
        </div>
      </div>
    </section>
  );
}
