# AI Content Editor with CopilotKit

## Overview
This project is an AI-powered content editor built using **React**, **Next.js**, **Cohere API** for AI-powered suggestions, and **CopilotKit**. It provides users with writing assistance in various styles (e.g., formal, casual, creative, etc.). The app leverages a floating glass UI with dynamic prompts and real-time AI suggestions.

## Features
- AI-powered content suggestions using Cohere API.
- Multiple writing styles: formal, casual, creative, for kids, sci-fi, action movie.
- Real-time feedback with debounce for efficient API calls.
- Dynamic prompts based on user input and selected writing style.
- A sleek, floating glass-style UI with deep space background.

## Project Structure
- `src/app/`: Contains the main app layout, page structure, and API routes.
  - `page.tsx`: The main page component.
  - `api/`: API routes for handling requests to Cohere.
- `src/components/`: Contains reusable components.
  - `AIEditor.tsx`: Text editor component that sends input to the AI for suggestions.
- `src/styles/globals.css`: Global CSS for styling, including Tailwind integration.
- `public/`: Static assets like background images and icons.
- `utils/`: Utility functions like the debounce logic.

## Setup and Installation

### Prerequisites
- **Node.js**: Ensure that Node.js is installed on your machine.
- **Cohere API Key**: You'll need to obtain an API key from [Cohere](https://cohere.ai/).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-content-editor.git
   cd ai-content-editor
   ```

2. Install dependencies:

    ```npm install```

3. Set up environment variables: Create a .env.local file in the root directory and add your API key:

    ```bash
    NEXT_PUBLIC_COHERE_API_KEY=<your-cohere-api-key>
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

    Open http://localhost:3000 to view the app in the browser.
    
### Building for Production
To build the application for production:

    npm run build

This will generate the production-ready version of your app inside the .next directory.

### Technologies Used

- **React & Next.js**: For building the frontend and server-side rendered React app.
- **Cohere API**: For AI-powered suggestions based on user input.
- **CopilotKit**: For integrating AI copilots into the application.
- **Custom CSS**: For styling the application, including animations and glassmorphism effects.
- **Debounce**: To optimize the frequency of API calls.


### New Features

- **Improved AI Suggestions**: Enhanced the AI suggestion generation by adding contextual instructions to the prompt, resulting in more relevant and creative outputs.
- **Responsive UI**: Added animations and a more balanced color palette to improve user experience and visual feedback.
- **Character-Length Matching**: Ensured that the AI-generated text stays within a range of 15 characters more or less than the user-inputted text for more consistent output length.


## 🚀 Live Demo

Check out the live version of the AI Storyteller App:

👉 [Click here to visit](https://ai-content-editor.vercel.app/)

