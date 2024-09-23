import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text) {
    console.log('No text input provided');
    return NextResponse.json({ error: 'Text input is required' }, { status: 400 });
  }

  //   const apiKey = process.env.OPENAI_API_KEY;
    const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    console.log('OpenAI API key not set');
    return NextResponse.json({ error: 'API key not set' }, { status: 500 });
  }

  try {
    console.log('Sending request to Cohere with text:', text);
    const response = await fetch('https://api.cohere.ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'command-xlarge-nightly',
            prompt: text,
            max_tokens: 100,
            version: '2022-12-06',  // Example version; check Cohere's docs for the most current version
        }),
          
    });
      
    const data = await response.json();
    console.log('Cohere API response:', data);
      
    if (!data.text) {
        console.error('Error: No text returned from Cohere');
        return NextResponse.json({ error: 'No text returned from Cohere' }, { status: 500 });
    }
      
    return NextResponse.json({ suggestion: data.text });  // Use data.text instead of generations[0].text

  } catch (error) {
    console.error('Error fetching suggestion:', error);
    return NextResponse.json({ error: 'Error fetching suggestion' }, { status: 500 });
  }
}
console.log('Server-side OpenAI API key:', process.env.OPENAI_API_KEY);

