/**
 * Waitlist API Endpoint
 *
 * Handles waitlist signups and lead counting.
 *
 * Endpoints:
 * - GET  /api/lead → Get total waitlist count
 * - POST /api/lead → Add email to waitlist
 *
 * Used by:
 * - Lead.tsx component (waitlist form)
 *
 * Database table: leads
 * Columns: id, email, created_at
 *
 * Features:
 * - Email validation
 * - Duplicate prevention
 * - Confirmation email (optional, won't fail if email service is down)
 */

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { sendWaitlistConfirmation } from "@/lib/resend";

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * GET /api/lead
 *
 * Returns the total number of waitlist signups
 *
 * Response:
 * - 200: { count: number }
 * - 500: { error: string }
 *
 * Example:
 * ```typescript
 * const res = await fetch('/api/lead');
 * const { count } = await res.json();
 * console.log(`${count} people on waitlist`);
 * ```
 */
export async function GET() {
  const { data, error } = await supabaseServer
    .from("leads")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch lead count" },
      { status: 500 },
    );
  }

  return NextResponse.json({ count: data?.length ?? 0 });
}

/**
 * POST /api/lead
 *
 * Adds an email to the waitlist
 *
 * Request body:
 * ```json
 * { "email": "user@example.com" }
 * ```
 *
 * Responses:
 * - 201: { success: true } - Email added successfully
 * - 400: { error: string } - Invalid email or missing
 * - 409: { error: "Email already exists" } - Duplicate email
 * - 500: { error: string } - Server error
 *
 * Process:
 * 1. Validate email format
 * 2. Insert into database (fails if duplicate)
 * 3. Send confirmation email (optional - won't fail request)
 *
 * Example:
 * ```typescript
 * const res = await fetch('/api/lead', {
 *   method: 'POST',
 *   body: JSON.stringify({ email: 'user@example.com' })
 * });
 * ```
 */
export async function POST(req: Request) {
  let body: { email?: string };

  // Parse request body
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Normalize email: trim whitespace and lowercase
  const email = body.email?.trim().toLowerCase();

  // Validate email is provided
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Validate email format
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 },
    );
  }

  // Insert email into database
  const { error } = await supabaseServer.from("leads").insert({ email });

  if (error) {
    // Error code 23505 = unique constraint violation (duplicate email)
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 },
    );
  }

  // Send confirmation email (non-blocking - won't fail the request)
  try {
    await sendWaitlistConfirmation(email);
    console.log(`📧 Waitlist confirmation sent to ${email}`);
  } catch (emailError) {
    console.error("❌ Failed to send waitlist email:", emailError);
    // Email failure doesn't affect signup success
    // User is still added to waitlist even if email fails
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
