// Basic safety utilities for input sanitization and fallbacks

const BANNED_PATTERNS = [
  /\b(?:suicide|kill\s+myself|end\s+it\s+all|hurt\s+myself)\b/i,
  /\b(?:drug|cocaine|heroin|meth)\b/i,
  /\b(?:violence|weapon|gun|bomb)\b/i,
  /(?:https?:\/\/|www\.)/i, // URLs
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, // Emails
];

export function sanitize(text: string): string {
  return text
    .replace(/[<>"'&]/g, '') // Remove HTML/script chars
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .substring(0, 600); // Enforce max length
}

export function isSafe(text: string): boolean {
  const cleanText = text.toLowerCase();
  return !BANNED_PATTERNS.some(pattern => pattern.test(cleanText));
}

export const NEUTRAL_BLESSING = "May you find peace and strength in this moment. You are loved and valued beyond measure.";

export const DEFAULT_VERSE = "\"The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.\"";

export const DEFAULT_REFERENCE = "Numbers 6:24-25";

export function clampLength(text: string, maxLength: number): string {
  return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
}