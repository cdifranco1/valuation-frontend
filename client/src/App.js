//libraries
import React from 'react';
import { Switch, Route } from 'react-router-dom'

//components
import ValSummary from './components/ValSummary'
import Model from './components/Model';
import Dashboard from './components/Dashboard';
import { Nav } from './components/Nav';
import Login from './components/Auth/Login';
import LoginCallback from '@okta/okta-react/dist/LoginCallback';
import { Security, SecureRoute } from '@okta/okta-react'
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
            
            <SecureRoute path="/model/:modelId" component={Model} />
            
            <SecureRoute path="/dashboard" component={Dashboard} />

          </Switch>
          
        </Security>
      </div>
    )
  }


export default App;
