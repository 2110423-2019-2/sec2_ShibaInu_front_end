import React from "react";
import HomeClient from "./HomeClient";
import JobOfferClient from "./JobOfferClient";
import Profile from "./Profile";
import HomeFreelancer from "./HomeFreelancer";
import JobOfferFreelancer from "./JobOfferFreelancer";
import JobPage from "./JobPage";
import JobCreatePage from "./JobCreatePage";
import JobSearchPage from "./JobSearchPage";
import SignIn from './SignIn';
import SignUp from './SignUp';
import DashboardClient from './DashBoardClient';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeGuest from "./HomeGuest";
import AdminHome from "./AdminHome";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "1",
    };
  }

  render() {
    return (
      <Router>
      <Switch>
          <Route exact path="/" component={()=><HomeGuest />} />
          <Route path="/client/home" component={()=><HomeClient userID={this.state.userID}/>} />
          <Route path="/profile" component={Profile} />
          <Route path="/client/job" component={()=><JobOfferClient userID={this.state.userID}/>} />
          <Route path="/freelancer/home" component={()=><HomeFreelancer userID={this.state.userID}/>} />
          <Route path="/freelancer/job" component={()=><JobOfferFreelancer userID={this.state.userID}/>} />
          <Route path="/job" component={JobPage} />
          <Route path="/jobcreate" component={JobCreatePage} />
          <Route path="/jobsearch" component={JobSearchPage} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/client/dashboard" component={DashboardClient} />
          <Route path="/admin" component={AdminHome} />
      </Switch>
    </Router>
    );
  }
}

export default App;
