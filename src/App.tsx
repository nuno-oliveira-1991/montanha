import React from 'react';
import Scene from './components/Scene';

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Scene />
    </div>
  );
};

export default App;