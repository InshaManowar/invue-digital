import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  sizes = '100vw',
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState<string | null>(priority ? src : null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    onError?.();
  };

  const getOptimizedSrc = (originalSrc: string) => {
    // Convert to WebP if supported
    const supportsWebP = typeof window !== 'undefined' && 
      window.navigator?.userAgent?.includes('Chrome') || 
      window.navigator?.userAgent?.includes('Firefox');
    
    if (supportsWebP && originalSrc.includes('.jpg') || originalSrc.includes('.png')) {
      return originalSrc.replace(/\.(jpg|png)$/, '.webp');
    }
    
    return originalSrc;
  };

  const generateSrcSet = (baseSrc: string) => {
    const optimizedSrc = getOptimizedSrc(baseSrc);
    const base = optimizedSrc.replace(/\.(webp|jpg|png)$/, '');
    const ext = optimizedSrc.split('.').pop();
    
    return [
      `${base}_400.${ext} 400w`,
      `${base}_800.${ext} 800w`,
      `${base}_1200.${ext} 1200w`,
      `${base}_1600.${ext} 1600w`,
      `${optimizedSrc} 2000w`
    ].join(', ');
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
      )}
      
      {/* Main Image */}
      <img
        ref={imgRef}
        src={imageSrc || ''}
        srcSet={imageSrc ? generateSrcSet(imageSrc) : ''}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${className}
        `}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Loading indicator */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-dash-purple border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
} 