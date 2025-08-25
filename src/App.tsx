import React from 'react';
import PsychedelicScene from './components/PsychedelicScene';
import './App.css';

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <PsychedelicScene />
    </div>
  );
};

export default App;
