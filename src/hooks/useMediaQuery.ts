import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive media queries
 * @param query CSS media query string (e.g. '(max-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
const useMediaQuery = (query: string): boolean => {
  const getMatches = (): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches());

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
      console.log(`Media query '${query}' changed to:`, e.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]); 

  return matches;
};

export default useMediaQuery;