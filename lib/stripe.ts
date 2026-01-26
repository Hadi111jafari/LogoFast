/**
 * Stripe Payment Integration
 *
 * Handles all Stripe operations: checkout, subscriptions, and customer portal.
 *
 * How payments work in shipfast.so:
 * 1. User clicks checkout button (ButtonCheckout.tsx)
 * 2. We create a Stripe checkout session (createCheckoutSession)
 * 3. User completes payment on Stripe's hosted page
 * 4. Stripe sends webhook to /api/stripe/webhook
 * 5. Webhook updates user's subscription status in database
 *
 * Setup required:
 * - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, and STRIPE_WEBHOOK_SECRET in .env.local
 * - Webhook endpoint configured in Stripe dashboard. see https://shipfast.so/docs/payments
 * - Plans configured in config.ts
 *
 * Learn more: https://stripe.com/docs/payments/checkout
 */
import Stripe from "stripe";
import { config } from "@/config";
import {
  CreateCheckoutParams,
  CreateCustomerPortalParams,
  SubStatus,
  SubscriptionInfo,
} from "@/types/stripe";
import { supabaseServer } from "@/lib/supabase";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

/**
 * Creates a Stripe checkout session for payment
 *
 * Called by: /api/stripe/checkout/route.ts
 *
 * @param user - User info (email, customerId if exists)
 * @param clientReferenceId - User ID to link payment to user
 * @param priceId - Stripe price ID from config.ts
 * @param couponId - Optional coupon code
 * @returns Checkout URL to redirect user to, or null if error
 */

export const createCheckoutSession = async ({
  user,
  clientReferenceId,
  priceId,
  couponId,
}: CreateCheckoutParams): Promise<string | null> => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: config.stripe.mode,
      allow_promotion_codes: true,
      client_reference_id: clientReferenceId,
      line_items: [{ price: priceId, quantity: 1 }],
      discounts: couponId ? [{ coupon: couponId }] : [],
      success_url: config.stripe.successUrl,
      cancel_url: config.stripe.cancelUrl,
      locale: "en",
      ...getCustomerParams(user),
    });

    return session.url;
  } catch (e) {
    console.error("Error creating checkout session:", e);
    return null;
  }
};

/**
 * Determines customer parameters for checkout session
 *
 * Handles two scenarios:
 * 1. Existing customer - use their Stripe customer ID
 * 2. New customer - create new customer with tax collection
 *
 * @param user - User object with optional customerId and email
 * @returns Stripe session params for customer handling
 */

function getCustomerParams(user: CreateCheckoutParams["user"]) {
  if (user?.customerId) {
    return { customer: user.customerId };
  }

  const params: Partial<Stripe.Checkout.SessionCreateParams> = {
    tax_id_collection: { enabled: true },
  };

  const mode = config.stripe.mode as string;

  if (mode === "payment") {
    params.customer_creation = "always";
    params.invoice_creation = { enabled: true };
    params.payment_intent_data = { setup_future_usage: "on_session" };
  }

  if (mode === "subscription") {
    // Stripe automatically creates customers in subscription mode
  }

  if (user?.email) {
    params.customer_email = user.email;
  }

  return params;
}

/**
 * Creates a customer portal session for subscription management
 *
 * Lets users:
 * - Update payment methods
 * - View invoices
 * - Cancel subscriptions
 * - Update billing info
 *
 * Called by: /api/stripe/portal/route.ts
 *
 * @param customerId - Stripe customer ID
 * @param returnUrl - Where to send user after they're done
 * @returns Portal URL or null if error
 */

export const createCustomerPortal = async ({
  customerId,
  returnUrl,
}: CreateCustomerPortalParams): Promise<string | null> => {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
      locale: "en",
    });

    return session.url;
  } catch (e) {
    console.error("Error creating customer portal session:", e);
    return null;
  }
};

/**
 * Gets user's current subscription info
 *
 * Returns subscription status for display in dashboard.
 * Handles three cases:
 * 1. Active subscription - return plan details
 * 2. Lifetime access (one-time payment) - return "Lifetime"
 * 3. No access - return "Free"
 *
 * Called by: Dashboard pages to show subscription status
 *
 * @param customerId - Stripe customer ID (null if never paid)
 * @param priceId - Price ID user paid for (for lifetime access check)
 * @param hasAccess - Whether user has access (from database)
 * @returns Subscription info object
 */

export const getSubscription = async (
  customerId: string | null,
  priceId: string | null,
  hasAccess: boolean,
): Promise<SubscriptionInfo> => {
  if (!customerId) {
    return { plan: "Free", status: "none" };
  }

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: "all",
    });

    const sub = subscriptions.data[0];
    if (sub) {
      const subItem = sub.items.data[0];
      const plan = config.stripe.plans.find(
        (p) => p.priceId === subItem?.price.id,
      );

      return {
        plan: plan?.name || "Subscription",
        status: sub.status as SubStatus,
        currentPeriodEnd: subItem?.current_period_end,
        cancelAtPeriodEnd: sub.cancel_at_period_end,
      };
    }

    if (hasAccess && priceId) {
      const plan = config.stripe.plans.find((p) => p.priceId === priceId);
      return { plan: plan?.name || "Lifetime", status: "active" };
    }

    return { plan: "Free", status: "none" };
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return { plan: "Free", status: "none" };
  }
};

/**
 * Checks if a webhook event was already processed
 *
 * Prevents duplicate processing if Stripe retries webhook delivery.
 * Stripe may send the same event multiple times if webhook fails.
 *
 * @param eventId - Stripe event ID
 * @returns true if already processed, false if new
 */
export async function isEventProcessed(eventId: string) {
  const { data, error } = await supabaseServer
    .from("stripe_events")
    .select("id")
    .eq("id", eventId)
    .maybeSingle();

  if (error) {
    console.error("Failed to check event id:", error);
    throw error;
  }

  return !!data;
}

/**
 * Marks a webhook event as processed
 *
 * Stores event ID in database to prevent duplicate processing.
 * Safe to call multiple times - duplicate key errors are ignored.
 *
 * @param event - Stripe webhook event
 */

export async function markEventProcessed(event: Stripe.Event) {
  const { error } = await supabaseServer.from("stripe_events").insert({
    id: event.id,
    type: event.type,
  });

  if (error) {
    // duplicate key = already processed → safe
    if (error.code !== "23505") {
      console.error("Failed to store event id:", error);
      throw error;
    }
  }
}
