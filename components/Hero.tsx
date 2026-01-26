/**
 * @section: Hero
 * @Purpose: Immediately show the value and grab attention.
 * @Description: Headline clearly stating what your product/service does, a short subheading explaining why it matters, and a primary CTA button.
 * Optional: product image, UI screenshot, or short animation/video. Trust hints like logos or short stats can be added.
 */
import Image from "next/image";
import { RatingBadge } from "@/components/RatingBadge";
import ButtonCheckout from "@/components/ButtonCheckout";
import { config } from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RatingStars } from "@/components/RatingStars";

export default function Hero() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20"
      id="hero"
      aria-label="Hero section"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-6">
          <div className="flex justify-center lg:justify-start">
            <RatingBadge />
          </div>

          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight text-balance"
          >
            Launch your startup in days,{" "}
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-lg inline-block">
              not weeks
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 text-pretty">
            Next.js boilerplate with pre-built functionalities and components to
            help you to launch your startup in days.
          </p>

          <div className="flex justify-center lg:justify-start pt-2">
            <ButtonCheckout
              className="w-full sm:w-auto min-w-52"
              priceId={config.stripe.plans[1].priceId}
            />
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div
              className="flex -space-x-3"
              role="img"
              aria-label="5 user avatars"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <Avatar
                  key={i}
                  className="size-10 sm:size-11 border-2 border-background ring-1 ring-border"
                >
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    alt=""
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                    U{i}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            <div className="flex flex-col items-center lg:items-start gap-1.5">
              <RatingStars />
              <p className="text-sm sm:text-base">
                <span className="font-semibold text-foreground">123+</span>
                <span className="text-muted-foreground ml-1">
                  startups launched
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* Right Image */}
        <div className="w-full lg:w-1/2 aspect-video">
          <Image
            src="/hero-image.jpg"
            alt="Hero Image"
            width={1200}
            height={1000}
            className="object-contain rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
