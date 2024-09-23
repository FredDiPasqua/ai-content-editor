// src/app/layout.tsx
import '../styles/globals.css';

export const metadata = {
  title: 'AI Content Editor',
  description: 'AI-powered content editor using CopilotKit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
