import React from "react";
import { Spinner } from "react-bootstrap";

class LoadingSpinner extends React.Component {

    render() {
        return (
            <Spinner animation="border" role="status" className={this.props.customClass ? this.props.customClass : "loading"}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        );
    }

}

export default LoadingSpinner;