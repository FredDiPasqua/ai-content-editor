// src/pages/api/openai.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API Key:', process.env.OPENAI_API_KEY);  // Log the API key

  const { text } = req.body;  // Capture text input sent by the client
  if (!text) {
    return res.status(400).json({ error: 'Text input is required' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not set' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',  // Ensure you're using a valid model
        prompt: text,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    return res.status(200).json({ suggestion: data.choices[0].text });
  } catch (error) {
    console.error('Error fetching suggestion:', error);
    return res.status(500).json({ error: 'Error fetching suggestion' });
  }
}
