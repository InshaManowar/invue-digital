import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DashLayout } from './components/DashLayout';
import { DashHero } from './components/DashHero';
import { DashWork } from './components/DashWork';
import { ZigzagTextSection } from './components/ZigzagTextSection';
import { AboutSection } from './components/AboutSection';
import { Reveal } from './components/Reveal';
import { ContactPage } from './components/ContactPage';
import { AnimatedCursor } from './components/AnimatedCursor';
import { HoneyBee } from './components/HoneyBee';
import { SEO } from './components/SEO';

function HomePage() {
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
        <Reveal distance={36} amount={0.3}>
          <ZigzagTextSection />
        </Reveal>
        <AboutSection />
        <DashWork />
      </DashLayout>
    </>
  );
}

function AppWithRouter() {
  // Force light mode as default
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
      <AnimatedCursor />
    </ThemeProvider>
  );
}

export default AppWithRouter; 