import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

// The Clerk publishable key for authentication.
const PUBLISHABLE_KEY = 'pk_test_dW5pcXVlLWhhbXN0ZXItNzQuY2xlcmsuYWNjb3VudHMuZGV2JA';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// If the key is not found, the app will still run in a signed-out mode instead of crashing.
if (!PUBLISHABLE_KEY) {
  console.warn("Clerk publishable key not found. App is running in signed-out mode.");
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </React.StrictMode>
  );
}
