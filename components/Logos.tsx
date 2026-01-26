/**
 * @section: Logos / Trust Indicators
 * @Purpose: Build credibility and trust quickly.
 * @Description: Show customer logos, partner logos, or media mentions.
 * Can also include small stats like "10,000+ users" or ratings.
 */
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const logos = [
  {
    name: "Vercel",
    logoUrl: "https://svgl.app/library/vercel_wordmark.svg",
    siteUrl: "https://vercel.com",
  },
  {
    name: "Vercel",
    logoUrl: "https://svgl.app/library/vercel_wordmark.svg",
    siteUrl: "https://vercel.com",
  },
  {
    name: "Vercel",
    logoUrl: "https://svgl.app/library/vercel_wordmark.svg",
    siteUrl: "https://vercel.com",
  },
  {
    name: "Vercel",
    logoUrl: "https://svgl.app/library/vercel_wordmark.svg",
    siteUrl: "https://vercel.com",
  },
  {
    name: "Vercel",
    logoUrl: "https://svgl.app/library/vercel_wordmark.svg",
    siteUrl: "https://vercel.com",
  },
  {
    name: "Vercel",
    logoUrl: "https://svgl.app/library/vercel_wordmark.svg",
    siteUrl: "https://vercel.com",
  },
  {
    name: "Vercel",
    logoUrl: "https://svgl.app/library/vercel_wordmark.svg",
    siteUrl: "https://vercel.com",
  },
  {
    name: "Vercel",
    logoUrl: "https://svgl.app/library/vercel_wordmark.svg",
    siteUrl: "https://vercel.com",
  },
  {
    name: "Vercel",
    logoUrl: "https://svgl.app/library/vercel_wordmark.svg",
    siteUrl: "https://vercel.com",
  },
  {
    name: "Vercel",
    logoUrl: "https://svgl.app/library/vercel_wordmark.svg",
    siteUrl: "https://vercel.com",
  },
];

export default function Logos() {
  return (
    <section
      id="logos"
      className="my-14 sm:my-20 px-5 w-full mx-auto max-w-5xl flex flex-col justify-center items-center"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Trusted by Teams Worldwide
        </h2>
        <p className="text-foreground/80 text-lg">
          Join thousands of companies building with us
        </p>
      </div>

      <div className="relative w-full">
        {/* Left shade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />

        {/* Right shade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        <Marquee pauseOnHover>
          {logos.map((company, index) => (
            <Link
              href={company?.siteUrl}
              target="_blank"
              key={index}
              className="mx-8 inline-block transition-opacity hover:opacity-70"
            >
              <Image
                src={company?.logoUrl}
                alt={`${company?.name} logo`}
                width={100}
                height={100}
                className="object-contain"
              />
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
