import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import HomeClient from './HomeClient';
import JobOfferClient from './JobOfferClient';
import 'bootstrap/dist/css/bootstrap.css';
import Profile from './Profile'
import HomeFreelancer from './HomeFreelancer'
import JobOfferFreelancer from './JobOfferFreelancer';
import { Route, Link,Switch, BrowserRouter as Router} from 'react-router-dom'
const routing = (
  <Router>
    <Switch>
      <div>
        <Route exact path="/" component={HomeClient} />
        <Route path="/profile" component={Profile} />
        <Route path="/client/job" component={JobOfferClient} />
        <Route path="/freelancer/home" component={HomeFreelancer} />
        <Route path="/freelancer/job" component={JobOfferFreelancer} />
      </div>
    </Switch>
  </Router>
  )
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
