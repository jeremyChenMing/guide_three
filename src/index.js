import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './utils/history';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>, document.getElementById('react'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
