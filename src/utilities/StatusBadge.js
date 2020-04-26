import React from 'react';
import { Badge } from 'react-bootstrap';

class StatusBadge extends React.Component {

    render() {

        return (
            <h5><Badge {...this.props} variant={
                {
                    open: "success",
                    accepted: "primary",
                    working: "warning",
                    done: "primary",
                    closed: "danger"
                }[this.props.jobStatus]
            }>
                {this.props.jobStatus}
            </Badge></h5>
        );
    }
}

export default StatusBadge;