/**
 * AI Integration (Vercel AI SDK)
 *
 * Uses Vercel AI SDK with OpenAI for AI features.
 *
 * Common use cases:
 * - Generate text completions
 * - Stream AI responses
 * - Generate structured data with type safety
 *
 * Setup required:
 * - OPENAI_API_KEY in .env.local
 * - OpenAI account with credits
 *
 * NOTE: Pick based on your use case and budget.
 *
 * Learn more: https://ai-sdk.dev/docs
 */

import { streamText, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required");
}

/**
 * Example 1: Basic text generation
 *
 * Generate a single text response (non-streaming).
 * Use for short responses where you need the full text at once.
 *
 * @example
 * ```typescript
 * const { text } = await generateText({
 *   model: openai("gpt-4o-mini"),
 *   prompt: "What is love?",
 * });
 * console.log(text);
 * ```
 */

/**
 * Example 2: Streaming text generation
 *
 * Stream AI responses word-by-word (better UX for long responses).
 * Use for chat interfaces or long-form content.
 *
 * @example
 * ```typescript
 * const result = streamText({
 *   model: openai("gpt-5.2"),
 *   prompt: "Invent a new holiday and describe its traditions.",
 * });
 *
 * for await (const textPart of result.textStream) {
 *   console.log(textPart);
 * }
 * ```
 */

/**
 * Example 3: Structured output (type-safe)
 *
 * Generate JSON objects with schema validation.
 * Use when you need structured data, not just text.
 *
 * @example
 * import { Output } from "ai";
 *
 * const result = await generateText({
 *   model: openai("gpt-5.2"),
 *   output: Output.object({
 *     schema: z.object({
 *       recipe: z.object({
 *         name: z.string(),
 *         ingredients: z.array(
 *           z.object({
 *             name: z.string(),
 *             amount: z.string()
 *           }),
 *         ),
 *         steps: z.array(z.string()),
 *       }),
 *     }),
 *   }),
 *   prompt: "Generate a lasagna recipe.",
 * });
 *
 * // Access the structured output
 * console.log(result._output);
 */

/**
 * Build your AI features here
 *
 * Examples:
 * - Chat assistant
 * - Content generator
 * - Data extractor
 * - Code helper
 * - Translation service
 */
