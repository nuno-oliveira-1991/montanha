import React from 'react';
import Scene from './components/Scene';
import { PanelProvider } from './contexts/PanelContext';

const App: React.FC = () => {
  return (
    <PanelProvider>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Scene />
      </div>
    </PanelProvider>
  );
};

export default App;