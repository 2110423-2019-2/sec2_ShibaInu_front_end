import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import HomeClient from './HomeClient';
import JobOfferClient from './JobOfferClient';
import 'bootstrap/dist/css/bootstrap.css';
import Profile from './Profile'

ReactDOM.render(<JobOfferClient />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
