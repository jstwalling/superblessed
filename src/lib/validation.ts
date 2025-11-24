import { z } from 'zod';

export enum PrayerTheme {
  Strength = 'strength',
  Peace = 'peace',
  Hope = 'hope',
}

export const SuggestRequestSchema = z.object({
  text: z.string().min(1).max(600),
});

export const SuggestResponseSchema = z.object({
  blessing: z.string().min(1).max(600),
  verse: z.string().min(1).max(240),
  reference: z.string().min(1).max(120),
  theme: z.enum(PrayerTheme),
});

export type SuggestRequest = z.infer<typeof SuggestRequestSchema>
export type SuggestResponse = z.infer<typeof SuggestResponseSchema>

// Schema for AI model output (used with generateObject) - no ID yet
export const AIResponseSchema = z.object({
  blessing: z.string().min(1).max(400),
  verse: z.string().min(1).max(240),
  reference: z.string().min(1).max(120),
  theme: z.enum(PrayerTheme),
});

export type AIResponse = z.infer<typeof AIResponseSchema>