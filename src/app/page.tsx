"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import AIEditor from '../components/AIEditor';
import '../styles/globals.css';
import { placeholderAnimation } from '../placeholderAnimation'; // Import the placeholder animation

// Constant context for every prompt
const CONTEXT_PROMPT = "Act as a professional storyteller. Ensure the output is creative, grammatically correct, SEO-optimized, and original. Focus on readability and engagement.";

// Calculate character range based on input length
const getCharacterRangePrompt = (input: string) => {
  const inputLength = input.length;
  const minLength = Math.max(inputLength - 15, 50); // Minimum length of 50
  const maxLength = inputLength + 15;
  return `Ensure the response is between ${minLength} and ${maxLength} characters.`;
};

const IndexPage = () => {
  const [instructions, setInstructions] = useState(''); // State for input text
  const [style, setStyle] = useState('formal'); // State for writing style
  const [prompt, setPrompt] = useState(''); // Store the final prompt

  useEffect(() => {
    // Start the placeholder animation when the component mounts
    placeholderAnimation();
  }, []);

  // Build a custom prompt based on the selected style
  const buildCustomPrompt = (instructions: string, style: string) => {
    const stylePrompt = (() => {
      switch (style) {
        case 'formal':
          return `Write a formal version of the following content: ${instructions}`;
        case 'casual':
          return `Rewrite the following content in a casual tone: ${instructions}`;
        case 'creative':
          return `Generate a creative random story from the following content: ${instructions}`;
        case 'kids':
          return `Make the following content engaging and simple for kids: ${instructions}`;
        case 'sci-fi':
          return `Turn the following content into a Sci-Fi story: ${instructions}`;
        case 'horror':
          return `Turn the following content into a Horror story: ${instructions}`;
        case 'action-movie':
          return `Turn the following content into an action movie scene: ${instructions}`;
        default:
          return `Provide suggestions for the following content: ${instructions}`;
      }
    })();

    const characterRangePrompt = getCharacterRangePrompt(instructions);

    // Combine the context, style, and character range prompts
    return `${CONTEXT_PROMPT} ${characterRangePrompt} ${stylePrompt}`;
  };

  const getEmojiForStyle = (style: string) => {
    switch (style) {
      case 'formal':
        return '🧐'; // Formal emoji
      case 'casual':
        return '😎'; // Casual emoji
      case 'creative':
        return '🎨'; // Creative emoji
      case 'kids':
        return '🧸'; // For Kids emoji
      case 'sci-fi':
        return '🚀'; // Sci-Fi emoji
      case 'horror':
        return '👻'; // Horror emoji
      case 'action-movie':
        return '🎬'; // Action Movie emoji
      default:
        return '💡'; // Default emoji
    }
  };  

  // Handle input changes (user typing)
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInstructions = e.target.value;
    setInstructions(newInstructions);

    if (newInstructions.trim()) {
      const newPrompt = buildCustomPrompt(newInstructions, style);
      setPrompt(newPrompt);
    } else {
      setPrompt(""); // Clear the prompt if no text is present
    }
  }, [style]);

  // Handle writing style change
  const handleStyleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStyle = e.target.value;
    setStyle(newStyle);

    if (instructions.trim()) {
      const newPrompt = buildCustomPrompt(instructions, newStyle); // Rebuild the prompt
      setPrompt(newPrompt); // Update the prompt state
    }
  }, [instructions]);

  return (
    <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COHERE_API_KEY}>
      <div className="container">
        <h1>AI Storyteller</h1>
        <p className="subtitle">Start writing your ideas, and the AI will transform them.</p>
        <div className="style-selector-container">
          <label htmlFor="style">Choose the style of your next Story:</label>
          <select id="style" value={style} onChange={handleStyleChange} className="input-box">
            <option value="formal">Formal Tone</option>
            <option value="casual">Casual Flow</option>
            <option value="creative">Randomly Creative</option>
            <option value="kids">For Kids</option>
            <option value="sci-fi">Sci-Fi Tale</option>
            <option value="action-movie">Action Movie Scene</option>
            <option value="horror">Horror Story</option>
          </select>
          <span className="style-emoji">{getEmojiForStyle(style)}</span>
        </div>

        {/* Pass the full prompt and content change handler to AIEditor */}
        <AIEditor prompt={prompt} onContentChange={handleInputChange} />
      </div>
      <CopilotSidebar instructions={instructions} defaultOpen={false} />
    </CopilotKit>
  );
};

export default IndexPage;
