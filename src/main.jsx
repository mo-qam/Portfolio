import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import clarity from 'clarity-js'; // Import Clarity

// Initialize Clarity with your project ID
clarity.start({ projectId: 'quct0jgx9f' });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);