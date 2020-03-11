import React from 'react';
import './DashboardComponent.css';
import profileimage from "./material/profileimg2.png";
import { Card, Badge, Table } from 'react-bootstrap';
//import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
//import 'react-vertical-timeline-component/style.min.css';
// import logo from './material/Logo.png';

export class DashboardBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topic: this.props.topic || 'NO TOPIC',
            component: this.props.component || 'NO DATA',
            size: this.props.size || 'small-box',
        };
    }

    render() {

        return (
            <Card className={'dashboard-box ' + this.state.size} hidden={this.props.hidden}>
                <Card.Header as="h5" className='box-topic'>
                    {this.state.topic}
                </Card.Header>
                <Card.Body className='box-body'>
                    {this.state.component}
                </Card.Body>
            </Card>
        );
    }
}

export class DashboardStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'Accepted',
            message: 'Due in 3 months'
        };
    }

    getStatusComponent() {

        return (
            <div className='component-status'>
                <h2><Badge pill variant={this.getBadgeStyle()}>{this.state.status}</Badge></h2>
                {this.state.message}
            </div>
        );
    }

    getBadgeStyle() {
        switch (this.state.status) {
            case 'Open': return 'success';
            case 'Accepted': return 'primary';
            case 'Working': return 'warning';
            case 'Done': return 'Danger';
            default: return 'primary';
        }
    }

    render() {

        return (
            <DashboardBox topic='Status' size='small-box' component={this.getStatusComponent()} />
        );
    }

}

export class DashboardResponsible extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // user: null,
            user: { userid: 1, fname: 'Melvin', lname: 'Macaranas', img: profileimage },
        };
    }

    getResponsibleComponent() {
        return (
            <Table className="component-responsible" responsive="sm" hover>
                <tbody>
                    <tr key={this.state.user.userid}>
                        <td>
                            <div className='profile-img'><img src={this.state.user.img} alt='user-img'/></div>
                        </td>
                        <td>{this.state.user.fname + ' ' + this.state.user.lname}</td>
                        <td>
                            <button type="button" className="btn btn-secondary" onClick={""}>
                                Chat
                        </button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    render() {

        return this.state.user ? (

            <DashboardBox topic='Responsible' size='small-box' component={this.getResponsibleComponent()} />
        ) : null;
    }

}

export class DashboardContract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getContractComponent() {
        return (
            <button type="button" className="btn btn-warning" onClick={""}>
                SHOW CONTRACT
            </button>
        )
    }

    render() {

        return (
            <DashboardBox topic='Contract' size='small-box' component={this.getContractComponent()} />
        );
    }

}

export class DashboardTimeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { status: 'Open', datetime: '8 Jun 2019' },
                { status: 'Accepted', datetime: '' },
                { status: 'Working', datetime: '' },
                { status: 'Done', datetime: '' },
            ],
            currentStatus: 'Accepted'
        };
    }

    getBadgeStyle(status, datetime) {
        if (status === this.state.currentStatus) {
            return 'success'
        } else if (datetime !== '') {
            return 'success'
        } else {
            return 'secondary'
        }
    }

    getTimelineBody() {
        return this.state.data.map(item => (
            <tr key={'timeline-' + item.status}>
                <td><h2><Badge pill variant={this.getBadgeStyle(item.status, item.datetime)}>{item.status}</Badge></h2></td>
                <td>{item.datetime}</td>
            </tr>
        ));
    }

    getTimelineComponent() {
        return (
            <Table className="component-timeline" responsive="sm" hover>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getTimelineBody()}
                </tbody>
            </Table>


        );
    }

    render() {

        return (
            <DashboardBox topic='Timeline' size='large-box' component={this.getTimelineComponent()} />
        );
    }

}