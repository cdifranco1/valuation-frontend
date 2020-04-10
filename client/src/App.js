import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Model } from './components/Model';
import { ForecastForm } from './components/ForecastForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Model />
      </header>
    </div>
  );
}

export default App;
