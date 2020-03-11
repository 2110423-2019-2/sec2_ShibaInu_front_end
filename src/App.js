import React from "react";
import HomeClient from "./HomeClient";
import JobOfferClient from "./JobOfferClient";
import Profile from "./Profile";
import HomeFreelancer from "./HomeFreelancer";
import JobOfferFreelancer from "./JobOfferFreelancer";
import JobPage from "./JobPage";
import JobCreatePage from "./JobCreatePage";
import JobSearchPage from "./JobSearchPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import DashboardClient from "./DashboardClient";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import PrivateRoute from "./utilities/PrivateRoute";
import HomeGuest from "./HomeGuest";
import AdminHome from "./AdminHome";
import AdminAnnouncement from "./AdminAnnouncement";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <HomeGuest />} />
          <Route path="/client/home" component={() => <HomeClient />} />
          <Route
            path="/profile/:userId"
            component={() => <Profile userId={useParams()} />}
          />
          <Route
            path="/profile/"
            component={() => <Profile userId={null} />}
          />
          <Route
            path="/client/job"
            component={() => <JobOfferClient />}
          />
          <Route
            path="/freelancer/home"
            component={() => <HomeFreelancer />}
          />
          <Route
            path="/freelancer/job"
            component={() => <JobOfferFreelancer />}
          />
          <Route
            path="/job/:jobid"
            component={() => <JobPage jobid={useParams()} />}
          />
          <PrivateRoute path="/jobcreate" component={JobCreatePage} />
          <Route path="/jobsearch" component={JobSearchPage} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/client/dashboard/:jobId" component={() => <DashboardClient params={useParams()} />} />
          <Route path="/admin/home" component={AdminHome} />
          <Route path="/admin/announcement" component={AdminAnnouncement} />
        </Switch>
      </Router>
    );
  }
}

export default App;
