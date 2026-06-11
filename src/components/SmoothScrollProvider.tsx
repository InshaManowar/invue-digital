import React, { ReactNode } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // Minimal, very light smooth scrolling options
  const options = {
    duration: 0.6,         // Shorter duration for more responsive scrolling
    easing: (t: number) => t, // Linear easing for maximum performance
    smoothTouch: false,    // Disable on touch for better performance
    smooth: true,          // Keep smooth scrolling enabled
    syncTouch: true,       // Keep touch in sync
    lerp: 0.05,            // Very light linear interpolation
    wheelMultiplier: 0.8,  // Reduce wheel sensitivity
    touchMultiplier: 1.0,  // Standard touch sensitivity
    orientation: 'vertical' as const
  };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
} 