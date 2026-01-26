import React from "react";
import ButtonCheckout from "./ButtonCheckout";
import { config } from "@/config";

export default function CTA() {
  return (
    <section className="my-16 w-full mx-auto max-w-6xl px-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2
              id="pricing-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight"
            >
              {" "}
              Ready to Ship Your SaaS in Days?
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground text-pretty">
              Stop overthinking and start building. Get instant access to
              everything you need to launch your product today.
            </p>
          </div>
          <ButtonCheckout priceId={config.stripe.plans[1].priceId} />
        </div>
      </div>
    </section>
  );
}
