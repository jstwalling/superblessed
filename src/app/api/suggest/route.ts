import { NextRequest, NextResponse } from 'next/server';
import { SuggestRequestSchema, SuggestResponseSchema } from '@/lib/validation';
import { buildSuggestResponse } from '@/lib/ai/suggest';

export async function POST(request: NextRequest) {
  try {
    // Check for OpenRouter API key
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedRequest = SuggestRequestSchema.parse(body);

    // Generate the suggestion
    const suggestion = await buildSuggestResponse(validatedRequest);

    // Validate the response before returning
    const validatedResponse = SuggestResponseSchema.parse(suggestion);

    return NextResponse.json(validatedResponse);

  } catch (error) {
    // Handle validation errors
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Invalid request format', details: error.message },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('Suggest API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}