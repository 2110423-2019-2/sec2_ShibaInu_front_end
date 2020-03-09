import React from 'react';
import './DashboardComponent.css';
import { Card } from 'react-bootstrap';
// import logo from './material/Logo.png';

export class DashboardBox extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            topic: this.props.topic || 'NO TOPIC',
            component: this.props.component || 'NO DATA',
            size: this.props.size || 'small-box',
        };
    }

    render(){   

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
