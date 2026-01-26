/**
 * @section: Lead / Waitlist
 * @Purpose: Capture interested users even before the product is ready or to collect emails.
 * @Description: Simple form for email capture, optionally name or other details.
 * Include strong CTA like "Join Waitlist" or "Get Early Access". Keep form minimal to increase conversions.
 */

"use client";

import { useState } from "react";
import { Mail, ArrowRight, CircleCheckBig } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Invalid email format").trim().toLowerCase(),
});

const benefits = ["No spam, ever", "Launch announcements", "Product updates"];

export default function Lead() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    const validation = emailSchema.safeParse({ email });

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: validation.data.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success("congrats! 🎉 You are waitlist. We'll email you soon.");
      setEmail("");
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <section id="lead" className="bg-muted py-32 w-full">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-start md:items-center">
          <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap gap-1 border-transparent bg-primary text-primary-foreground">
            <Mail className="mr-2 h-4 w-4" />
            Join Us
          </span>

          <h4 className="mt-4 text-2xl font-semibold tracking-tight md:text-center md:text-3xl xl:text-4xl">
            Get notified when we launch
          </h4>

          <p className="mt-2 text-lg font-medium text-muted-foreground md:text-center xl:text-xl">
            Be the first to know when we go live. No spam, just{" "}
            <span className="text-primary">product updates</span> and{" "}
            <span className="text-primary">early access</span>.
          </p>

          <div className="mt-5 flex w-full flex-col gap-2 md:w-auto xl:mt-8 xl:gap-3">
            <div className="group relative flex w-full items-center gap-2 rounded-lg md:w-[416px]">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="h-9 w-full min-w-0 rounded-md border border-input px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-background placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading || !email}
                aria-label="Submit form"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
              >
                {isLoading ? "Joining..." : "Join Waitlist"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-4 md:justify-center xl:mt-8 xl:gap-7">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-sm xl:text-base"
              >
                <CircleCheckBig className="h-4 w-4 text-green-500" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
