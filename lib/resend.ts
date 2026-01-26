/**
 * Resend Email Service
 *
 * Handles all transactional emails in the app.
 *
 * Email types:
 * - Welcome emails (new signups)
 * - Payment receipts (successful payments)
 * - Subscription confirmations (new subscriptions)
 * - Renewal receipts (recurring payments)
 * - Cancellation notices
 * - Payment failure alerts
 * - Support requests
 * - Waitlist confirmations
 *
 * When to send emails:
 * - Welcome: After user signs up
 * - Receipt: After one-time payment
 * - Confirmation: After subscription starts
 * - Renewal: When subscription renews
 * - Cancellation: When user cancels subscription
 * - Payment failed: When payment method fails
 * - Support: When user submits support form
 * - Waitlist: When user joins waitlist
 *
 * Setup required:
 * - RESEND_API_KEY in .env.local
 * - Verify your domain in Resend dashboard
 * - Configure fromAdmin and supportEmail in config.ts
 *
 * Resend setup:
 * 1. Create account at resend.com
 * 2. Add and verify your domain
 * 3. Generate API key
 * 4. Add key to .env.local
 *
 * Learn more: https://resend.com/docs
 */

import { Resend } from "resend";
import { config } from "@/config";
import { SendEmailParams } from "@/types/resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

/**
 * @NOTE: Ensure the API key is set, otherwise emails won't work
 */

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in environment variables");
}

/**
 * Resend client instance
 * Pre-configured with your API key
 */
export const resend = new Resend(RESEND_API_KEY);

/**
 * Generic email sender
 *
 * Use this for custom emails not covered by helper functions below.
 * All other email functions use this internally.
 *
 * @param to - Recipient email address
 * @param subject - Email subject line
 * @param text - Plain text version (fallback)
 * @param html - HTML version (primary)
 * @param replyTo - Optional reply-to address
 * @returns Resend response data
 */
export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  replyTo,
}: SendEmailParams) => {
  const { data, error } = await resend.emails.send({
    from: config.resend.fromAdmin,
    to,
    subject,
    text,
    html,
    ...(replyTo && { replyTo }),
  });

  if (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }

  return data;
};

/**
 * Sends welcome email to new users
 *
 * Trigger: After successful signup
 *
 * @param userEmail - New user's email
 * @param userName - New user's name
 */
export const sendWelcomeEmail = async (userEmail: string, userName: string) => {
  await sendEmail({
    to: userEmail,
    subject: `Welcome to ${config.name}! 🎉`,
    text: `Hi ${userName},\n\nWe're excited to have you here! Your account is ready to go.\n\nLog in anytime at ${config.siteUrl}/dashboard\n\nIf you have questions, just reply to this email.\n\nCheers,\nThe ${config.name} Team`,
    html: `
      <h1>Welcome aboard, ${userName}! 🎉</h1>
      <p>We're excited to have you here. Your account is all set up and ready to go.</p>
      <p><a href="${config.siteUrl}/dashboard">Get Started</a></p>
      <p>Questions? Just reply to this email—we're here to help.</p>
      <p>Cheers,<br/>The ${config.name} Team</p>
    `,
  });
};

/**
 * Sends receipt for one-time payments
 *
 * Trigger: After successful one-time payment
 * Call it from: Stripe webhook (checkout.session.completed)
 *
 * @param userEmail - Customer's email
 * @param amount - Payment amount in dollars
 * @param planName - Name of purchased plan
 */
export const sendReceiptEmail = async (
  userEmail: string,
  amount: number,
  planName: string,
) => {
  await sendEmail({
    to: userEmail,
    subject: `Payment received - ${config.name}`,
    text: `Hi there,\n\nYour payment of $${amount} for the ${planName} plan was successful.\n\nYou're all set! Access your account anytime at ${config.siteUrl}/dashboard\n\nThanks for your business!\n\nThe ${config.name} Team`,
    html: `
      <h2>Payment Received ✓</h2>
      <p>Your payment was successful. Here are the details:</p>
      <p><strong>Amount:</strong> $${amount}</p>
      <p><strong>Plan:</strong> ${planName}</p>
      <p>You're all set! <a href="${config.siteUrl}/dashboard">Access your account</a></p>
      <p>Thanks for your business!</p>
      <p>The ${config.name} Team</p>
    `,
  });
};

/**
 * Sends support request to your support email
 *
 * Trigger: User submits support form
 * Call it from: Support form submission
 *
 * @param userEmail - User's email (set as reply-to)
 * @param userName - User's name
 * @param message - Support request message
 */
export const sendSupportRequest = async (
  userEmail: string,
  userName: string,
  message: string,
) => {
  await sendEmail({
    to: config.resend.supportEmail,
    subject: `Support: ${userName}`,
    text: `From: ${userName} (${userEmail})\n\n${message}`,
    html: `
      <h3>Support Request</h3>
      <p><strong>From:</strong> ${userName}</p>
      <p><strong>Email:</strong> ${userEmail}</p>
      <hr>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
    replyTo: userEmail,
  });
};

/**
 * Sends confirmation email for new subscriptions
 *
 * Triggered: After subscription is created
 * Called from: Stripe webhook (customer.subscription.created)
 *
 * @param userEmail - Subscriber's email
 * @param userName - Subscriber's name
 * @param planName - Subscription plan name
 * @param amount - Subscription amount in dollars
 */
export const sendPurchaseConfirmation = async (
  userEmail: string,
  userName: string,
  planName: string,
  amount: number,
) => {
  await sendEmail({
    to: userEmail,
    subject: `You're all set with ${planName}! 🎉`,
    text: `Hi ${userName},\n\nYour subscription to ${planName} is now active. We charged $${amount} to your payment method.\n\nReady to dive in? Log in at ${config.siteUrl}/dashboard\n\nThanks for subscribing!\n\nThe ${config.name} Team`,
    html: `
      <h1>You're all set, ${userName}! 🎉</h1>
      <p>Your subscription to <strong>${planName}</strong> is now active.</p>
      <p><strong>Amount charged:</strong> $${amount}</p>
      <p>Ready to dive in? <a href="${config.siteUrl}/dashboard">Access your account</a></p>
      <p>Thanks for subscribing!</p>
      <p>The ${config.name} Team</p>
    `,
  });
};

/**
 * Sends receipt for recurring subscription payments
 *
 * Triggered: When subscription renews
 * Called from: Stripe webhook (invoice.payment_succeeded)
 *
 * @param userEmail - Subscriber's email
 * @param userName - Subscriber's name
 * @param planName - Subscription plan name
 * @param amount - Payment amount in dollars
 */
export const sendRecurringPaymentReceipt = async (
  userEmail: string,
  userName: string,
  planName: string,
  amount: number,
) => {
  await sendEmail({
    to: userEmail,
    subject: `Your ${planName} subscription has renewed`,
    text: `Hi ${userName},\n\nYour ${planName} subscription has renewed successfully. We charged $${amount} to your payment method.\n\nView your billing details anytime at ${config.siteUrl}/dashboard/account\n\nThanks for being with us!\n\nThe ${config.name} Team`,
    html: `
      <h2>Subscription Renewed ✓</h2>
      <p>Hi ${userName},</p>
      <p>Your ${planName} subscription has renewed successfully. We charged $${amount} to your payment method.</p>
      <p><strong>Plan:</strong> ${planName}</p>
      <p><strong>Amount charged:</strong> $${amount}</p>
      <p><a href="${config.siteUrl}/dashboard/account">View billing details</a></p>
      <p>Thanks for being with us!</p>
      <p>The ${config.name} Team</p>
    `,
  });
};

/**
 * Sends cancellation confirmation email
 *
 * Triggered: When user cancels subscription
 * Called from: Stripe webhook (customer.subscription.deleted)
 *
 * @param userEmail - User's email
 * @param userName - User's name
 * @param planName - Cancelled plan name
 */
export const sendSubscriptionCancelled = async (
  userEmail: string,
  userName: string,
  planName: string,
) => {
  await sendEmail({
    to: userEmail,
    subject: `Your ${planName} subscription has been cancelled`,
    text: `Hi ${userName},\n\nYour ${planName} subscription has been cancelled. You'll still have access until the end of your current billing period.\n\nIf you change your mind, you can resubscribe anytime at ${config.siteUrl}/dashboard/account\n\nSorry to see you go!\n\nThe ${config.name} Team`,
    html: `
      <h2>Subscription Cancelled</h2>
      <p>Hi ${userName},</p>
      <p>Your ${planName} subscription has been cancelled. You'll still have access until the end of your current billing period.</p>
      <p>If you change your mind, you can <a href="${config.siteUrl}/dashboard/account">resubscribe anytime</a>.</p>
      <p>Sorry to see you go!</p>
      <p>The ${config.name} Team</p>
    `,
  });
};

/**
 * Sends payment failure alert
 *
 * Triggered: When subscription payment fails
 * Called from: Stripe webhook (invoice.payment_failed)
 *
 * @param userEmail - User's email
 * @param userName - User's name
 * @param planName - Subscription plan name
 * @param amount - Failed payment amount
 */
export const sendPaymentFailed = async (
  userEmail: string,
  userName: string,
  planName: string,
  amount: number,
) => {
  await sendEmail({
    to: userEmail,
    subject: `Action needed: Payment for ${planName} failed`,
    text: `Hi ${userName},\n\nWe couldn't process your payment of $${amount} for ${planName}.\n\nPlease update your payment method at ${config.siteUrl}/dashboard/account to keep your subscription active.\n\nThe ${config.name} Team`,
    html: `
      <h2>Payment Failed ⚠️</h2>
      <p>Hi ${userName},</p>
      <p>We couldn't process your payment of $${amount} for ${planName}.</p>
      <p>Please <a href="${config.siteUrl}/dashboard/account">update your payment method</a> to keep your subscription active.</p>
      <p>The ${config.name} Team</p>
    `,
  });
};

/**
 * Sends waitlist confirmation email
 *
 * Triggered: User joins waitlist
 * Called from: /api/lead/route.ts
 *
 * @param userEmail - User's email
 */
export const sendWaitlistConfirmation = async (userEmail: string) => {
  await sendEmail({
    to: userEmail,
    subject: `You're on the list! 🎉`,
    text: `Thanks for joining the waitlist!\n\nWe'll email you as soon as we launch.\n\nThe ${config.name} Team`,
    html: `
      <h1>You're on the waitlist! 🎉</h1>
      <p>Thanks for your interest. We'll email you as soon as we launch.</p>
      <p>The ${config.name} Team</p>
    `,
  });
};
