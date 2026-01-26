/**
 * @section: Benefits / Outcomes
 * @Purpose: Highlight the positive results users will achieve with your product.
 * @Description: Use a feature‑style grid where each item has an icon, title, and short text describing a specific benefit.
 * Typical layout: a clear section heading, a short intro sentence, then 3–6 columns of “benefit cards”.
 * Make sure each benefit explains a real user gain (time saved, cost reduced, easier workflow, better outcomes). Feature blocks from the library combine icons with concise explanatory text to help users scan quickly. :contentReference[oaicite:2]{index=2}
 */

import {
  Shield,
  DollarSign,
  Mail,
  Layout,
  Sparkles,
  BarChart3,
  Search,
  Database,
  MoreHorizontal,
} from "lucide-react";

const benefits = [
  {
    title: "Launch Faster",
    icon: Sparkles,
    description:
      "Save weeks of development time with pre-built, ready-to-use templates and workflows.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Reduce Errors",
    icon: Shield,
    description:
      "Avoid common setup mistakes with secure, tested code and built-in best practices.",
    span: "md:col-span-1",
  },
  {
    title: "Earn Revenue Sooner",
    icon: DollarSign,
    description:
      "Start accepting payments immediately with pre-configured billing and subscription flows.",
    span: "md:col-span-1",
  },
  {
    title: "Engage Users Instantly",
    icon: Mail,
    description:
      "Communicate with your users from day one using pre-set transactional emails and notifications.",
    span: "md:col-span-1",
  },
  {
    title: "Focus on Growth",
    icon: BarChart3,
    description:
      "Spend less time on setup and more time improving your product and scaling your business.",
    span: "md:col-span-2",
  },
  {
    title: "Easy Customization",
    icon: Layout,
    description:
      "Adapt layouts, branding, and components to your needs without breaking anything.",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Better Insights",
    icon: Database,
    description:
      "All systems come with analytics-ready structures to understand your users faster.",
    span: "md:col-span-1",
  },
  {
    title: "Search-Ready",
    icon: Search,
    description:
      "Pre-configured SEO tags and metadata help your site get discovered quicker.",
    span: "md:col-span-1",
  },
  {
    title: "Comprehensive Support",
    icon: MoreHorizontal,
    description:
      "Benefit from community-tested patterns, documentation, and ready-to-use helpers.",
    span: "md:col-span-1",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="my-16 w-full mx-auto max-w-6xl px-5">
      {/* Header */}
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 rounded-full mb-4">
          Benefits
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
          Why Choose shipfast.so
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-pretty">
          All features are pre-configured and ready for you to start building
          your project quickly.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {benefits.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`${feature.span} group relative transition-all hover:scale-[1.01] hover:z-10`}
            >
              <div className="h-full rounded-md bg-muted p-6 flex flex-col items-center justify-center text-center gap-4">
                <div className="p-3 rounded-md">
                  <Icon className="w-8 h-8 " strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold tracking-tight ">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
