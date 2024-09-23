"use client";

import React, { useState } from 'react';

const AIEditor = () => {
  const [content, setContent] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setContent(newText);

    // Send the input to the OpenAI API for a suggestion
    try {
      setLoading(true);
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuggestion(data.suggestion);
      } else {
        setSuggestion('Error generating suggestion');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuggestion('Error connecting to the API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Start writing your blog post..."
        value={content}
        onChange={handleInputChange}
        rows={10}
        cols={50}
      />
      <div className="suggestions-box">
        {loading ? (
          <p>Loading AI suggestion...</p>
        ) : (
          suggestion && (
            <div className="suggestion">
              <h4>AI Suggestion:</h4>
              <p>{suggestion}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AIEditor;
