import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// FIX: Switched from the global `JSX` namespace to `React.JSX` to correctly augment intrinsic element types for the modern JSX transform. This resolves errors for the custom `ion-icon` element.
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name?: string;
      };
    }
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);