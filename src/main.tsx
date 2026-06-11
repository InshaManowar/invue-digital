import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import AppWithRouter from './AppWithRouter.tsx';
import './index.css';

// Initialize EmailJS
emailjs.init('5VJV7VnbZPfNknC-P');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AppWithRouter />
    </HelmetProvider>
  </StrictMode>
);
