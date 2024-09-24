import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received body:', body);  // Log the entire body

    const { prompt } = body;  // Destructure the 'prompt' from the body
    console.log('Received prompt:', prompt);  // Log the received prompt

    if (!prompt) {
      console.log('No prompt provided');
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Cohere API interaction or further processing
    return NextResponse.json({ suggestion: 'Mock response for testing' });  // Temporary mock for testing

  } catch (error) {
    console.error('Error fetching suggestion:', error);
    return NextResponse.json({ error: 'Error fetching suggestion' }, { status: 500 });
  }
}
