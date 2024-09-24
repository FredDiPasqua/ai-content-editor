import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from '../utils/utils';  // Ensure the debounce function is correctly imported
import '../styles/globals.css';

const AIEditor = ({ prompt, onContentChange }) => {
  const [content, setContent] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  // Debounced API call function
  const fetchSuggestion = async (currentPrompt) => {
    if (!currentPrompt) return;

    console.log('Fetching suggestion for prompt:', currentPrompt);  // Log the current prompt
    setLoading(true);
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: currentPrompt }),  // Send the prompt in the body
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

  // Debounce to reduce excessive API calls
  const debouncedFetchSuggestion = useCallback(debounce((currentPrompt) => {
    fetchSuggestion(currentPrompt);  // Pass the prompt to fetchSuggestion
  }, 1000), []);  // Empty dependency array, so the debounced function is only created once

  // Trigger debounced API call when the prompt changes
  useEffect(() => {
    if (prompt) {
      debouncedFetchSuggestion(prompt);  // Call the debounced function with the latest prompt
    }
  }, [prompt, debouncedFetchSuggestion]);

  return (
    <div>
      {/* Input box */}
      <textarea
        className='textarea'
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          onContentChange(e);  // Ensure the parent component gets the update
        }}
        rows={10}
        cols={50}
      />

      {/* AI suggestion box */}
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
