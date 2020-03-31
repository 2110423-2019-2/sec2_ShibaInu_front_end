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
import ChatSystem from "./ChatSystem";
import ReviewFreelancer from "./ReviewFreelancer";
import WalletPage from "./WalletPage";
import Contract from "./Contract";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <HomeGuest />} />
          <PrivateRoute path="/client/home" component={() => <HomeClient />} />
          <Route
            path="/profile/:userId"
            component={() => <Profile userId={useParams()} />}
          />
          <Route path="/profile/" component={() => <Profile userId={null} />} />
          <PrivateRoute path="/client/job" component={() => <JobOfferClient />} />
          <PrivateRoute path="/freelancer/home" component={() => <HomeFreelancer />} />
          <PrivateRoute
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
          <PrivateRoute
            path="/client/dashboard/:jobId"
            component={() => <DashboardClient params={useParams()} />}
          />
<<<<<<< HEAD
          <Route path="/admin/home" component={AdminHome} />
          <Route path="/admin/announcement" component={AdminAnnouncement} />
          <Route path="/client/review" component={ReviewFreelancer} />
          <Route path="/wallet" component={WalletPage} />
          <Route path="/chat" component={ChatSystem} />
          <Route path="/contract" component={Contract} />
=======
          <PrivateRoute path="/admin/home" component={AdminHome} />
          <PrivateRoute path="/admin/announcement" component={AdminAnnouncement} />
          <PrivateRoute path="/client/review" component={ReviewFreelancer} />
          <PrivateRoute path="/wallet" component={WalletPage} />
          <PrivateRoute path="/chat" component={ChatSystem} />
>>>>>>> 591f6f38dfa111109a687a156109e0e4ec6cde97
        </Switch>
      </Router>
    );
  }
}

export default App;
