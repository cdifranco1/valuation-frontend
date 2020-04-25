import React from 'react';
import { Model } from './components/Model';
import { Nav } from './components/Nav';
import { BrowserRouter as Router } from 'react-router-dom'


function App() {
  return (
    <Router>
        <Nav />
        <Model />
    </Router>
  );
}

export default App;
