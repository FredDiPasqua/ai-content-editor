"use client";

import React, { useEffect, useState } from 'react';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import AIEditor from '../components/AIEditor';
import '../styles/globals.css';

const IndexPage = () => {
  const [instructions, setInstructions] = useState('Write your blog post here. The AI will assist with suggestions and auto-completion.');
  const [showSuggestion, setShowSuggestion] = useState(false); // Control the AI suggestion box visibility
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  // Dynamically remove CopilotKit chat button and window
  useEffect(() => {
    const interval = setInterval(() => {
      const chatButton = document.querySelector('.copilotkit-button');
      const chatWindow = document.querySelector('.copilotkit-window');

      if (chatButton) {
        chatButton.remove(); // Remove the chat button from the DOM
      }

      if (chatWindow) {
        chatWindow.remove(); // Remove the chat window from the DOM
      }
    }, 500); // Keep checking for and removing these elements every 500ms

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, []);

  // Handle the input change event
  const handleInputChange = (e) => {
    setInstructions(e.target.value);
    if (!showSuggestion) {
      setShowSuggestion(true);  // Only show the AI suggestion box when typing starts
    }
  };

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

          <AIEditor />
        </CopilotSidebar>

        {/* Render AI Suggestion Box only once */}
        {showSuggestion && (
          <div className="suggestions-box">
            <h4>AI Suggestion:</h4>
            <p>Start typing to get suggestions from the AI.</p>
          </div>
        )}
      </div>
    </CopilotKit>
  );
};

export default IndexPage;
