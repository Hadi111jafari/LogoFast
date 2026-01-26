/**
 * @section: Solution / Value Proposition
 * @Purpose: Show how your product solves the problem in a clear, benefit‑oriented way.
 * @Description: A section that explains what your product does and why it matters.
 * Use a headline + short text that speaks to the core value users get.
 * Then add a grid of benefit cards (icon + short description) that show major outcomes.
 * Example pattern: “Feature33” block uses a main title, subtitle, and a 3‑column layout with title + text for each point. :contentReference[oaicite:1]{index=1}
 */

import React from "react";
import { Check } from "lucide-react";
import { Badge } from "./ui/badge";

const features = [
  "Pre-configured email setup with templates",
  "Production-ready landing pages and components out of the box",
  "Built-in Stripe integration with webhook handling and retries",
  "SEO optimized with meta tags and sitemap generation",
  "Secure authentication system already implemented",
  "Admin dashboard for user and subscription management",
  "And many more features to accelerate your development",
];

export default function Solution() {
  return (
    <section
      id="solution"
      className="my-16 md:my-20 w-full mx-auto max-w-7xl px-5"
    >
      {/* Header */}
      <div className="text-center space-y-3 my-12">
        <Badge className="uppercase" variant="secondary">
          the solution
        </Badge>

        <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
          You Lose Weeks Before Shipping Anything
        </h2>

        <p className="mx-auto max-w-xl text-base text-muted-foreground">
          Before your first real feature, you’re already buried in setup work.
        </p>
      </div>
      {/*content*/}
      <div className="flex flex-col md:flex-row items-start justify-center gap-8">
        <div className="w-full md:w-1/2">
          <img
            alt="Solution showcase"
            className="order-2 max-h-96 w-full rounded-md object-cover lg:order-1"
            src="/hero-image.jpg"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col lg:order-2 lg:items-start lg:text-left">
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">
            Stop wasting time on boilerplate. Our solution includes everything
            you need to launch your SaaS product, from authentication to
            payments, so you can focus on building features that matter.
          </p>
          <ul className="ml-4 space-y-4 text-left">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <Check className="size-5 shrink-0" strokeWidth={2} />
                <p className="text-muted-foreground">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/*Bottom CTA*/}
      <div className="mt-12 md:mt-16 text-center space-y-2">
        <p className="text-xl sm:text-2xl font-bold">Launch without delays</p>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Skip setup headaches and start building the features that matter from
          day one.
        </p>
      </div>
    </section>
  );
}
