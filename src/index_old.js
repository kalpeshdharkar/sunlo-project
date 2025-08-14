import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind CSS
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // ✅ Add this

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>     {/* ✅ Wrap your App in this */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);