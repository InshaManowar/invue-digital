window.addEventListener('load', function() {
  const bee = document.querySelector('.bee');
  
  if (bee) {
    // Initial position
    bee.style.position = 'fixed'; // Make sure the bee is fixed position
    bee.style.right = '20px';
    bee.style.top = '20px';
    bee.style.zIndex = '1000'; // Ensure bee is above other elements
    
    // Store last known good position
    let lastGoodPosition = {
      top: 20,
      right: 20
    };
    
    // Track scroll direction and speed
    let lastScrollY = window.scrollY;
    let scrollDirection = 'none';
    let isScrolling = false;
    let scrollTimeout;
    
    // Throttle function to limit execution frequency
    function throttle(callback, limit) {
      let waiting = false;
      return function() {
        if (!waiting) {
          callback.apply(this, arguments);
          waiting = true;
          setTimeout(function() {
            waiting = false;
          }, limit);
        }
      };
    }
    
    // The actual scroll handler with throttling
    window.addEventListener('scroll', throttle(function() {
      const currentScrollY = window.scrollY;
      
      // Clear any existing scroll timeout
      clearTimeout(scrollTimeout);
      
      // Set a flag that we're currently scrolling
      isScrolling = true;
      
      // Determine scroll direction
      scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      // Calculate bee position based on scroll percentage
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const scrollPercentage = Math.min(1, Math.max(0, currentScrollY / maxScroll));
      
      // Calculate new position with constraints
      const newTop = Math.min(scrollPercentage * 200, window.innerHeight - bee.offsetHeight - 20);
      const newRight = 20 + (scrollPercentage * 40);
      
      // Update position without transitions
      bee.style.transition = 'none';
      bee.style.top = `${newTop}px`;
      bee.style.right = `${newRight}px`;
      
      // Store this as a good position if it's valid
      if (newTop >= 0 && newTop <= window.innerHeight - bee.offsetHeight) {
        lastGoodPosition.top = newTop;
      }
      if (newRight >= 0 && newRight <= window.innerWidth - bee.offsetWidth) {
        lastGoodPosition.right = newRight;
      }
      
      // Update last scroll position
      lastScrollY = currentScrollY;
      
      // Set a timeout to detect when scrolling has stopped
      scrollTimeout = setTimeout(function() {
        isScrolling = false;
        // When scrolling stops, ensure bee is in a valid position
        resetBeeIfNeeded();
      }, 100);
    }, 16)); // ~60fps throttle
    
    // Function to reset bee position if needed
    function resetBeeIfNeeded() {
      const currentTop = parseInt(bee.style.top);
      const currentRight = parseInt(bee.style.right);
      
      if (currentTop < 0 || currentTop > window.innerHeight - bee.offsetHeight || 
          currentRight < 0 || currentRight > window.innerWidth - bee.offsetWidth) {
        // Use smooth transition when resetting
        bee.style.transition = 'top 0.3s ease-out, right 0.3s ease-out';
        bee.style.top = `${lastGoodPosition.top}px`;
        bee.style.right = `${lastGoodPosition.right}px`;
      }
    }
    
    // Handle clicks on navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function() {
        // After a short delay, reset the bee position if needed
        setTimeout(resetBeeIfNeeded, 500);
      });
    });
    
    // Reset bee if it gets stuck
    window.addEventListener('click', function() {
      resetBeeIfNeeded();
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      // Ensure bee stays within viewport
      resetBeeIfNeeded();
    });
  }
}); 