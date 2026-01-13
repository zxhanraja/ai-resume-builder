
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

// Safe environment variable retrieval
let PUBLISHABLE_KEY = '';
try {
  PUBLISHABLE_KEY = (import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY ||
    (process.env as any).VITE_CLERK_PUBLISHABLE_KEY ||
    'pk_test_dW5pcXVlLWhhbXN0ZXItNzQuY2xlcmsuYWNjb3VudHMuZGV2JA';
} catch (e) {
  console.error("Error accessing environment variables:", e);
  // Fallback to the known key if everything fails
  PUBLISHABLE_KEY = 'pk_test_dW5pcXVlLWhhbXN0ZXItNzQuY2xlcmsuYWNjb3VudHMuZGV2JA';
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Fail-safe: Render without Clerk if the provider fails
try {
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </React.StrictMode>
  );
} catch (error) {
  console.error("ClerkProvider failed to initialize:", error);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
