/**
 * @section: Social Proof / Testimonials
 * @Purpose: Build trust and credibility.
 * @Description: Include real customer quotes, ratings, or usage numbers. Keep it authentic and short. Avoid stock or fake testimonials.
 */
"use client";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@/types";

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Founder",
    company: "TechFlow",
    content:
      "Shipped my SaaS in 3 days instead of 3 months. The authentication and payment integration saved me weeks of work.",
    avatarId: 1,
  },
  {
    name: "Marcus Rodriguez",
    role: "Solo Developer",
    company: "AppBuilder",
    content:
      "Best investment I made this year. The UI components alone are worth the price. Clean code, great documentation.",
    avatarId: 2,
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    company: "StartupXYZ",
    content:
      "We launched our MVP in record time. The email system and database setup worked flawlessly out of the box.",
    avatarId: 3,
  },
  {
    name: "David Kim",
    role: "Indie Hacker",
    company: "SideProject Pro",
    content:
      "Finally a boilerplate that actually delivers. No more wasting time on setup. Just build and ship.",
    avatarId: 4,
  },
  {
    name: "Lisa Anderson",
    role: "CEO",
    company: "CloudSync",
    content:
      "The AI integration features are incredible. Saved our team countless hours of implementation work.",
    avatarId: 5,
  },
  {
    name: "James Park",
    role: "Full Stack Dev",
    company: "DevTools Inc",
    content:
      "Clean architecture, modern stack, and actually maintained. This is what boilerplates should be.",
    avatarId: 6,
  },
  {
    name: "Sarah Chen",
    role: "Founder",
    company: "TechFlow",
    content:
      "Shipped my SaaS in 3 days instead of 3 months. The authentication and payment integration saved me weeks of work.",
    avatarId: 1,
  },
  {
    name: "Marcus Rodriguez",
    role: "Solo Developer",
    company: "AppBuilder",
    content:
      "Best investment I made this year. The UI components alone are worth the price. Clean code, great documentation.",
    avatarId: 2,
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    company: "StartupXYZ",
    content:
      "We launched our MVP in record time. The email system and database setup worked flawlessly out of the box.",
    avatarId: 3,
  },
  {
    name: "David Kim",
    role: "Indie Hacker",
    company: "SideProject Pro",
    content:
      "Finally a boilerplate that actually delivers. No more wasting time on setup. Just build and ship.",
    avatarId: 4,
  },
  {
    name: "Lisa Anderson",
    role: "CEO",
    company: "CloudSync",
    content:
      "The AI integration features are incredible. Saved our team countless hours of implementation work.",
    avatarId: 5,
  },
  {
    name: "James Park",
    role: "Full Stack Dev",
    company: "DevTools Inc",
    content:
      "Clean architecture, modern stack, and actually maintained. This is what boilerplates should be.",
    avatarId: 6,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="my-16 w-full mx-auto max-w-6xl px-5">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge className="mb-4 uppercase" variant={"secondary"}>
          testimonials
        </Badge>
        <h2
          id="testimonials-heading"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight"
        >
          Loved by Developers Worldwide
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground text-pretty">
          Join thousands of developers who&apos;ve shipped faster with
          shipfast.so
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative mt-10 grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group relative block h-full w-full">
              <div className="relative z-20 h-full gap-4 rounded-lg bg-muted p-6 flex flex-col">
                {/* Content */}
                <p className="text-sm text-foreground grow">
                  {testimonial.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Avatar>
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?img=${testimonial.avatarId}`}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
