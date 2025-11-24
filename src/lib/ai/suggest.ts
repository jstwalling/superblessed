import { generateObject } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import type { SuggestRequest, AIResponse } from '@/lib/validation';
import { AIResponseSchema, PrayerTheme } from '@/lib/validation';
import { sanitize, isSafe, NEUTRAL_BLESSING, DEFAULT_VERSE, DEFAULT_REFERENCE, clampLength } from '@/lib/safety';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export function buildPrompt(request: SuggestRequest): string {
  const sanitizedText = sanitize(request.text);
  const themeInstruction = 'Choose the most appropriate theme based on the user\'s text';

  return `Create a personalized blessing based on the user's input. ${themeInstruction}.

User's request: "${sanitizedText}"

Requirements:
- Provide a warm, encouraging blessing (2-3 sentences max, under 400 characters)
- Include exactly one relevant Bible verse (under 240 characters)
- Provide the Bible reference (under 120 characters)
- Choose theme: strength (for courage/overcoming), peace (for comfort/calm), or hope (for encouragement/future)
- Avoid medical advice, legal counsel, or therapeutic language
- Keep it concise, safe, and spiritually uplifting`;
}

function getFallbackTheme(userText: string): PrayerTheme {
  const text = userText.toLowerCase();
  
  if (text.includes('strong') || text.includes('courage') || text.includes('brave') || text.includes('overcome')) {
    return PrayerTheme.Strength;
  }
  if (text.includes('worry') || text.includes('anxious') || text.includes('calm') || text.includes('peace')) {
    return PrayerTheme.Peace;  
  }
  
  return PrayerTheme.Hope; // Default fallback
}

export async function buildSuggestResponse(request: SuggestRequest): Promise<AIResponse> {
  const sanitizedText = sanitize(request.text);
  
  // Safety check - use fallback if unsafe
  if (!isSafe(sanitizedText)) {
    return {
      blessing: NEUTRAL_BLESSING,
      verse: DEFAULT_VERSE,
      reference: DEFAULT_REFERENCE,
      theme: PrayerTheme.Hope,
    };
  }

  try {
    const prompt = buildPrompt(request);
    
    const result = await generateObject({
      model: openrouter.chat('openai/gpt-4.1-mini'),
      prompt,
      schema: AIResponseSchema,
      temperature: 0.7,
    });

    // The result.object is already validated by the schema
    const aiResponse = result.object;
    
    // Apply additional safety and length constraints
    return {
      blessing: clampLength(sanitize(aiResponse.blessing), 400),
      verse: clampLength(sanitize(aiResponse.verse), 240),
      reference: clampLength(sanitize(aiResponse.reference), 120),
      theme: aiResponse.theme
    };
  } catch (error) {
    console.error('AI generation failed:', error);
  }

  return {
    blessing: NEUTRAL_BLESSING,
    verse: DEFAULT_VERSE,
    reference: DEFAULT_REFERENCE,
    theme: getFallbackTheme(sanitizedText),
  };
}