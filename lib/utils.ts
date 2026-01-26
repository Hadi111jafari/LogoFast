/**
 * Utility Functions
 *
 * Common helper functions used throughout the app.
 *
 * Functions:
 * - cn: Merge Tailwind classes intelligently
 * - getInitials: Extract initials from names
 * - formatDate: Format Unix timestamps to readable dates
 *
 * Add your own utility functions here as needed.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes intelligently
 *
 * Handles conditional classes and prevents conflicts.
 * Uses clsx for conditionals and tailwind-merge to resolve conflicts.
 *
 * Example:
 * ```tsx
 * // Basic usage
 * cn("px-4 py-2", "bg-blue-500")
 * // → "px-4 py-2 bg-blue-500"
 *
 * // Conditional classes
 * cn("px-4", isActive && "bg-blue-500")
 * // → "px-4 bg-blue-500" (if isActive is true)
 *
 * // Resolves conflicts (later class wins)
 * cn("px-4 py-2", "px-8")
 * // → "py-2 px-8"
 * ```
 *
 * @param inputs - Class values (strings, objects, arrays)
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts initials from a name
 *
 * Takes first letter of each word, max 2 letters.
 * Used for avatar placeholders when no image is available.
 *
 * Example:
 * ```typescript
 * getInitials("John Doe")        // → "JD"
 * getInitials("Mary Jane Watson") // → "MJ"
 * getInitials("Prince")           // → "P"
 * ```
 *
 * @param name - Full name string
 * @returns 1-2 uppercase letters
 */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Formats Unix timestamp to readable date
 *
 * Converts Stripe timestamps (seconds since epoch) to formatted dates.
 * Output format: "Jan 15, 2024"
 *
 * Example:
 * ```typescript
 * formatDate(1705276800) // → "Jan 15, 2024"
 * ```
 *
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted date string
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
