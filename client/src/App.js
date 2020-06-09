//libraries
import React from 'react';
import { Switch, Route } from 'react-router-dom'

//components
import Model from './components/Model';
import Dashboard from './components/Dashboard';
import { Nav } from './components/Nav';
import Login from './components/Auth/Login';
import LoginCallback from '@okta/okta-react/dist/LoginCallback';
import { Security } from '@okta/okta-react'
import config from './config';


const App = () => {
  return (
      <div>
        <Security {...config.oidc}>
          <Nav /> 

          <Switch>

            <Route exact path="/">
              <Login />
            </Route>
            
            <Route exact path="/implicit/callback">
              <LoginCallback />
            </Route> 
            
            <Route path="/model/:modelId">
              <Model />
            </Route>
            
            <Route path="/dashboard">
              <Dashboard />
            </Route>

          </Switch>
          
        </Security>
      </div>
    )
  }


export default App;
