import React from 'react';
import { Model } from './components/Model';
import { Nav } from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Login } from './components/Login';


function App() {
  return (
    <Router>
      <div className="bg-gray-300">
        <Nav />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Login register />
          </Route>
          <Route path="/model">
            <Model />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
