/**
 * @section: Maker Intro / About
 * @Purpose: Introduce the creator or team behind the product.
 * @Description: Short bio or story explaining who made the product, why, and their credibility.
 * Can include a photo/avatar, short text, and optionally links to social profiles.
 * Helps humanize the product and build trust with users.
 */

"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function MakerIntro() {
  return (
    <section
      className="mb-8 p-8 md:p-10 bg-muted"
      aria-labelledby="maker-heading"
      id="about"
    >
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Top section with image and intro */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
          <div className="relative w-52 h-52 shrink-0">
            <Avatar className="absolute inset-0 w-full h-full rounded-lg">
              <AvatarImage
                src="https://i.pravatar.cc/300?img=12"
                alt="Profile photo of the founder"
                className="object-cover"
              />
              <AvatarFallback
                className="rounded-lg bg-muted text-muted-foreground text-3xl"
                aria-hidden="true"
              >
                MJ
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-3 flex-1">
            <h1
              id="maker-heading"
              className="text-2xl md:text-3xl font-semibold text-foreground leading-tight"
            >
              Hey, I&apos;m John <span className="text-primary"></span>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              I was tired of building the same infrastructure
              repeatedly—authentication, payments, email systems. It slowed me
              down. So I created this boilerplate to help builders like you skip
              the setup and focus on what makes your product unique.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              With this, you can go from idea to launch in days.
              Everything&apos;s included: auth, payments, emails, SEO, and more.
              Customize what you need and ship.
            </p>
          </div>
        </div>
        {/* Reasons / closing */}
        <div className="space-y-5">
          <p className="text-base font-semibold text-foreground">
            Why I built this:
          </p>
          <ol className="space-y-2 list-decimal list-inside text-base text-muted-foreground marker:text-muted-foreground marker:font-bold">
            <li>
              Save time — Build features that generate revenue, not boilerplate
            </li>
            <li>
              Avoid frustration — No more debugging webhook failures or spam
              filters
            </li>
            <li>
              Ship faster — Quick launches mean faster feedback and iteration
            </li>
          </ol>
          <p className="text-base text-muted-foreground leading-relaxed">
            Hundreds of makers are already shipping faster with this. Keep
            scrolling to see what&apos;s inside.
          </p>
        </div>
      </div>
    </section>
  );
}
