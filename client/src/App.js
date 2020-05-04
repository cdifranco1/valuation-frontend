//libraries
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//components
import { Model } from './components/Model';
import { Dashboard } from './components/Dashboard';
import { Nav } from './components/Nav';
import { UserForm } from './components/UserForm';


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/login" component={UserForm} />
          <Route path="/register">
            <UserForm registration />
          </Route>
          <Route path="/model/:modelId">
            <Model />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
