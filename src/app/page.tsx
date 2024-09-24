"use client";

import React, { useState, useEffect } from 'react';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import AIEditor from '../components/AIEditor';
import '../styles/globals.css';

const IndexPage = () => {
  const [instructions, setInstructions] = useState('Write your blog post here. The AI will assist with suggestions and auto-completion.');
  const [style, setStyle] = useState('formal'); // Control the selected writing style
  const [showSuggestion, setShowSuggestion] = useState(false); // Show AI suggestion box
  const [aiResponse, setAiResponse] = useState(''); // Store the AI response
  const apiKey = process.env.NEXT_PUBLIC_COHERE_API_KEY;

  // Load saved content from localStorage when the component mounts
  useEffect(() => {
    // Load saved content from localStorage when the component mounts
    const savedInstructions = localStorage.getItem('instructions');
    if (savedInstructions) {
      setInstructions(savedInstructions);
    }
  }, []);
  
  useEffect(() => {
    // Save content to localStorage every time the instructions change
    localStorage.setItem('instructions', instructions);
  }, [instructions]);
  

  // Handle input changes
  const handleInputChange = (e) => {
    setInstructions(e.target.value);
    if (!showSuggestion) {
      setShowSuggestion(true);
    }
  };

  // Handle writing style change
  const handleStyleChange = (e) => {
    setStyle(e.target.value);
  };

  // Build a custom prompt based on the selected style
  const buildCustomPrompt = () => {
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

  // Fetch AI suggestions using the customized prompt
  const getAISuggestions = async () => {
    const prompt = buildCustomPrompt();
  
    console.log('Prompt being sent to API:', prompt);
  
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),  // Ensure 'prompt' is sent here
      });
  
      const data = await response.json();
      setAiResponse(data.suggestion || 'Error generating suggestion');
    } catch (error) {
      setAiResponse('Failed to generate suggestion. Please try again.');
    }
  };
  
  
  
  
  

  // Trigger the AI suggestions when the input changes
  useEffect(() => {
    if (instructions) {
      getAISuggestions();
    }
  }, [instructions, style]);

  return (
    <CopilotKit publicApiKey={apiKey}>
      <div className="container">
        <CopilotSidebar instructions={instructions} defaultOpen={true}>
          <h1>AI Content Editor</h1>
          <p className="subtitle">Start writing your blog post, and the AI will assist you.</p>

          <label htmlFor="instructions">Custom AI Instructions:</label>
          <input
            type="text"
            id="instructions"
            value={instructions}
            onChange={handleInputChange}
            placeholder="Enter custom AI instructions"
            className="input-box"
          />

          {/* Dropdown for selecting AI suggestion style */}
          <label htmlFor="style">Choose Writing Style:</label>
          <select id="style" value={style} onChange={handleStyleChange} className="input-box">
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="creative">Creative</option>
            <option value="kids">Creative for Kids</option>
            <option value="sci-fi">Sci-Fi Creative</option>
            <option value="action-movie">Action Movie Creative</option>
          </select>

          <AIEditor />
        </CopilotSidebar>

        {/* Render AI Suggestion Box */}
        {showSuggestion && (
          <div className="suggestions-box">
            <h4>AI Suggestion ({style} style):</h4>
            <p>{aiResponse}</p>
          </div>
        )}
      </div>
    </CopilotKit>
  );
};

export default IndexPage;
