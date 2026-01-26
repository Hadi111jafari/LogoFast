/**
 * @section: Footer
 * @Purpose: Provide navigation, legal info, and contact.
 * @Description: Include links to docs, blog, contact, privacy policy, and terms. Optionally, company info. Keep it simple and minimal.
 */

import Link from "next/link";

export default function Footer2() {
  return (
    <footer
      id="footer"
      className="flex flex-col mx-auto items-center justify-center px-6 mt-20 overflow-hidden"
    >
      <p className="mt-6 text-center text-sm sm:text-base md:text-lg text-foreground/60 max-w-xl">
        Made for makers who want to ship fast and stay productive.
      </p>

      <div className="mt-8 text-center">
        <p className="text-sm text-foreground/50 mb-2">
          Have feedback or feature request?
        </p>
        <Link
          href="mailto:contact@shipfast.so"
          className="text-sm sm:text-base text-foreground/70 hover:text-foreground transition duration-300 underline"
        >
          contact@shipfast.so
        </Link>
      </div>
      <div className="pointer-events-none select-none overflow-hidden bg-linear-to-b from-orange-950/10 from-25% to-orange-950/0 bg-clip-text text-7xl sm:text-8xl md:text-9xl lg:text-[14rem] xl:text-[18rem] 2xl:text-[20rem] font-black leading-none text-transparent dark:from-orange-100/[0.035] dark:to-orange-100/0">
        shipfast.so
      </div>
    </footer>
  );
}
