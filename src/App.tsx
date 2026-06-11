import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DashLayout } from './components/DashLayout';
import { DashHero } from './components/DashHero';
import { DashWork } from './components/DashWork';
import { ZigzagTextSection } from './components/ZigzagTextSection';
import { AboutSection } from './components/AboutSection';
import { AnimatedCursor } from './components/AnimatedCursor';
import { HoneyBee } from './components/HoneyBee';
import { SEO } from './components/SEO';

function AppContent() {
  useEffect(() => {
    // Minimal cursor handling
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    document.body.style.cursor = isTouchDevice ? 'auto' : 'none';
    
    // Add simple fade-in class to sections
    document.querySelectorAll('section').forEach(section => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once visible, stop observing
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(section);
    });
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <SEO />
      <DashLayout>
        <HoneyBee />
        <DashHero />
        <ZigzagTextSection />
        <AboutSection />
        <DashWork />
      </DashLayout>
    </>
  );
}

function App() {
  // Force light mode as default
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }, []);

  return (
    <ThemeProvider>
      <AppContent />
      <AnimatedCursor />
    </ThemeProvider>
  );
}

export default App;