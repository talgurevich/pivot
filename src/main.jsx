import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './a11y/a11y.css';
import { App } from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
