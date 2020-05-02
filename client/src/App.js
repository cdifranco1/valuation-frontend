import React from 'react';
import { Model } from './components/Model';
import { Dashboard } from './components/Dashboard';
import { Nav } from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { UserForm } from './components/UserForm';
import { GeneralInputs } from './components/GeneralInputs';
import { ValInputs } from './components/dcf/inputs/ValInputs';


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
          <Route exact path="/model" component={Model} />
          <Route path="/model/inputs">
            <GeneralInputs />
            <ValInputs />
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
