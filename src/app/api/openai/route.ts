import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received body:', body);

    const { prompt } = body;  // Destructure the 'prompt' from the body
    console.log('Received prompt:', prompt);

    if (!prompt) {
      console.log('No prompt provided');
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.COHERE_API_KEY;  // Ensure the correct API key is used
    if (!apiKey) {
      console.log('Cohere API key not set');
      return NextResponse.json({ error: 'API key not set' }, { status: 500 });
    }

    console.log('Sending request to Cohere with prompt:', prompt);
    const response = await fetch('https://api.cohere.ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,  // Pass the API key
      },
      body: JSON.stringify({
        model: 'command-xlarge-nightly',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    console.log('Cohere API response:', data);

    if (!data.text) {  // Adjusting for the correct response structure
      console.error('Error: No text returned from Cohere');
      return NextResponse.json({ error: 'No text returned from Cohere' }, { status: 500 });
    }

    // Return the suggestion from the Cohere response
    return NextResponse.json({ suggestion: data.text });

  } catch (error) {
    console.error('Error fetching suggestion:', error);
    return NextResponse.json({ error: 'Error fetching suggestion' }, { status: 500 });
  }
}
