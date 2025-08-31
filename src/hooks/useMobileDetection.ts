import { useState, useEffect } from 'react';
import useMediaQuery from './useMediaQuery';

/**
 * Custom hook to detect mobile devices based on screen width and user agent
 * @param mobileBreakpoint Optional breakpoint for mobile detection (default: 768px)
 * @returns boolean indicating if the current device is mobile
 */
const useMobileDetection = (mobileBreakpoint: number = 768): boolean => {
  const isSmallScreen = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  useEffect(() => {
    const checkMobileUserAgent = () => {
      if (typeof window === 'undefined') return false;
      const userAgent = window.navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'iphone', 'ipad', 'ipod', 'mobile', 'tablet'];
      return mobileKeywords.some(keyword => userAgent.includes(keyword));
    };
    setIsMobileDevice(checkMobileUserAgent());
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSmallScreen, windowWidth]);
  
  return isSmallScreen || isMobileDevice;
};

export default useMobileDetection;