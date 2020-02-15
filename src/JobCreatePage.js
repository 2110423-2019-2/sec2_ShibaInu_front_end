import React from "react";
// import "./JobCreate.css";
import NavBar from "./NavBar";

class JobCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="job-create-page">
        <NavBar />
        <div>Job Create Page</div>
      </div>
    );
  }
}

export default JobCreatePage;
