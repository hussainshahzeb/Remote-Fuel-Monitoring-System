// src/App.js
import React from 'react';
import SensorDataComponent from './fuelGuard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fuel Guard</h1>
      </header>
      <main>
        <SensorDataComponent />
      </main>
    </div>
  );
}

export default App;
