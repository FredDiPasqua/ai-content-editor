"use client";

import React, { useState } from 'react';
import { CopilotKit } from '@copilotkit/react-core';  // Import CopilotKit from react-core
import { CopilotSidebar } from '@copilotkit/react-ui';  // Directly import CopilotSidebar
import AIEditor from '../components/AIEditor';
import styles from '../styles/globals.css';

const IndexPage = () => {
  const [instructions, setInstructions] = useState('Write your blog post here. The AI will assist with suggestions and auto-completion.');

  // Access the API key from environment variables
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  return (
    <CopilotKit publicApiKey={apiKey}>  {/* Use the CopilotKit wrapper and pass the API key */}
      <div className={styles.container}>
        <CopilotSidebar
          instructions={instructions}
          defaultOpen={true}
        >
          <h1>AI Content Editor</h1>
          <p>Start writing your blog post, and the AI will assist you.</p>
          <label htmlFor="instructions">Custom AI Instructions:</label>
          <input
            type="text"
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter custom AI instructions"
            className="input-box"
          />
          <AIEditor />
        </CopilotSidebar>
      </div>
    </CopilotKit>
  );
};

console.log('Client-side OpenAI API key:', process.env.NEXT_PUBLIC_OPENAI_API_KEY);

export default IndexPage;
