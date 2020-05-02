import React from 'react';
import { Model } from './components/Model';
import { Nav } from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { UserForm } from './components/UserForm';


function App() {
  return (
    <Router>
      <div className="bg-gray-300">
        <Nav />
        <Switch>
          <Route exact path="/login">
            <UserForm />
          </Route>
          <Route path="/register">
            <UserForm registration />
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
