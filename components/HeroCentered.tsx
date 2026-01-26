/**
 * @section: Hero
 * @Purpose: Immediately show the value and grab attention.
 * @Description:
 * A headline that clearly states what your product/service does, a short subheading that explains why it matters, and a primary call-to-action button.
 * You may include a product image, UI screenshot, or short animation/video.
 * Trust hints like rating or short stats can be added.
 */
import ButtonCheckout from "./ButtonCheckout";
import { config } from "@/config";

export default function HeroCentered() {
  return (
    <>
      <section
        id="hero"
        className={`my-14 sm:my-20 px-5 w-full mx-auto max-w-7xl`}
      >
        <div>
          <h1 className="text-center text-4xl md:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight sm:leading-none">
            Day progress in <br />
            your{" "}
            <span className="whitespace-nowrap">
              <span className="relative inline-block before:absolute before:inset-x-0 before:bottom-0 md:before:-bottom-2 before:h-6 md:before:h-11 before:bg-primary/70 before:rounded-sm before:-z-10">
                Mac menubar.
              </span>
            </span>
          </h1>

          <p className="mt-8 text-center text-xl text-foreground/70 max-w-3xl mx-auto">
            A clean, minimalist menubar icon that shows your day progress. Stay
            productive with a visual reminder of time passing.
          </p>

          <div className="mt-14 flex flex-col items-center justify-center space-y-6 sm:mt-12 sm:flex-row sm:space-x-7 sm:space-y-0">
            <ButtonCheckout priceId={config.stripe.plans[1].priceId} />
            <span className="md:text-lg font-semibold text-foreground/60">
              Free • macOS 15.6+
            </span>
          </div>
        </div>
        {/* Image */}
        <div className="relative my-6 md:my-10 border rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-linear-to-b from-muted/50 to-muted/20">
          <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border shadow-2xl aspect-video bg-background">
            <picture>
              <source
                srcSet="/hero-image.jpg"
                media="(prefers-color-scheme: dark)"
              />
              <img
                src="/hero-image.jpg"
                alt="Hero Image"
                className="w-full h-full object-cover object-top"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
      </section>
    </>
  );
}
