import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const loadFonts = () => {
  document.documentElement.classList.add('fonts-loaded');
  document.fonts.ready.then(() => {
    document.body.style.fontFamily = 'Work Sans, sans-serif';
    document.body.offsetHeight;
  });
};

loadFonts();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);