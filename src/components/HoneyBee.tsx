import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, animate } from 'framer-motion';

export function HoneyBee() {
  // Motion values for smoother animation
  const x = useMotionValue(20);
  const y = useMotionValue(20);
  
  // Spring physics for natural, organic movement
  const springX = useSpring(x, { damping: 60, stiffness: 50, mass: 2.5 });
  const springY = useSpring(y, { damping: 60, stiffness: 50, mass: 2.5 });
  
  const [isFacingRight, setIsFacingRight] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [beeVariant, setBeeVariant] = useState(0);
  const [isToggled, setIsToggled] = useState(true);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const beeRef = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef({ x: 0, y: 0, time: Date.now() });
  const mouseMovementTimer = useRef<number | null>(null);
  
  // Initialize bee
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setBeeVariant(Math.floor(Math.random() * 6));
      
      // Check local storage for dismissed state
      const dismissed = localStorage.getItem('beeIsDismissed') === 'true';
      setIsDismissed(dismissed);
      
      // Check local storage for toggle state
      const toggled = localStorage.getItem('beeIsToggled');
      if (toggled !== null) {
        setIsToggled(toggled === 'true');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Handle mouse movement with physics-based following
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Set flag that mouse is moving
      setIsMouseMoving(true);
      
      // Clear any existing timer
      if (mouseMovementTimer.current) {
        clearTimeout(mouseMovementTimer.current);
      }
      
      // Set timer to detect when mouse stops moving
      mouseMovementTimer.current = setTimeout(() => {
        setIsMouseMoving(false);
      }, 100);
      
      // Calculate mouse speed for dynamic following
      const now = Date.now();
      const dt = now - lastMousePosition.current.time;
      const dx = e.clientX - lastMousePosition.current.x;
      const dy = e.clientY - lastMousePosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = distance / dt;
      
      // Update direction based on horizontal movement
      if (Math.abs(dx) > 1) {
        setIsFacingRight(dx > 0);
      }
      
      // Store current position and time
      lastMousePosition.current = { 
        x: e.clientX, 
        y: e.clientY, 
        time: now 
      };
      
      // Set mouse speed for dynamic movement adjustments
      setMouseSpeed(speed);
      
      // Only move the bee if the mouse is moving
      if (isMouseMoving) {
        // Calculate target position - add much more randomness and distance from cursor
        // Keep the bee farther away from the cursor (100-150px random distance)
        const angle = Math.random() * Math.PI * 2; // Random angle
        const distance = 100 + Math.random() * 50; // Random distance between 100-150px
        const targetX = e.clientX + Math.cos(angle) * distance;
        const targetY = e.clientY + Math.sin(angle) * distance;
        
        // Animate to target position with dynamic duration based on distance
        const distance2 = Math.sqrt(
          Math.pow(targetX - x.get(), 2) + 
          Math.pow(targetY - y.get(), 2)
        );
        
        // Even slower follow speed
        const followSpeed = 0.15;
        
        // Animate position with variable duration - extremely slow
        animate(x, targetX, {
          type: "spring",
          duration: Math.min(8, distance2 * 0.03 * followSpeed),
          bounce: 0.02,
          damping: 80 + speed * 2, // Much higher damping for slower movement
          mass: 5 + Math.min(speed * 0.2, 2) // Much more mass for extremely sluggish movement
        });
        
        animate(y, targetY, {
          type: "spring",
          duration: Math.min(8, distance2 * 0.03 * followSpeed),
          bounce: 0.02,
          damping: 80 + speed * 2,
          mass: 5 + Math.min(speed * 0.2, 2)
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseMovementTimer.current) {
        clearTimeout(mouseMovementTimer.current);
      }
    };
  }, [x, y, mouseSpeed, isMouseMoving]);

  // Handle bee dismissal
  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('beeIsDismissed', 'true');
  };
  
  // Handle toggle button
  const handleToggle = () => {
    const newValue = !isToggled;
    setIsToggled(newValue);
    localStorage.setItem('beeIsToggled', newValue.toString());
  };

  // Render bee with proper rotation based on direction
  const renderBeeGif = () => {
    const tiltAngles = [0, -3, 3, -2, 2, 0];
    
    return (
      <img 
        src="/images/bee2.gif" 
        alt="Animated bee" 
        className="w-full h-full drop-shadow-sm"
        style={{ 
          transform: `rotate(${tiltAngles[beeVariant]}deg) scaleX(${isFacingRight ? -1 : 1})`,
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />
    );
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={handleToggle}
          className="flex items-center justify-center bg-dash-purple hover:bg-dash-purple-light text-white rounded-full p-2 shadow-md transition-all duration-300"
          aria-label={isToggled ? "Turn off bee" : "Turn on bee"}
          title={isToggled ? "Turn off bee" : "Turn on bee"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M16.5 6a3 3 0 00-3-3H6a3 3 0 00-3 3v7.5a3 3 0 003 3v-6A4.5 4.5 0 0110.5 6h6z" />
            <path d="M18 7.5a3 3 0 013 3V18a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3H18z" />
          </svg>
          <span className="ml-1">{isToggled ? "Bee: ON" : "Bee: OFF"}</span>
        </button>
      </div>

      {/* Bee Component */}
      {isToggled && isVisible && !isDismissed && (
        <motion.div
          ref={beeRef}
          className="fixed pointer-events-none z-50"
          style={{
            x: springX,
            y: springY,
            width: '40px',
            height: '40px',
            opacity: isHovering ? 0.95 : 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1
          }}
          transition={{ 
            opacity: { duration: 0.5 }
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Close button */}
          {isHovering && (
            <button 
              onClick={handleDismiss}
              className="absolute -top-3 -right-3 bg-dash-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs pointer-events-auto z-10 opacity-80 hover:opacity-100"
            >
              ×
            </button>
          )}
          
          {/* Bee Image with very subtle floating effect */}
          <motion.div
            animate={{
              y: [0, -2, 0],
              rotate: [0, 1, 0],
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {renderBeeGif()}
          </motion.div>
        </motion.div>
      )}
    </>
  );
} 