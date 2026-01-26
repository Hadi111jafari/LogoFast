/**
 * @section: Problem / Pain
 * @Purpose: Connect with users’ pain points.
 * @Description: Explain the problem users face without your product using 3–5 short bullets or a small paragraph.
 * Keep it relatable and simple, so users instantly feel understood.
 */
"use client";

import {
  AlertCircle,
  Code,
  Mail,
  Database,
  Shield,
  Server,
  Globe,
  UserLock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProblemProps } from "@/types";

const problems: ProblemProps[] = [
  {
    time: 4,
    task: "to set up emails",
    icon: <Mail size={16} />,
  },
  {
    time: 6,
    task: "for designing a landing page",
    icon: <Code size={16} />,
  },
  {
    time: 4,
    task: "to handle Stripe webhooks and retries",
    icon: <Shield size={16} />,
  },
  {
    time: 1,
    task: "for SEO, OG tags, and metadata",
    icon: <Globe size={16} />,
  },
  {
    time: 4,
    task: "to implement secure authentication",
    icon: <UserLock size={16} />,
  },
  {
    time: 2,
    task: "to fix DNS and domains",
    icon: <Server size={16} />,
  },
  {
    time: 3,
    task: "Protect API routes and dashboards",
    icon: <Database size={16} />,
  },
  {
    time: "∞",
    task: "Overthinking instead of shipping...",
    icon: <AlertCircle size={16} />,
  },
];
export default function Problem() {
  const totalHours = problems
    .slice(0, -1)
    .reduce((acc, p) => acc + (typeof p.time === "number" ? p.time : 0), 0);

  return (
    <section id="problem" className="my-16 w-full mx-auto max-w-6xl px-5">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge className="uppercase" variant="secondary">
          the problem
        </Badge>

        <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
          You Lose Weeks Before Shipping Anything
        </h2>

        <p className="mx-auto max-w-xl text-base text-muted-foreground">
          Before your first real feature, you’re already buried in setup work.
        </p>
      </div>

      {/* Problems list */}
      <div className="mt-10 mx-auto max-w-lg">
        <div className="rounded-lg bg-muted p-4">
          <ul className="divide-y">
            {problems.map((problem, index) => (
              <li
                key={index}
                className="flex items-center gap-0 md:gap-2 p-3 hover:bg-muted/60 transition-colors"
              >
                {/* Icon */}
                <div className="shrink-0 text-muted-foreground/70">
                  {problem.icon}
                </div>

                {/* Time */}
                <span className="w-20 text-sm md:text-base text-center font-semibold text-destructive tabular-nums">
                  {problem.time === "∞" ? "∞" : `${problem.time}+ hrs`}
                </span>

                {/* Task */}
                <p
                  className={`text-sm md:text-base sm:text-[15px] leading-snug ${
                    problem.time === "∞"
                      ? "text-destructive font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  {problem.task}
                </p>
              </li>
            ))}

            {/* Total */}
            <li className="flex items-center gap-4 p-4 bg-muted/40">
              <span className="w-20 text-right text-base font-bold text-red-700 tabular-nums">
                = {totalHours}+
              </span>

              <p className="text-sm sm:text-[15px] font-medium text-primary">
                Hours lost before shipping anything useful
              </p>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-base sm:text-lg text-muted-foreground">
            With <span className="font-bold text-primary">shipfast.so</span>,
            the same setup takes{" "}
            <span className="font-bold text-primary">5 minutes</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
