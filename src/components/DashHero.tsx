import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export function DashHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const highlightBoxRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile based on viewport width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Animation for text on page load
  useEffect(() => {
    // Trigger animation after a short delay for better effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;
    
    // Detect scrolling to disable animations during scroll
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }
      
      // Clear previous timeout
      clearTimeout(scrollTimer);
      
      // Set timeout to re-enable animations after scrolling stops
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [isScrolling]);
  
  // Calculate movement for hexagons based on static position (no mouse tracking)
  const calculateMovement = (index: number) => {
    // Return zero movement since we don't want to track the cursor
    return { x: 0, y: 0 };
  };
  
  // Honeycomb hexagons — balanced across both sides, mixing filled + outlined
  const renderHexagons = () => {
    // size, position (left or right), outline?, opacity, float speed class
    const desktop = [
      { size: 130, top: '16%', left: '11%', outline: false, opacity: 0.85 },
      { size: 168, top: '40%', left: '3%', outline: true, opacity: 0.7 },
      { size: 90, top: '64%', left: '15%', outline: false, opacity: 0.6 },
      { size: 64, top: '30%', left: '24%', outline: true, opacity: 0.55 },
      { size: 140, top: '22%', right: '10%', outline: true, opacity: 0.7 },
      { size: 104, top: '56%', right: '5%', outline: false, opacity: 0.8 },
      { size: 70, top: '74%', right: '17%', outline: true, opacity: 0.5 },
    ];
    const mobile = [
      { size: 56, top: '24%', left: '4%', outline: false, opacity: 0.45 },
      { size: 44, top: '46%', left: '0%', outline: true, opacity: 0.4 },
      { size: 60, top: '70%', right: '4%', outline: false, opacity: 0.4 },
    ];

    const list = isMobile ? mobile : desktop;
    const floatClasses = ['animate-float-slow', 'animate-float'];

    return list.map((hex, i) => {
      const style: React.CSSProperties = {
        top: hex.top,
        width: `${hex.size}px`,
        height: `${hex.size}px`,
        transitionDelay: `${200 + i * 100}ms`,
        opacity: isLoaded ? hex.opacity : 0,
      };
      if ('left' in hex) style.left = hex.left as string;
      if ('right' in hex) style.right = hex.right as string;

      return (
        <div
          key={`hexagon-${i}`}
          className="absolute transition-all duration-700 ease-out"
          style={style}
        >
          <div
            className={floatClasses[i % floatClasses.length]}
            style={{ animationDelay: `${i * 0.7}s`, width: '100%', height: '100%' }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0px 8px 20px rgba(89, 65, 247, 0.25))' }}
            >
              <defs>
                <linearGradient id={`hexg-${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7B66FF" />
                  <stop offset="100%" stopColor="#5941F7" />
                </linearGradient>
              </defs>
              <polygon
                points="50 1.5, 91.8 25.75, 91.8 74.25, 50 98.5, 8.2 74.25, 8.2 25.75"
                fill={hex.outline ? 'none' : `url(#hexg-${i})`}
                stroke={hex.outline ? `url(#hexg-${i})` : 'none'}
                strokeWidth={hex.outline ? 3 : 0}
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      );
    });
  };
  
  // Calculate the background styles for the highlight (always fully highlighted)
  const progressBarStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(100deg, #5941F7 0%, #7B66FF 55%, #5941F7 100%)',
    width: '100%', // Always fully highlighted
    height: '100%',
    zIndex: -1,
    borderRadius: isMobile ? '8px' : '14px',
  } as React.CSSProperties;
  
  return (
    <div ref={heroRef} className="min-h-screen flex flex-col justify-start md:justify-center items-center relative overflow-hidden bg-dash-beige dark:bg-dash-black will-change-transform pt-20 md:pt-0">
      {/* Background decorative elements - smaller and more subtle on mobile */}
      <div className="absolute top-1/4 right-1/4 w-32 md:w-64 h-32 md:h-64 bg-dash-purple/5 rounded-full blur-2xl md:blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 md:w-80 h-40 md:h-80 bg-dash-purple/10 rounded-full blur-2xl md:blur-3xl"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] bg-dash-purple-light/5 rounded-full blur-3xl"></div>

      {/* Faint honeycomb texture */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cg fill='none' stroke='%235941F7' stroke-width='2'%3E%3Cpolygon points='28,2 54,17 54,49 28,64 2,49 2,17'/%3E%3Cpolygon points='28,52 54,67 54,99 28,114 2,99 2,67'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: '56px 100px',
        }}
      ></div>

      {/* Hexagon elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {renderHexagons()}
      </div>
      
      <div ref={textRef} className="text-center z-10 max-w-[320px] sm:max-w-lg md:max-w-2xl lg:max-w-4xl px-4 md:px-6 mt-8 md:mt-0">
        <div
          className={`mb-3 md:mb-4 flex items-center justify-center gap-3 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <span className="h-px w-8 bg-dash-purple/40"></span>
          <span className="text-dash-purple text-sm font-medium font-dash tracking-[0.25em] uppercase">
            We are
          </span>
          <span className="h-px w-8 bg-dash-purple/40"></span>
        </div>
        
        <div className="mb-5 md:mb-6 relative">
          <h1 className="font-light font-heading tracking-tight leading-tight mb-3 md:mb-5 text-center">
            <div
              ref={highlightBoxRef}
              className={`text-dash-black dark:text-white
                px-4 py-2 sm:px-5 md:px-8 md:py-3
                inline-block relative transform -rotate-2 md:-rotate-3
                will-change-transform overflow-hidden transition-all duration-700
                text-5xl sm:text-5xl md:text-7xl lg:text-8xl
                shadow-[0_25px_60px_-15px_rgba(89,65,247,0.55)]
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{
                transitionDelay: '200ms',
                borderRadius: isMobile ? '8px' : '14px',
              }}
            >
              <div style={progressBarStyle}></div>
              {/* top sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" style={{ height: '45%' }}></div>
              <span className="relative text-white drop-shadow-sm">
                RELIABLE
              </span>
            </div>
            <div 
              className={`mt-3 block text-dash-black dark:text-white transition-all duration-700 
                text-5xl sm:text-5xl md:text-7xl lg:text-8xl text-center
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '400ms' }}
            >
              TECH PARTNERS
            </div>
            <div 
              className={`mt-2 block text-dash-black dark:text-white transition-all duration-700 
                text-5xl sm:text-5xl md:text-7xl lg:text-8xl text-center
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '600ms' }}
            >
          
            </div>
          </h1>
        </div>
        
        <div 
          className={`max-w-[300px] sm:max-w-md md:max-w-xl mx-auto text-gray-600 dark:text-gray-400 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <p className="text-lg md:text-xl mb-4 text-center font-normal font-dash">
            We turn caffeine into code and dreams into digital realities.
            Making the web fun again, one pixel at a time.
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 text-center transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <p className="text-dash-purple text-sm mb-1 md:mb-2">Scroll to explore</p>
        <ArrowDown className="w-5 h-5 mx-auto text-dash-purple animate-bounce" />
      </div>
    </div>
  );
} 