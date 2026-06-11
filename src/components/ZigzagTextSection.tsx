import React, { useRef, useEffect, useState } from 'react';

export function ZigzagTextSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Digital services as an array for better spacing control
  const services = [
    "WEB DEV",
    "APP DEV",
    "AI",
    "ML",
    "RAG",
    "CLOUD",
  ];
  
  // Detect when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Add custom animation style to head once component mounts
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    
    // Define the keyframes for the continuous marquee animation and text effects
    styleEl.innerHTML = `
      @keyframes continuous-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      @keyframes glow {
        0%, 100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
        50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4); }
      }
      
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes float-up {
        0% { transform: translateY(20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      
      .service-strip {
        background: linear-gradient(100deg, #4B33E0 0%, #5941F7 30%, #7B66FF 50%, #5941F7 70%, #4B33E0 100%);
        background-size: 200% 100%;
        animation: gradient-shift 15s ease infinite;
        position: relative;
        overflow: hidden;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.15);
      }

      /* Honeycomb dot texture */
      .service-strip::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px);
        background-size: 26px 26px;
        opacity: 0.06;
        pointer-events: none;
      }

      /* Soft top sheen */
      .service-strip::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, rgba(255,255,255,0.18), transparent 40%);
        pointer-events: none;
      }

      .service-item {
        margin: 0 2.5rem;
        display: inline-block;
        white-space: nowrap;
        position: relative;
      }

      /* Alternating outlined words for visual rhythm */
      .service-outline .text-letter {
        color: transparent;
        -webkit-text-stroke: 1.5px rgba(255,255,255,0.85);
      }

      .service-item::after {
        content: '✦';
        display: inline-block;
        margin-left: 2.5rem;
        font-size: 0.5em;
        vertical-align: middle;
        color: #FFC93C;
        opacity: 0.9;
      }

      .service-item:last-child::after {
        display: none;
      }
      
      .text-letter {
        display: inline-block;
        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), 
                    opacity 0.6s ease, 
                    filter 0.6s ease,
                    text-shadow 0.6s ease;
      }
      
      .text-letter:hover {
        animation: glow 2s ease infinite;
      }
    `;
    
    // Append to document head
    document.head.appendChild(styleEl);
    
    // Clean up
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  // Create a more simplified approach to the scattering effect
  const handleTextHover = (e: React.MouseEvent) => {
    // Target all letters inside the container
    const letters = e.currentTarget.querySelectorAll('.text-letter');
    
    letters.forEach((letter, i) => {
      const elem = letter as HTMLElement;
      // Generate random values for each letter
      const xPos = Math.random() * 100 - 50; // -50px to +50px
      const yPos = Math.random() * 100 - 50; // -50px to +50px
      const rotation = Math.random() * 90 - 45; // -45deg to +45deg
      
      // Apply transform directly
      elem.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${rotation}deg)`;
      elem.style.opacity = '0';
      elem.style.filter = 'blur(8px)';
      // Add staggered timing
      elem.style.transitionDelay = `${Math.random() * 300}ms`;
    });
  };
  
  const handleTextLeave = (e: React.MouseEvent) => {
    // Reset all letters
    const letters = e.currentTarget.querySelectorAll('.text-letter');
    
    letters.forEach((letter, i) => {
      const elem = letter as HTMLElement;
      elem.style.transform = 'translate(0, 0) rotate(0deg)';
      elem.style.opacity = '1';
      elem.style.filter = 'blur(0)';
      // Add staggered timing for a wave-like return
      elem.style.transitionDelay = `${i * 20}ms`;
    });
  };
  
  // Split individual text into characters with direct style manipulation
  const renderCharsWithEffect = (text: string) => {
    return (
      <span 
        className="inline-block"
        onMouseEnter={handleTextHover}
        onMouseLeave={handleTextLeave}
      >
        {Array.from(text).map((char, index) => (
          <span
            key={index}
            className="text-letter inline-block"
            style={{
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease, filter 0.6s ease',
            }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  };
  
  // Render service items with proper spacing
  const renderServices = () => {
    // Concatenate all services with proper spacing for scrolling
    const fullServicesList = services.map((service, index) => (
      <span key={index} className={`service-item ${index % 2 === 1 ? 'service-outline' : ''}`}>
        {renderCharsWithEffect(service)}
      </span>
    ));
    
    return (
      <>
        {fullServicesList}
        {/* Add a copy for the seamless loop */}
        {fullServicesList}
      </>
    );
  };
  
  return (
    <div 
      ref={sectionRef}
      className="relative py-8 md:py-16 bg-dash-beige dark:bg-dash-black overflow-hidden"
    >
      {/* Subtle floating particles in the background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/10 dark:bg-white/5"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `float-up ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Purple strip with continuously scrolling services text */}
      <div
        className="service-strip relative py-4 sm:py-6 md:py-12 w-full overflow-hidden shadow-lg"
        style={{
          boxShadow: '0 10px 30px rgba(89, 65, 247, 0.3), 0 4px 10px rgba(0, 0, 0, 0.1)',
          transform: 'rotate(-1.5deg) scale(1.04)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)',
        }}
      >
        <div
          className="inline-block"
          style={{
            animation: isVisible ? 'continuous-scroll 30s linear infinite' : 'none',
          }}
        >
          {/* Rendered services with proper spacing */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light font-heading text-white opacity-90 whitespace-nowrap cursor-pointer tracking-wider">
            {renderServices()}
          </h2>
        </div>
      </div>
    </div>
  );
} 