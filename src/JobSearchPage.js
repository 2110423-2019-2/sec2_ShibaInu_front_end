import React from "react";
// import "./JobSearchPage.css";
import NavBar from "./NavBar";

class JobSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="job-search-page">
        <NavBar />
        <div>Job Search Page</div>
      </div>
    );
  }
}

export default JobSearchPage;
