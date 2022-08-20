import ReactDOM from 'react-dom';
import React from 'react';
import './common.css';
import { App } from './Components/App/App';
import { HashRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
