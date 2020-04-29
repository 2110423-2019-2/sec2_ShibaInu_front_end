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
import swal from "sweetalert";

import PrivateRoute from "./utilities/PrivateRoute";
import AdminRoute from "./utilities/AdminRoute";
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
import PageNotFoundNotAllow from "./PageNotFoundNotAllow";
import SettingPage from './SettingPage';

import LocalStorageService from './LocalStorageService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    if (!process.env.REACT_APP_BACKEND_URL) {
      alert("ยังไม่มี REACT_APP_BACKEND_URL ใน .env จ้า ไปใส่เร้ววววว");
    }
  }

  render() {

    if (LocalStorageService.getUserID()) {
      axios
        .get(process.env.REACT_APP_BACKEND_URL + "/auth/checkban/" + LocalStorageService.getUserID())
        .then((response) => {
        }).catch((error) => {

          if (error.response && error.response.status === 403) {
            //console.log("Banned user");
            swal("You are banned!", error.response.data.message, "error")
              .then(() => {
                LocalStorageService.signOut();
                window.location.href = '/';
              });
          }
        });
    }

    if (LocalStorageService.getAccessToken()) {
      console.log("check token");
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
      axios
        .get(process.env.REACT_APP_BACKEND_URL + "/users/test/")
        .then((response) => {
        }).catch((error) => {

          if (error.response && error.response.status === 401) {
            swal("Authentication error!", "Please login again.", "error")
              .then(() => {
                LocalStorageService.signOut();
                window.location.href = '/';
              });
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
              exact path="/client/home"
              component={() => <HomeClient />}
            />
            <Route
              exact path="/profile/:userId"
              component={() => <Profile userId={useParams()} />}
            />
            <PrivateRoute
              exact path="/profile/"
              component={() => <Profile userId={null} />}
            />
            <PrivateRoute
              exact path="/client/job"
              component={() => <JobOfferClient />}
            />
            <PrivateRoute
              exact path="/freelancer/home"
              component={() => <HomeFreelancer />}
            />
            <PrivateRoute
              exact path="/freelancer/job"
              component={() => <JobOfferFreelancer />}
            />
            <Route
              exact path="/job/:jobid"
              component={() => <JobPage jobid={useParams()} />}
            />
            <PrivateRoute exact path="/jobcreate" component={JobCreatePage} />
            <Route exact path="/jobsearch" component={JobSearchPage} />
            <Route exact path="/freelancersearch" component={FreelancerSearchPage} />
            <GuestRoute exact path="/signin" component={SignIn} />
            <GuestRoute exact path="/signup" component={SignUp} />
            <PrivateRoute
              exact path="/dashboard/:jobId"
              component={() => <Dashboard params={useParams()} />}
            />
            <AdminRoute exact path="/admin/home" component={AdminHome} />
            <AdminRoute
              exact path="/admin/announcement"
              component={AdminAnnouncement}
            />
            <PrivateRoute exact path="/client/review" component={ReviewFreelancer} />
            <PrivateRoute exact path="/payment" component={PaymentPage} />
            <PrivateRoute exact path="/chat" component={ChatSystem} />
            <PrivateRoute
              exact path="/contract/:jobId/:freelancerId"
              component={() => <Contract params={useParams()} />}
            />
            <AdminRoute exact path="/admin/report" component={AdminReportList} />
            <PrivateRoute exact path="/report" component={UserReport} />
            <AdminRoute exact path="/admin/verify" component={AdminVerify} />
            <AdminRoute exact path="/admin/ban" component={AdminBan} />
            <PrivateRoute exact path='/setting' component={SettingPage} />
            <Route path="*" component={PageNotFoundNotAllow} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
