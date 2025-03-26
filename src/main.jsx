import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Clarity from '@microsoft/clarity';

const projectId = 'quct0jgx9f';

// Initialize Clarity with your project ID
Clarity.init(projectId);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);