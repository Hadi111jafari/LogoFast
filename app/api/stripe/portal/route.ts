/**
 * Stripe Customer Portal API
 *
 * Creates a session for Stripe's customer portal where users can:
 * - Update payment methods
 * - View billing history and invoices
 * - Cancel or upgrade subscriptions
 * - Update billing address
 *
 * Called by:
 * - ButtonBilling.tsx component (in dashboard)
 *
 * Requirements:
 * - User must be logged in
 * - User must have a Stripe customer_id (made at least one purchase)
 *
 * Flow:
 * 1. Verify user is authenticated
 * 2. Get user's Stripe customer_id from database
 * 3. Create Stripe portal session
 * 4. Return portal URL for redirect
 *
 * Learn more: https://stripe.com/docs/billing/subscriptions/integrating-customer-portal
 */

import { NextResponse, NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";
import { createCustomerPortal } from "@/lib/stripe";
import { supabaseServer } from "@/lib/supabase";
import { PortalRequestBody } from "@/types/stripe";

/**
 * POST /api/stripe/portal
 *
 * Creates a Stripe customer portal session and returns the URL
 *
 * Request body:
 * ```json
 * {
 *   "returnUrl": "https://yourdomain.com/dashboard" // Where to send user after they're done
 * }
 * ```
 *
 * Responses:
 * - 200: { url: string } - Portal URL to redirect user to
 * - 400: { error: string } - Missing returnUrl or user has no billing account
 * - 401: { error: string } - User not logged in
 * - 500: { error: string } - Server/database error
 *
 * Example usage in component:
 * ```typescript
 * const response = await fetch('/api/stripe/portal', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     returnUrl: window.location.href
 *   })
 * });
 * const { url } = await response.json();
 * window.location.href = url; // Redirect to Stripe portal
 * ```
 */
export async function POST(req: NextRequest) {
  try {
    // Verify user is logged in
    const session = await auth0.getSession();
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to view billing information" },
        { status: 401 },
      );
    }

    // Parse and validate request body
    const body: PortalRequestBody = await req.json();
    if (!body.returnUrl) {
      return NextResponse.json(
        { error: "Return URL is required" },
        { status: 400 },
      );
    }

    const userId = session.user.sub;

    // Get user's Stripe customer ID from database
    const { data: profile, error } = await supabaseServer
      .from("profiles")
      .select("customer_id")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return NextResponse.json(
        { error: "Failed to fetch billing information" },
        { status: 500 },
      );
    }

    // Check if user has made a purchase (has Stripe customer ID)
    if (!profile?.customer_id) {
      return NextResponse.json(
        {
          error:
            "You don't have a billing account yet. Please make a purchase first",
        },
        { status: 400 },
      );
    }

    // Create Stripe customer portal session
    const stripePortalUrl = await createCustomerPortal({
      customerId: profile.customer_id,
      returnUrl: body.returnUrl, // Where to send user after they leave portal
    });

    if (!stripePortalUrl) {
      return NextResponse.json(
        { error: "Failed to create customer portal session" },
        { status: 500 },
      );
    }

    // Return portal URL for redirect
    return NextResponse.json({ url: stripePortalUrl });
  } catch (e) {
    console.error("Customer portal error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Internal server error" },
      { status: 500 },
    );
  }
}
