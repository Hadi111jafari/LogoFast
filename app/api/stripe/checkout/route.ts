/**
 * Stripe Checkout API
 *
 * Creates a Stripe checkout session for user purchases.
 *
 * Flow:
 * 1. Check if user is logged in
 * 2. Verify user doesn't already have access
 * 3. Create/update user profile in database
 * 4. Create Stripe checkout session
 * 5. Return checkout URL to redirect user
 *
 * Called by:
 * - ButtonCheckout.tsx component
 *
 * Request body:
 * ```json
 * {
 *   "priceId": "price_xxx",
 *   "couponId": "coupon_xxx" // optional
 * }
 * ```
 *
 * Security:
 * - Requires Auth0 authentication
 * - Prevents duplicate purchases
 * - Links payment to user ID
 */

import { NextResponse, NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";
import { createCheckoutSession } from "@/lib/stripe";
import { supabaseServer } from "@/lib/supabase";
import { CheckoutRequestBody } from "@/types/stripe";

/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe checkout session and returns the URL
 *
 * Responses:
 * - 200: { url: string } - Checkout URL to redirect user to
 * - 400: { error: string } - Missing priceId or user already has access
 * - 401: { error: string } - User not logged in
 * - 500: { error: string } - Server/database error
 *
 * Process:
 * 1. Authenticate user with Auth0
 * 2. Check if user already purchased (has_access = true)
 * 3. Create user profile if first purchase
 * 4. Generate Stripe checkout session
 * 5. Return checkout URL for redirect
 *
 * Example usage in component:
 * ```typescript
 * const response = await fetch('/api/stripe/checkout', {
 *   method: 'POST',
 *   body: JSON.stringify({ priceId: 'price_xxx' })
 * });
 * const { url } = await response.json();
 * window.location.href = url; // Redirect to Stripe
 * ```
 */
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth0.getSession();
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to make a purchase" },
        { status: 401 },
      );
    }

    // Parse request body
    const body: CheckoutRequestBody = await req.json();
    const { priceId, couponId } = body;

    // Validate required fields
    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 },
      );
    }

    // Extract user info from Auth0 session
    const userId = session.user.sub;
    const userEmail = session.user.email;
    const userName = session.user.name || session.user.given_name || null;

    // Check if user already exists and has access
    const { data: profile, error: fetchError } = await supabaseServer
      .from("profiles")
      .select("id, customer_id, email, name, has_access, price_id")
      .eq("id", userId)
      .single();

    // Handle database errors (ignore "not found" error)
    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching profile:", fetchError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Prevent duplicate purchases
    if (profile?.has_access) {
      return NextResponse.json(
        { error: "You already have access" },
        { status: 400 },
      );
    }

    // Create profile if user is making first purchase
    if (!profile) {
      const { error: insertError } = await supabaseServer
        .from("profiles")
        .insert({
          id: userId,
          email: userEmail,
          name: userName,
          price_id: priceId, // Store which plan they're buying
        });

      if (insertError) {
        console.error("Error creating profile:", insertError);
        return NextResponse.json(
          { error: "Failed to create user profile" },
          { status: 500 },
        );
      }
    }

    // Create Stripe checkout session
    const stripeSessionURL = await createCheckoutSession({
      priceId,
      clientReferenceId: userId, // Links payment to user
      user: {
        email: userEmail,
        customerId: profile?.customer_id || undefined, // Reuse existing Stripe customer if exists
      },
      couponId: couponId || null, // Apply coupon if provided
    });

    // Handle Stripe session creation failure
    if (!stripeSessionURL) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 },
      );
    }

    // Return checkout URL for redirect
    return NextResponse.json({ url: stripeSessionURL });
  } catch (e) {
    console.error("Checkout error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Internal server error" },
      { status: 500 },
    );
  }
}
