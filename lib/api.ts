/**
 * API Client
 *
 * Configured Axios instance for making API calls to your backend.
 *
 * Features:
 * - Auto-prefixes requests with /api
 * - 30-second timeout
 * - Automatic error handling with toast notifications
 * - Redirects to login on 401 (unauthorized)
 * - Shows user-friendly error messages
 *
 * Usage:
 * ```typescript
 * import apiClient from "@/lib/api";
 *
 * // GET request
 * const data = await apiClient.get("/user");
 *
 * // POST request
 * const result = await apiClient.post("/lead", { email });
 * ```
 *
 * Error handling:
 * - 401: Redirects to login page
 * - 403: Shows paywall message
 * - Other: Shows error from server or generic message
 * - All errors show toast notification automatically
 */
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { config } from "@/config";

/**
 * Pre-configured API client
 *
 * Base configuration:
 * - Base URL: /api (all requests go to your Next.js API routes)
 * - Timeout: 30 seconds
 * - Content-Type: application/json
 */
const apiClient = axios.create({
  baseURL: "/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Response interceptor
 *
 * Handles all API errors automatically:
 * - Extracts error messages from response
 * - Shows toast notifications
 * - Redirects to login if unauthorized
 * - Returns clean data on success
 */
apiClient.interceptors.response.use(
  (res) => res.data,
  (err: AxiosError<{ error?: string }>) => {
    const status = err.response?.status;

    if (status === 401) {
      toast.error(err.message);
      window.location.href = `${config.auth.loginUrl}?returnTo=${config.auth.returnTo}`;
      return Promise.reject(err);
    }

    const message =
      status === 403
        ? err.response?.data?.error || "Pick a plan to use this feature"
        : err.response?.data?.error || err.message || "Something went wrong";

    console.error("API Error:", message);
    toast.error(message);
    return Promise.reject(err);
  },
);

export default apiClient;
