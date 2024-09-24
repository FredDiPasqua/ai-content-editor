"use client";

import React, { useState } from 'react';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import AIEditor from '../components/AIEditor';
import '../styles/globals.css';

const IndexPage = () => {
  const [instructions, setInstructions] = useState('');  // State for input text
  const [style, setStyle] = useState('formal');  // State for writing style
  const [prompt, setPrompt] = useState('');  // Store the final prompt

  // Handle input changes (user typing)
  const handleInputChange = (e) => {
    const newInstructions = e.target.value;
    console.log('User input:', newInstructions);  // Log input value
    setInstructions(newInstructions);  // Update instructions state

    // Only build a new prompt if there are instructions (non-empty)
    if (newInstructions.trim()) {
      const newPrompt = buildCustomPrompt(newInstructions); // Call the builder for each style change
      console.log('Built prompt:', newPrompt);  // Log the built prompt
      setPrompt(newPrompt);  // Update the prompt state
    } else {
      setPrompt("");  // Clear the prompt if no text is present
    }
  };

  // Handle writing style change
  const handleStyleChange = (e) => {
    setStyle(e.target.value);
    if (instructions.trim()) {
      const newPrompt = buildCustomPrompt(instructions);  // Rebuild prompt with the current instructions
      console.log('New style applied, prompt updated:', newPrompt);
      setPrompt(newPrompt);  // Update the prompt state
    }
  };

  // Append a style prompt to the user prompt
  const buildCustomPrompt = (instructions) => {
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
        <CopilotSidebar instructions={instructions} defaultOpen={false}>
        </CopilotSidebar>
    </CopilotKit>
  );
};

export default IndexPage;
