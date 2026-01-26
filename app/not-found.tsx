import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center py-28 text-center lg:min-h-[80vh] lg:py-32">
      <div className="relative z-10 max-w-2xl">
        <h1 className="relative mb-6 bg-linear-to-br bg-clip-text py-2 text-2xl font-bold sm:text-3xl lg:text-5xl">
          Page Not Found
        </h1>

        <p className="text-muted-foreground mb-10 text-xl">
          Sorry, we couldn&#39;t find the page you&#39;re looking for. The page
          might have been removed or the URL might be incorrect.
        </p>
        <Button size={"lg"} asChild>
          <Link href="/">
            <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
