import { useEffect, useState } from 'react';

/**
 * Custom hook to get the actual viewport height accounting for mobile browser UI elements
 * This solves the issue with 100vh not working correctly on mobile browsers
 * 
 * The hook handles:
 * 1. Initial viewport height calculation
 * 2. Updates on resize and orientation change
 * 3. Updates on scroll (for mobile browser address bar show/hide)
 * 4. Sets CSS variables for use throughout the app
 */
const useViewportHeight = () => {
  const [viewportHeight, setViewportHeight] = useState<string>('100vh');

  useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      const actualHeight = window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${actualHeight}px`);
      setViewportHeight(`${actualHeight}px`);
    };
    updateViewportHeight();
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const throttledUpdate = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          updateViewportHeight();
          timeoutId = null;
        }, 200);
      }
    };
    window.addEventListener('resize', throttledUpdate);
    window.addEventListener('orientationchange', updateViewportHeight);
    window.addEventListener('scroll', throttledUpdate);
    window.addEventListener('touchmove', throttledUpdate);
    window.addEventListener('touchend', updateViewportHeight);
    const delayedUpdate = setTimeout(updateViewportHeight, 500);
    return () => {
      window.removeEventListener('resize', throttledUpdate);
      window.removeEventListener('orientationchange', updateViewportHeight);
      window.removeEventListener('scroll', throttledUpdate);
      window.removeEventListener('touchmove', throttledUpdate);
      window.removeEventListener('touchend', updateViewportHeight);
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(delayedUpdate);
    };
  }, []);
  return viewportHeight;
};

export default useViewportHeight;