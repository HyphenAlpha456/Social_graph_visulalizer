import React from 'react';
import { GraphProvider } from './context/Temp_GraphContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <GraphProvider>
      <div className="App">
        <Dashboard />
      </div>
    </GraphProvider>
  );
}

export default App;