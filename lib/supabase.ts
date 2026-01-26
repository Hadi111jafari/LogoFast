/**
 * Supabase Database Clients
 *
 * Two clients for different use cases:
 *
 * 1. supabaseClient (publishable key)
 *    - Used in client-side code (components, pages)
 *    - Row Level Security (RLS) enforced
 *    - Users can only access their own data
 *    - Safe to use in browser
 *
 * 2. supabaseServer (secret key)
 *    - Used in server-side code (API routes, webhooks)
 *    - Bypasses RLS - full database access
 *    - NEVER use in client components
 *    - Only use when you need admin access
 *
 * When to use which:
 * - Client components → supabaseClient
 * - API routes → supabaseServer
 * - Webhooks → supabaseServer
 * - Admin operations → supabaseServer
 *
 * Setup required:
 * - NEXT_PUBLIC_SUPABASE_URL in .env.local
 * - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local
 * - SUPABASE_SECRET_KEY in .env.local (keep this secret!)
 *
 * Learn more: https://supabase.com/docs/guides/database/overview
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Missing Supabase environment variables");
}

if (!supabaseSecretKey) {
  throw new Error("Missing Supabase secret key");
}

/**
 * Client-side Supabase client
 *
 * Use this in:
 * - React components
 * - Client-side pages
 * - Any code that runs in the browser
 *
 * Features:
 * - Respects Row Level Security (RLS) policies
 * - Users can only see/modify their own data
 * - Safe to expose to browser
 *
 * Example:
 * ```typescript
 * const { data } = await supabaseClient
 *   .from('profiles')
 *   .select('*')
 *   .eq('id', userId);
 * ```
 */
export const supabaseClient = createClient(supabaseUrl, supabasePublishableKey);

/**
 * Server-side Supabase client (admin access)
 *
 * Use this in:
 * - API routes (/app/api/*)
 * - Server actions
 * - Webhook handlers
 * - Admin operations
 *
 * ⚠️ WARNING: Bypasses all Row Level Security!
 * - Can read/write ANY data in the database
 * - Never import in client components
 * - Only use when you need admin privileges
 *
 * Example:
 * ```typescript
 * // In API route
 * const { data } = await supabaseServer
 *   .from('users')
 *   .update({ hasAccess: true })
 *   .eq('customerId', stripeCustomerId);
 * ```
 */
export const supabaseServer = createClient(supabaseUrl, supabaseSecretKey);
