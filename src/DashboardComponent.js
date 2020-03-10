import React from 'react';
import './DashboardComponent.css';
import { Card, Badge, Table } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
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
        if (status == this.state.currentStatus) {
            return 'success'
        } else if (datetime != '') {
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
                    {/* <tr key='timeline-open'>
                        <td><h2><Badge pill variant='success'>Open</Badge></h2></td>
                        <td>{}</td>
                    </tr> */}
                </tbody>
            </Table>

    //         <VerticalTimeline >
    //             <VerticalTimelineElement
    //                 className="vertical-timeline-element--work"
    //                 contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    //                 contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    //                 date="2011 - present"
    //                 iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    //                 // icon={<WorkIcon />}
    //             >
    //                 <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //                 <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //                 <p>
    //                     Creative Direction, User Experience, Visual Design, Project Management, Team Leading
    // </p>
    //             </VerticalTimelineElement>
    //             <VerticalTimelineElement
    //                 className="vertical-timeline-element--work"
    //                 date="2010 - 2011"
    //                 iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    //                 // icon={<WorkIcon />}
    //             >
    //                 <h3 className="vertical-timeline-element-title">Art Director</h3>
    //                 <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    //                 <p>
    //                     Creative Direction, User Experience, Visual Design, SEO, Online Marketing
    // </p>
    //             </VerticalTimelineElement>
    //             <VerticalTimelineElement
    //                 className="vertical-timeline-element--work"
    //                 date="2008 - 2010"
    //                 iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    //                 // icon={<WorkIcon />}
    //             >
    //                 <h3 className="vertical-timeline-element-title">Web Designer</h3>
    //                 <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
    //                 <p>
    //                     User Experience, Visual Design
    // </p>
    //             </VerticalTimelineElement>
    //             <VerticalTimelineElement
    //                 className="vertical-timeline-element--work"
    //                 date="2006 - 2008"
    //                 iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    //                 // icon={<WorkIcon />}
    //             >
    //                 <h3 className="vertical-timeline-element-title">Web Designer</h3>
    //                 <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    //                 <p>
    //                     User Experience, Visual Design
    // </p>
    //             </VerticalTimelineElement>
    //             <VerticalTimelineElement
    //                 className="vertical-timeline-element--education"
    //                 date="April 2013"
    //                 iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    //                 // icon={<SchoolIcon />}
    //             >
    //                 <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
    //                 <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
    //                 <p>
    //                     Strategy, Social Media
    // </p>
    //             </VerticalTimelineElement>
    //             <VerticalTimelineElement
    //                 className="vertical-timeline-element--education"
    //                 date="November 2012"
    //                 iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    //                 // icon={<SchoolIcon />}
    //             >
    //                 <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
    //                 <h4 className="vertical-timeline-element-subtitle">Certification</h4>
    //                 <p>
    //                     Creative Direction, User Experience, Visual Design
    // </p>
    //             </VerticalTimelineElement>
    //             <VerticalTimelineElement
    //                 className="vertical-timeline-element--education"
    //                 date="2002 - 2006"
    //                 iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    //                 // icon={<SchoolIcon />}
    //             >
    //                 <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
    //                 <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
    //                 <p>
    //                     Creative Direction, Visual Design
    // </p>
    //             </VerticalTimelineElement>
    //             <VerticalTimelineElement
    //                 iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    //                 // icon={<StarIcon />}
    //             />
    //         </VerticalTimeline>

        );
    }

    render() {

        return (
            <DashboardBox topic='Timeline' size='large-box' component={this.getTimelineComponent()} />
        );
    }

}