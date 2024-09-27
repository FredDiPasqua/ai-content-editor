import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from '../utils/utils'; 
import '../styles/globals.css';

interface AIEditorProps {
  prompt: string;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AIEditor: React.FC<AIEditorProps> = ({ prompt, onContentChange }) => {
  const [content, setContent] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastValidPrompt, setLastValidPrompt] = useState(''); 

  // Debounced API call function
  const fetchSuggestion = async (currentPrompt: string) => {
    if (!currentPrompt.trim()) return;

    console.log('Fetching suggestion for prompt:', currentPrompt);
    setLoading(true);

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: currentPrompt }),
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

  // Delay to reduce excessive API calls
  const debouncedFetchSuggestion = useCallback(
    debounce((currentPrompt: string) => {
      fetchSuggestion(currentPrompt);
    }, 1500),
    []
  );

  // Trigger debounced API call when the prompt changes, only if it's different from the last valid prompt
  useEffect(() => {
    const trimmedPrompt = prompt.trim();

    if (trimmedPrompt && trimmedPrompt !== lastValidPrompt) {
      setLastValidPrompt(trimmedPrompt); // Update last valid prompt
      debouncedFetchSuggestion(trimmedPrompt); // Fetch new suggestion
    }
  }, [prompt, debouncedFetchSuggestion, lastValidPrompt]);

  return (
    <div>
      <div className="input-header">
        <p className="textarea-instruction">What&apos;s on your mind?</p> {/* Escaped apostrophe */}
      </div>
      <textarea
        className="textarea"
        // placeholder="What's on your mind?"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          onContentChange(e);
        }}
        rows={10}
        cols={50}
      />

      {/* AI suggestion box */}
      <div className="suggestions-box">
        {loading && <div className="loading"></div>}
        {suggestion && !loading && (
          <div className="suggestion">
            <h4>Text enhanced for grammar, SEO, and engagement: </h4>
            <p>{suggestion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIEditor;
