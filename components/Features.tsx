/**
 * @section: Features
 * @Purpose: Highlight key functionality.
 * @Description: Show 3–6 main features with a title, one-line description, and optional icon or image.
 * Focus only on features that directly support the value proposition.
 */

"use client";

import {
  ShieldUser,
  BadgeDollarSign,
  Mails,
  Form,
  Sparkles,
  ChartBar,
  ZoomIn,
  Database,
  Ellipsis,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Feature } from "@/types";

const features: Feature[] = [
  {
    title: "Authentication",
    icon: <ShieldUser size={44} />,
    description:
      "Get users signing up and logging in. Auth0 handles everything securely.",
  },
  {
    title: "Payments",
    icon: <BadgeDollarSign size={44} />,
    description:
      "Accept subscriptions and one-time payments with Stripe. Get paid in minutes.",
  },
  {
    title: "Email System",
    icon: <Mails size={44} />,
    description:
      "Send transactional emails with Resend. Welcome emails, receipts, notifications - all set up,",
  },
  {
    title: "UI Components",
    icon: <Form size={44} />,
    description:
      "Pre-built beautiful UI components to speed up your development process.",
  },
  {
    title: "SEO Optimized",
    icon: <ZoomIn size={44} />,
    description: "All SEO tags are optimized for better search engine ranking.",
  },
  {
    title: "Database",
    icon: <Database size={44} />,
    description:
      "Set up Postgres with Supabase. Create tables, configure security, and start storing data.",
  },
  {
    title: "Fully Customizeable",
    icon: <ChartBar size={44} />,
    description:
      "Make shipfast.so yours. Logo, colors, fonts - everything you need to match your brand.",
  },
  {
    title: "AI Integration",
    icon: <Sparkles size={44} />,
    description: "Work with LLMs at the comfort of calling a function.",
  },
  {
    title: "More",
    icon: <Ellipsis size={44} />,
    description: "Extra features that cover the common needs of real apps.",
  },
];

export default function Features() {
  return (
    <section id="features" className="my-16 w-full mx-auto max-w-6xl px-5">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge className="mb-4 uppercase" variant={"secondary"}>
          features
        </Badge>
        <h2
          id="pricing-heading"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight"
        >
          {" "}
          Why Choose shipfast.so
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground text-pretty">
          All these features are already configured and ready for you to ship
          your startup.
        </p>
      </div>{" "}
      <div className=" flex items-center justify-center">
        <div className="relative mt-10 grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative block h-full w-full p-2 transition-all hover:scale-[1.01] hover:z-10"
            >
              <div className="relative z-20 h-full gap-4 rounded-lg bg-muted p-5 text-center flex flex-col items-center justify-center">
                {feature.icon}
                <h1 className="text-2xl font-semibold tracking-tight">
                  {feature.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
