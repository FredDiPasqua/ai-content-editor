"use client";

import React, { useState, useCallback } from 'react';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import AIEditor from '../components/AIEditor';
import '../styles/globals.css';

const IndexPage = () => {
  const [instructions, setInstructions] = useState('');  // State for input text
  const [style, setStyle] = useState('formal');  // State for writing style
  const [prompt, setPrompt] = useState('');  // Store the final prompt

  // Build a custom prompt based on the selected style
  const buildCustomPrompt = (instructions, style) => {
    switch (style) {
      case 'formal':
        return `Write a formal version of the following content: ${instructions}`;
      case 'casual':
        return `Rewrite the following content in a casual tone: ${instructions}`;
      case 'creative':
        return `Generate creative suggestions for the following content: ${instructions}`;
      case 'kids':
        return `Make the following content engaging and simple for kids: ${instructions}`;
      case 'sci-fi':
        return `Turn the following content into a Sci-Fi story: ${instructions}`;
      case 'action-movie':
        return `Turn the following content into an action movie scene: ${instructions}`;
      default:
        return `Provide suggestions for the following content: ${instructions}`;
    }
  };

  // Handle input changes (user typing)
  const handleInputChange = useCallback((e) => {
    const newInstructions = e.target.value;
    setInstructions(newInstructions);

    // Only build a new prompt if there are instructions (non-empty)
    if (newInstructions.trim()) {
      const newPrompt = buildCustomPrompt(newInstructions, style);  // Call the builder for each style change
      setPrompt(newPrompt);  // Update the prompt state
    } else {
      setPrompt("");  // Clear the prompt if no text is present
    }
  }, [style]);

  // Handle writing style change
  const handleStyleChange = useCallback((e) => {
    const newStyle = e.target.value;
    setStyle(newStyle);

    if (instructions.trim()) {
      const newPrompt = buildCustomPrompt(instructions, newStyle);  // Rebuild prompt with the current instructions and new style
      setPrompt(newPrompt);  // Update the prompt state
    }
  }, [instructions]);

  return (
    <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COHERE_API_KEY}>
      <div className="container">
        <h1>AI Storyteller</h1>
        <p className="subtitle">Start writing your ideas, and the AI will assist you.</p>

        <label htmlFor="style">Choose Writing Style:</label>
        <select id="style" value={style} onChange={handleStyleChange} className="input-box">
          <option value="formal">Formal Tone</option>
          <option value="casual">Casual Tone</option>
          <option value="creative">Creative suggestions</option>
          <option value="kids">For Kids</option>
          <option value="sci-fi">Sci-Fi Story</option>
          <option value="action-movie">Action Movie Scene</option>
        </select>

        {/* Pass the full prompt and content change handler to AIEditor */}
        <AIEditor prompt={prompt} onContentChange={handleInputChange} />
      </div>
      <CopilotSidebar instructions={instructions} defaultOpen={false} />
    </CopilotKit>
  );
};

export default IndexPage;
