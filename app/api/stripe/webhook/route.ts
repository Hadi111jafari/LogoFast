/**
 * Stripe Webhook Handler
 *
 * Receives events from Stripe when payments/subscriptions change.
 * This is how we know when users pay, cancel, or have failed payments.
 *
 * Critical Events Handled:
 * - checkout.session.completed → User completed payment
 * - customer.subscription.deleted → User cancelled subscription
 * - invoice.paid → Recurring payment succeeded
 * - invoice.payment_failed → Payment failed
 * - customer.subscription.updated → User changed plans
 * - checkout.session.expired → User abandoned checkout
 *
 * Setup Required:
 * 1. Add webhook endpoint in Stripe Dashboard:
 *    https://dashboard.stripe.com/webhooks
 * 2. Set endpoint URL: https://yourdomain.com/api/stripe/webhook
 * 3. Select events to listen for (listed above)
 * 4. Copy webhook signing secret to STRIPE_WEBHOOK_SECRET
 *
 * Security:
 * - Verifies webhook signature (proves it's from Stripe)
 * - Idempotency check (prevents duplicate processing)
 * - Only processes each event once
 *
 * Database Updates:
 * - Grants/revokes has_access flag
 * - Stores customer_id and price_id
 * - Links Stripe customer to user profile
 *
 * Email Notifications:
 * - Purchase confirmation
 * - Payment receipts
 * - Cancellation notices
 * - Failed payment alerts
 *
 * Learn more: https://stripe.com/docs/webhooks
 */

import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { supabaseServer } from "@/lib/supabase";
import { isEventProcessed, markEventProcessed } from "@/lib/stripe";
import { config } from "@/config";
import {
  sendPurchaseConfirmation,
  sendRecurringPaymentReceipt,
  sendSubscriptionCancelled,
  sendPaymentFailed,
} from "@/lib/resend";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

if (!STRIPE_WEBHOOK_SECRET) {
  throw new Error(
    "STRIPE_WEBHOOK_SECRET is not defined in environment variables",
  );
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

/**
 * POST /api/stripe/webhook
 *
 * Receives and processes Stripe webhook events.
 *
 * Flow:
 * 1. Verify webhook signature (security)
 * 2. Check if event already processed (idempotency)
 * 3. Mark event as processed
 * 4. Handle event based on type
 * 5. Return success response
 *
 * Important: Always return 200 OK to Stripe, even if processing fails.
 * Stripe will retry failed webhooks automatically.
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  // Verify webhook came from Stripe
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    // Verify signature to prevent fake webhooks
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`⚠️ Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  // Prevent duplicate processing (Stripe may retry webhooks)
  const alreadyProcessed = await isEventProcessed(event.id);
  if (alreadyProcessed) {
    console.log(`ℹ️ Event already processed: ${event.id}`);
    return NextResponse.json({ received: true });
  }

  // Mark event as processed before handling (prevents race conditions)
  await markEventProcessed(event);

  try {
    // Route event to appropriate handler
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;

      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case "checkout.session.expired":
        await handleCheckoutExpired(
          event.data.object as Stripe.Checkout.Session,
        );
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
    return NextResponse.json({ received: true });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.error("❌ Stripe webhook error:", errorMessage);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}

/**
 * Handles successful checkout completion
 *
 * When: User completes payment (first purchase or one-time payment)
 *
 * Actions:
 * 1. Extract customer and price info from session
 * 2. Grant access (has_access = true)
 * 3. Store Stripe customer_id and price_id
 * 4. Send purchase confirmation email
 *
 * Database update:
 * - customer_id: Links to Stripe customer
 * - price_id: Which plan they bought
 * - has_access: true (grants access to app)
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log(`✅ Processing checkout completion for session: ${session.id}`);

  let fullSession: Stripe.Checkout.Session;

  try {
    // Fetch full session with line items (not always in webhook payload)
    fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items", "customer"],
    });
  } catch (err) {
    console.warn(
      `⚠️ Failed to retrieve session ${session.id}, using event data`,
    );
    fullSession = session;
  }

  // Extract payment details
  const customerId =
    typeof fullSession.customer === "string"
      ? fullSession.customer
      : fullSession.customer?.id;
  const priceId = fullSession.line_items?.data[0]?.price?.id;
  const userId = fullSession.client_reference_id; // Set in checkout creation
  const amountTotal = fullSession.amount_total
    ? fullSession.amount_total / 100 // Convert cents to dollars
    : 0;

  // Validate required data
  if (!userId || !priceId) {
    console.error("❌ Missing required data:", {
      userId,
      priceId,
      customerId,
      sessionId: session.id,
    });
    return;
  }

  // Find plan details from config
  const plan = config.stripe.plans.find((p) => p.priceId === priceId);
  if (!plan) {
    console.error(`❌ Unknown priceId: ${priceId}`);
    return;
  }

  // Grant access to user
  const { error } = await supabaseServer
    .from("profiles")
    .update({
      customer_id: customerId,
      price_id: priceId,
      has_access: true, // This is what grants access
    })
    .eq("id", userId);

  if (error) {
    console.error("❌ Failed to update profile:", error);
    throw error;
  }

  console.log(
    `✅ Access granted to user ${userId} for plan ${plan.name || priceId}`,
  );

  // Get user info for email
  const { data: profile } = await supabaseServer
    .from("profiles")
    .select("email, name")
    .eq("id", userId)
    .single();

  // Send confirmation email (optional - won't fail webhook if email fails)
  if (profile?.email) {
    console.log(
      `Sending purchase confirmation to user: ${profile?.name || profile?.email}`,
    );
    try {
      await sendPurchaseConfirmation(
        profile.email,
        profile.name || profile.email,
        plan.name,
        amountTotal,
      );
      console.log(`📧 Purchase confirmation sent to ${profile.email}`);
    } catch (emailError) {
      console.error("❌ Failed to send purchase email:", emailError);
      // Email failure doesn't stop webhook processing
    }
  }
}

/**
 * Handles subscription cancellation
 *
 * When: User cancels their subscription in Stripe
 *
 * Actions:
 * 1. Find user by Stripe customer_id
 * 2. Revoke access (has_access = false)
 * 3. Send cancellation email
 *
 * Note: This fires when subscription ends, not when user clicks "cancel"
 * If cancel_at_period_end is true, this fires at period end
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;
  console.log(`🔒 Revoking access for customer: ${customerId}`);

  // Find user profile by Stripe customer ID
  const { data: profile, error: fetchError } = await supabaseServer
    .from("profiles")
    .select("email, name, price_id")
    .eq("customer_id", customerId)
    .maybeSingle();

  if (fetchError) {
    console.error("❌ Failed to fetch profile:", fetchError);
    return;
  }

  if (!profile) {
    console.error("❌ No profile found for customer:", customerId);
    return;
  }

  // Revoke access
  const { error } = await supabaseServer
    .from("profiles")
    .update({ has_access: false })
    .eq("customer_id", customerId);

  if (error) {
    console.error("❌ Failed to revoke access:", error);
    throw error;
  }

  console.log(`✅ Access revoked for customer ${customerId}`);

  // Notify user about cancellation
  if (profile?.email) {
    const plan = config.stripe.plans.find(
      (p) => p.priceId === profile.price_id,
    );

    console.log(
      `Sending cancellation email to user: ${profile?.name || profile?.email}`,
    );
    try {
      await sendSubscriptionCancelled(
        profile.email,
        profile.name || profile.email,
        plan?.name || "your plan",
      );
      console.log(`📧 Cancellation email sent to ${profile.email}`);
    } catch (emailError) {
      console.error("❌ Failed to send cancellation email:", emailError);
    }
  }
}

/**
 * Handles successful recurring payment
 *
 * When: Stripe charges user for subscription renewal
 *
 * Actions:
 * 1. Verify payment is for correct plan
 * 2. Ensure access is granted (in case it was revoked)
 * 3. Send payment receipt
 *
 * Note: Also fires for first payment in subscription mode
 * (checkout.session.completed fires too, so we grant access in both)
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id;

  if (!customerId) {
    console.error("Invoice has no customer ID");
    return;
  }

  const lineItem = invoice.lines.data[0];

  if (!lineItem) {
    console.error("Invoice has no line items");
    return;
  }

  // Extract price ID from invoice line item
  const priceId =
    typeof lineItem.pricing === "object" &&
    lineItem.pricing?.type === "price_details"
      ? lineItem.pricing.price_details?.price
      : null;

  if (!priceId || !lineItem) {
    console.error("Missing priceId or line item in invoice");
    return;
  }

  console.log(`💰 Processing invoice payment for customer: ${customerId}`);

  const { data: profile, error: fetchError } = await supabaseServer
    .from("profiles")
    .select("price_id, email, name")
    .eq("customer_id", customerId)
    .maybeSingle();

  if (fetchError) {
    console.error("❌ Failed to fetch profile:", fetchError);
    return;
  }

  if (!profile) {
    console.error("❌ No profile found for customer:", customerId);
    return;
  }

  // Verify user is being charged for their current plan
  if (profile?.price_id !== priceId) {
    console.error("❌ Invoice priceId mismatch:", {
      expected: profile?.price_id,
      received: priceId,
    });
    return;
  }

  // Ensure access is granted (in case it was accidentally revoked)
  const { error: updateError } = await supabaseServer
    .from("profiles")
    .update({ has_access: true })
    .eq("customer_id", customerId);

  if (updateError) {
    console.error("❌ Failed to grant access:", updateError);
    throw updateError;
  }

  console.log(`✅ Access granted for recurring payment: ${customerId}`);

  // Send payment receipt
  if (profile?.email && invoice.amount_paid) {
    const plan = config.stripe.plans.find((p) => p.priceId === priceId);
    const amount = invoice.amount_paid / 100; // Convert cents to dollars

    console.log(
      `Sending payment receipt to user: ${profile?.name || profile?.email}`,
    );
    try {
      await sendRecurringPaymentReceipt(
        profile.email,
        profile.name || profile.email,
        plan?.name || "your plan",
        amount,
      );
      console.log(`📧 Payment receipt sent to ${profile.email}`);
    } catch (emailError) {
      console.error("❌ Failed to send receipt email:", emailError);
    }
  }
}

/**
 * Handles failed payment
 *
 * When: Stripe cannot charge user's payment method
 *
 * Actions:
 * 1. Log the failure
 * 2. Send payment failure notification to user
 *
 * Note: Don't revoke access immediately - Stripe retries failed payments
 * Access is revoked when subscription is deleted (after all retries fail)
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id;

  if (!customerId) {
    console.error("Invoice has no customer ID");
    return;
  }

  const lineItem = invoice.lines.data[0];

  if (!lineItem) {
    console.error("Invoice has no line items");
    return;
  }

  const priceId =
    typeof lineItem.pricing === "object" &&
    lineItem.pricing?.type === "price_details"
      ? lineItem.pricing.price_details?.price
      : null;

  console.log(`⚠️ Payment failed for customer: ${customerId}`);

  const { data: profile, error } = await supabaseServer
    .from("profiles")
    .select("email, name, price_id")
    .eq("customer_id", customerId)
    .maybeSingle();

  if (error) {
    console.error("❌ Failed to fetch profile:", error);
    return;
  }

  if (!profile) {
    console.error("❌ No profile found for customer:", customerId);
    return;
  }

  // Notify user so they can update payment method
  if (profile?.email && invoice.amount_due) {
    const plan = config.stripe.plans.find(
      (p) => p.priceId === (priceId || profile.price_id),
    );
    const amount = invoice.amount_due / 100;

    console.log(
      `Sending payment failure notification to user: ${profile?.name || profile?.email}`,
    );
    try {
      await sendPaymentFailed(
        profile.email,
        profile.name || profile.email,
        plan?.name || "your plan",
        amount,
      );
      console.log(`📧 Payment failure notification sent to ${profile.email}`);
    } catch (emailError) {
      console.error("❌ Failed to send payment failure email:", emailError);
    }
  }
}

/**
 * Handles expired checkout session
 *
 * When: User starts checkout but doesn't complete it within 24 hours
 *
 * Actions:
 * - Log the event (for analytics)
 * - No database changes needed (user never paid)
 *
 * Use case: Track abandoned checkouts for marketing
 */
async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  console.log(`⏱️ Checkout session expired: ${session.id}`);
  // No database update needed - user never completed payment
  // You can add analytics tracking here if needed
}

/**
 * Handles subscription plan change
 *
 * When: User upgrades/downgrades their subscription in customer portal
 *
 * Actions:
 * 1. Update price_id to new plan
 * 2. Update has_access based on subscription status
 *
 * Note: Stripe handles proration automatically
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;

  const newPriceId = subscription.items.data[0]?.price.id;

  if (!newPriceId) {
    console.error("❌ No price found in subscription update");
    return;
  }

  console.log(`🔄 Subscription updated for customer: ${customerId}`);

  const { data: profile, error: fetchError } = await supabaseServer
    .from("profiles")
    .select("email, name, price_id")
    .eq("customer_id", customerId)
    .maybeSingle();

  if (fetchError) {
    console.error("❌ Failed to fetch profile:", fetchError);
    return;
  }

  if (!profile) {
    console.error("❌ No profile found for customer:", customerId);
    return;
  }

  // Update to new plan
  const { error } = await supabaseServer
    .from("profiles")
    .update({
      price_id: newPriceId,
      has_access: subscription.status === "active", // Grant/revoke based on status
    })
    .eq("customer_id", customerId);

  if (error) {
    console.error("❌ Failed to update subscription:", error);
    throw error;
  }

  const newPlan = config.stripe.plans.find((p) => p.priceId === newPriceId);
  console.log(`✅ Subscription updated to ${newPlan?.name || newPriceId}`);
}
