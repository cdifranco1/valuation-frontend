import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LineItem } from './components/LineItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LineItem />
      </header>
    </div>
  );
}

export default App;
