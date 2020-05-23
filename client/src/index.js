import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { dcfReducer } from './reducers/inputsReducer'
import './assets/main.css'

import App from './App';
import * as serviceWorker from './serviceWorker';


const store = createStore(dcfReducer, applyMiddleware(thunk))


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
