import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function proxy(request: NextRequest) {
  return await auth0.middleware(request);
}

/**
 * Route matcher configuration.
 *
 * Controls which paths the proxy middleware runs on.
 *
 * Rules:
 * - Protects dashboard and success pages explicitly
 * - Excludes static assets and metadata files for performance
 *
 * Excluded paths:
 * - _next/static   → static files
 * - _next/image    → image optimization
 * - favicon.ico
 * - sitemap.xml
 * - robots.txt
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/success/:path*",
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
