/**
 * @section: Pricing / Plans
 * @Purpose: Clearly present purchase options.
 * @Description: Show pricing, plans, or subscription options. Include what’s included, payment frequency, and any guarantees/refunds.
 * Keep it transparent and easy to scan.
 */

"use client";

import { useState } from "react";
import { CircleCheckBig, CircleX, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { config } from "@/config";
import ButtonCheckout from "@/components/ButtonCheckout";
import ButtonLogin from "@/components/ButtonLogin";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const tierCount: number = config.stripe.plans.length;

  // Check if any plan has yearly pricing
  const hasYearlyPlans = config.stripe.plans.some(
    (plan) =>
      plan.yearlyPrice !== undefined || plan.yearlyPriceId !== undefined,
  );

  return (
    <section
      className="w-full py-4 sm:py-8 md:py-12 lg:py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="pricing-heading"
      id="pricing"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <Badge className="mb-4 uppercase" variant={"secondary"}>
            pricing
          </Badge>
          <h2
            id="pricing-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight"
          >
            Simple Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground text-pretty">
            Choose the plan that fits your needs.
          </p>
        </div>

        {/* Billing Toggle - Only show if yearly plans exist */}
        {hasYearlyPlans && (
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 rounded-lg border bg-muted p-1">
              <Label
                htmlFor="billing-toggle"
                className={cn(
                  "px-4 py-2 text-sm rounded-md cursor-pointer transition-all",
                  !isYearly && "bg-background font-medium shadow-sm",
                )}
              >
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <Label
                htmlFor="billing-toggle"
                className={cn(
                  "px-4 py-2 text-sm rounded-md cursor-pointer transition-all",
                  isYearly && "bg-background font-medium shadow-sm",
                )}
              >
                Yearly
                <span className="ml-1.5 text-xs text-emerald-600 font-semibold">
                  Save 25%
                </span>
              </Label>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div
          className={cn(
            "grid gap-6 md:gap-8",
            tierCount === 1 && "mx-auto max-w-md",
            tierCount === 2 && "mx-auto max-w-5xl md:grid-cols-2",
            tierCount >= 3 && "md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {config.stripe.plans.map((tier, idx) => {
            const isCheckout = tier.action === "checkout";
            const isLogin = tier.action === "login";

            // Determine if this tier has yearly pricing
            const hasYearlyOption =
              tier.yearlyPrice !== undefined ||
              tier.yearlyPriceId !== undefined;

            // Compute price based on billing period
            const price =
              isYearly && hasYearlyOption && tier.yearlyPrice !== undefined
                ? tier.yearlyPrice
                : (tier.price ?? 0);

            // Compute priceId based on billing period
            const priceId =
              isYearly && hasYearlyOption && tier.yearlyPriceId
                ? tier.yearlyPriceId
                : tier.priceId;

            return (
              <article
                key={idx}
                className={cn(
                  "relative flex flex-col rounded-lg bg-muted p-6 sm:p-8",
                )}
                aria-label={`${tier.name} plan${tier.isFeatured ? " - Most popular" : ""}`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  {/* Header */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {tier.name}

                      {/* Popular Badge */}
                      {tier.isFeatured && (
                        <Badge className="shadow ml-2">
                          <Zap className="inline-block w-10 h-10" />
                          Popular
                        </Badge>
                      )}
                    </h3>
                    {tier.description && (
                      <p className="text-sm text-muted-foreground">
                        {tier.description}
                      </p>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-end gap-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight">
                        ${price}
                      </span>
                    </div>

                    {isCheckout && (
                      <div className="flex flex-col gap-0.5 pb-1.5">
                        {tier.priceAnchor && !isYearly && (
                          <span className="text-sm text-muted-foreground line-through leading-none">
                            ${tier.priceAnchor}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground leading-none">
                          {isYearly && hasYearlyOption
                            ? "per year"
                            : "per month"}
                        </span>
                      </div>
                    )}

                    {isLogin && (
                      <span className="pb-1.5 text-sm text-muted-foreground">
                        Free forever
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Included
                    </p>
                    <ul className="space-y-3">
                      {tier.features.map((feat, i) => {
                        const isAvailable = feat.isAvailable ?? true;
                        return (
                          <li
                            key={i}
                            className={cn(
                              "flex items-start gap-3 text-sm",
                              isAvailable
                                ? "text-foreground"
                                : "text-muted-foreground/60",
                            )}
                          >
                            {isAvailable ? (
                              <CircleCheckBig
                                className="mt-0.5 size-5 shrink-0 text-emerald-700"
                                aria-hidden="true"
                              />
                            ) : (
                              <CircleX
                                className="mt-0.5 size-5 shrink-0 text-rose-400"
                                aria-hidden="true"
                              />
                            )}
                            <span
                              className={cn(!isAvailable && "line-through")}
                            >
                              {feat.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6">
                  {isCheckout && priceId && (
                    <ButtonCheckout
                      priceId={priceId}
                      showLogo
                      className="w-full"
                      variant={tier.isFeatured ? "default" : "outline"}
                    />
                  )}

                  {isLogin && (
                    <ButtonLogin className="w-full" variant="default" />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
