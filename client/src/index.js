import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css'

import { createStore } from 'redux';
import { inputsReducer } from './reducers/InputsReducer'
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(inputsReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
