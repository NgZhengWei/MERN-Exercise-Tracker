import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; //custom css
import App from './App'; //where the frontend code goes
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  //renders the app inside of root
);

