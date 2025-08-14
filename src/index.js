import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { YouTubeProvider } from './context/YouTubeContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <YouTubeProvider>
    <App />
  </YouTubeProvider>
);
