import React from 'react';
import './DashboardComponent.css';
import { Card, Badge, Table } from 'react-bootstrap';
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
            <Card className={'dashboard-box ' + this.state.size}>
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
            status: 'Open',
        };
    }

    getStatusComponent() {

        return (
            <div className='component-status'>
                <h2><Badge pill variant={this.getBadgeStyle()}>{this.state.status}</Badge></h2>
                Due in 3 months
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
            user: { userid: 1, fname: 'Melvin', lname: 'Macaranas', img: '' },
        };
    }

    getResponsibleComponent() {
        return (
            <Table className="component-responsible" responsive="sm" hover>
                <tbody>
                    <tr key={this.state.user.userid}>
                        <td>
                            <div className='profile-img'>{this.state.user.img}</div>
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

    render() {

        return (
            <DashboardBox topic='Contract' size='small-box' />
        );
    }

}