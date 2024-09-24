import React, { useState, useCallback, useEffect } from 'react';  // Make sure useEffect is imported
import { debounce } from '../utils/utils';  // Import the debounce function

const AIEditor = ({ prompt, onContentChange }) => {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  // API call to fetch AI suggestion
  const fetchSuggestion = async () => {
    if (!prompt) return;

    console.log('Fetching suggestion for prompt:', prompt);  // Log the prompt
    setLoading(true);
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),  // Send the full prompt
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

  // Debounced fetchSuggestion function with 1000ms delay
  const debouncedFetchSuggestion = useCallback(debounce(fetchSuggestion, 2000), [prompt]);

  // Trigger API call when the prompt changes
  useEffect(() => {
    debouncedFetchSuggestion();  // Call the debounced function
  }, [prompt]);

  return (
    <div>
      {/* Text input box */}
      <textarea
        placeholder="Start writing your blog post..."
        onChange={onContentChange}  // Call parent handler on content change
        rows={10}
        cols={50}
      />

      {/* AI suggestions box */}
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
