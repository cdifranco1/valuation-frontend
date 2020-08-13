//libraries
import React from 'react';
import { Switch, Route } from 'react-router-dom'

import "./App.css"

//components
import ValSummary from './components/ValSummary'
import Model from './components/Model';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import Login from './components/Auth/LoginV2';



const App = () => {
  return (
      <div>
          <Nav /> 

          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            
            <Route path="/model/:modelId" component={Model} />
            
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
      </div>
    )
  }


export default App;
