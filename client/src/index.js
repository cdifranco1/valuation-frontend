import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { dcfReducer } from './reducers/InputsReducer'
import './tailwind.generated.css'

import App from './App';
import "./index.css"
import * as serviceWorker from './serviceWorker';
import { WACCReducer } from './reducers/WACCReducer';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import { credReducer } from './reducers/CredentialsReducer';
Amplify.configure(config)

const appReducer = combineReducers({dcf: dcfReducer, wacc: WACCReducer, credentials: credReducer })

const store = createStore(appReducer, applyMiddleware(thunk))


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
          <Route path="/" component={App} />
      </Router>
  </Provider>
</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
