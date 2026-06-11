import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseDown = () => setCursorVariant('clicked');
    const mouseUp = () => setCursorVariant('default');
    
    const handleLinkHover = () => setCursorVariant('hover');
    const handleLinkLeave = () => setCursorVariant('default');
    
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    
    // Add hover listeners to links and buttons
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  // Cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      borderColor: '#5941F7'
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      backgroundColor: 'rgba(89, 65, 247, 0.1)',
      borderColor: '#5941F7'
    },
    clicked: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 0.8,
      backgroundColor: 'rgba(89, 65, 247, 0.3)',
      borderColor: '#5941F7'
    }
  };

  // Hide cursor on mobile/touch devices
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 w-8 h-8 border-2 border-dash-purple rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.8 }}
      />
      <motion.div
        className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-dash-purple rounded-full pointer-events-none z-50"
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 28, mass: 0.5 }}
      />
    </>
  );
} 