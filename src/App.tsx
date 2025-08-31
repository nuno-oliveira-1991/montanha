import React, { useEffect } from 'react';
import Scene from './components/Scene';
import { PanelProvider } from './contexts/PanelContext';
import useViewportHeight from './hooks/useViewportHeight';

const App: React.FC = () => {
  // Get the dynamic viewport height
  const viewportHeight = useViewportHeight();
  
  // Apply global overflow control on mount
  useEffect(() => {
    // Prevent overscroll/bounce effect on mobile
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    return () => {
      // Cleanup if component unmounts
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);
  
  return (
    <PanelProvider>
      <div style={{ 
        width: '100vw', 
        height: viewportHeight, 
        overflow: 'hidden', 
        touchAction: 'none' 
      }}>
        <Scene />
      </div>
    </PanelProvider>
  );
};

export default App;