import React, { useState, useCallback } from 'react';
import { debounce } from '../utils/utils';  // Import the debounce function

const AIEditor = () => {
  const [content, setContent] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  // Regular input change handler that updates the state immediately
  const handleContentChange = (e) => {
    const newText = e.target.value;
    setContent(newText);  // Update state immediately
    debouncedFetchSuggestion(newText);  // Call the debounced function
  };

  // Debounced function for API call
  const fetchSuggestion = async (text) => {
    if (!text) return;

    setLoading(true);
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
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

  // Create the debounced version of the fetchSuggestion function
  const debouncedFetchSuggestion = useCallback(debounce(fetchSuggestion, 1000), []);

  return (
    <div>
      <textarea
        placeholder="Start writing your blog post..."
        value={content}
        onChange={handleContentChange}  // Call the immediate state update function
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
