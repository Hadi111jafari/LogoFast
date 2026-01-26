/**
 * Auth0 Authentication Client
 *
 * Handles user authentication and session management.
 *
 * How authentication works:
 * 1. User clicks login button (ButtonLogin.tsx)
 * 2. Redirected to Auth0 login page
 * 3. After login, redirected back to your app
 * 4. Session stored in encrypted cookie
 * 5. Use auth0.getSession() to check if user is logged in
 *
 * Common operations:
 * - Check if logged in: auth0.getSession()
 * - Get user info: session?.user
 * - Protect routes: Check session in page/layout
 *
 * Setup required:
 * - AUTH0_SECRET in .env.local
 * - AUTH0_BASE_URL in .env.local
 * - AUTH0_ISSUER_BASE_URL in .env.local
 * - AUTH0_CLIENT_ID in .env.local
 * - AUTH0_CLIENT_SECRET in .env.local
 *
 * Auth0 setup:
 * 1. Create application in Auth0 dashboard
 * 2. Set callback URLs
 * 3. Copy credentials to .env.local
 *
 * Example usage:
 * ```typescript
 * // In a server component or API route
 * const session = await auth0.getSession();
 * if (!session) {
 *   redirect('/auth/login');
 * }
 * const user = session.user;
 * ```
 *
 * Learn more: https://auth0.com/docs/quickstart/webapp/nextjs
 */

import { Auth0Client } from "@auth0/nextjs-auth0/server";

/**
 * Auth0 client instance
 *
 * Used throughout the app for:
 * - Getting user session
 * - Protecting routes
 * - Accessing user profile
 *
 * The client is pre-configured using environment variables.
 * No additional setup needed after .env.local is configured.
 */
export const auth0 = new Auth0Client();
