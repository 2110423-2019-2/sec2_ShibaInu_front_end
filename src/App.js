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
import Dashboard from "./Dashboard";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  useParams,
} from "react-router-dom";
import axios from 'axios';
import { swal } from "sweetalert";

import PrivateRoute from "./utilities/PrivateRoute";
import GuestRoute from "./utilities/GuestRoute";
import HomeGuest from "./HomeGuest";
import AdminHome from "./AdminHome";
import AdminAnnouncement from "./AdminAnnouncement";
import ChatSystem from "./ChatSystem";
import ReviewFreelancer from "./ReviewFreelancer";
import PaymentPage from "./PaymentPage";
import Contract from "./Contract";
import FreelancerSearchPage from "./FreelancerSearchPage";
import NavBar from "./NavBar";
import AdminReportList from "./AdminReport";
import UserReport from './UserReport';
import AdminVerify from './AdminVerify';
import AdminBan from "./AdminBan";

import LocalStorageService from './LocalStorageService';
var utilities = require("./Utilities.json");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    if (LocalStorageService.getAccessToken()) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + LocalStorageService.getAccessToken();
      axios
        .post(utilities["backend-url"] + "/users/" + LocalStorageService.getUserID())
        .then((response) => {
        }).catch((error) => {

          if (error.response && error.response.status === 403) {
            console.log("Banned user");
            swal("You are banned!", error.response.data.message, "error");
          }
        });
    }

    return (
      <div>
        <NavBar />
        <Router>
          <Switch>
            <GuestRoute exact path="/" component={() => <HomeGuest />} />
            <PrivateRoute
              path="/client/home"
              component={() => <HomeClient />}
            />
            <Route
              path="/profile/:userId"
              component={() => <Profile userId={useParams()} />}
            />
            <Route
              path="/profile/"
              component={() => <Profile userId={null} />}
            />
            <PrivateRoute
              path="/client/job"
              component={() => <JobOfferClient />}
            />
            <PrivateRoute
              path="/freelancer/home"
              component={() => <HomeFreelancer />}
            />
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
            <Route path="/freelancersearch" component={FreelancerSearchPage} />
            <GuestRoute path="/signin" component={SignIn} />
            <GuestRoute path="/signup" component={SignUp} />
            <PrivateRoute
              path="/dashboard/:jobId"
              component={() => <Dashboard params={useParams()} />}
            />
            <PrivateRoute path="/admin/home" component={AdminHome} />
            <PrivateRoute
              path="/admin/announcement"
              component={AdminAnnouncement}
            />
            <PrivateRoute path="/client/review" component={ReviewFreelancer} />
            <PrivateRoute path="/payment" component={PaymentPage} />
            <PrivateRoute path="/chat" component={ChatSystem} />
            <PrivateRoute
              path="/contract/:jobId/:freelancerId"
              component={() => <Contract params={useParams()} />}
            />
            <PrivateRoute path="/admin/report" component={AdminReportList} />
            <PrivateRoute path="/report" component={UserReport} />
            <PrivateRoute path="/admin/verify" component={AdminVerify} />
            <PrivateRoute path="/admin/ban" component={AdminBan} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
