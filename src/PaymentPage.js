import React from 'react';
import { Nav, Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

import NavBar from './NavBar';
import PaymentModal from './PaymentModal';
import LocalStorageService from './LocalStorageService';
const utilities = require('./Utilities.json');

class PaymentPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sum: 'NONE',
            sumCharge: 'NONE',
            sumTransfer: 'NONE',
            transaction: null,
            transactionCharge: null,
            transactionTransfer: null,
            loadedData: function(){ return !isNaN(this.sum) && !isNaN(this.sumCharge) && !isNaN(this.sumTransfer) && this.transaction && this.transactionCharge && this.transactionTransfer },
        };
    }

    componentDidMount() {
        this.getSumFromDB();
        this.getTransactionFromDB();
    }

    getSumFromDB() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        
        axios.get(utilities['backend-url'] + "/payment/sum")
        .then(res => {
            this.setState({ sum:res.data.sum*-1 });
        }).catch((err) => {
            console.error(err.response.data.message);
        });

        axios.get(utilities['backend-url'] + "/payment/sum/charge")
        .then(res => {
            this.setState({ sumCharge:res.data.sum*-1 });
        }).catch((err) => {
            console.error(err.response.data.message);
        });

        axios.get(utilities['backend-url'] + "/payment/sum/transfer")
        .then(res => {
            this.setState({ sumTransfer:res.data.sum*-1 });
        }).catch((err) => {
            console.error(err.response.data.message);
        });

    }

    getTransactionFromDB() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        
        axios.get(utilities['backend-url'] + "/payment")
        .then(res => {
            this.setState({ transaction:res.data.map(item => {return ({...item, 'amount':item.amount*-1})}) });
        }).catch((err) => {
            console.error(err.response.data.message);
        });

        axios.get(utilities['backend-url'] + "/payment/charge")
        .then(res => {
            this.setState({ transactionCharge:res.data.map(item => {return ({...item, 'amount':item.amount*-1})}) });
        }).catch((err) => {
            console.error(err.response.data.message);
        });

        axios.get(utilities['backend-url'] + "/payment/transfer")
        .then(res => {
            this.setState({ transactionTransfer:res.data.map(item => {return ({...item, 'amount':item.amount*-1})}) });
        }).catch((err) => {
            console.error(err.response.data.message);
        });
    }

    getHeadTable() {
        return (
            <tr className="text-center">
                <td className="align-middle">
                    <h5>Job Name</h5>
                </td>
                <td className="align-middle">
                    <h5>Amount</h5>
                </td>
                <td className="align-middle"></td>
            </tr>
        );
    }

    getTableBody = () => {
        console.log(this.state);
        let data = this.state.transaction;
        return data.map(item => (
            <tr className="text-center">
                <td className="align-middle">
                    {item.jobName}
                </td>
                <td className="align-middle">
                    {item.amount}
                </td>
                <td className="align-middle">
                    <button type="button" className="btn btn-secondary btn-block" onClick={''}>
                        Detail
                </button>
                </td>
            </tr>
        ));
    }

    render() {
        console.log(this.state.sum);
        console.log(isNaN(this.state.sum));
        return !this.state.loadedData() ? '' : (
            <div>
                {/* <PaymentModal /> */}
                <NavBar mode='' userDatas='' />
                <Container id="homeclient-box">
                    <Container className="bg-light shadow">
                        <Row>
                            <Col >
                                <h2 id="recentjob-topic">My Payment</h2>
                            </Col >
                        </Row>
                        <Row>
                            <Col>
                                <Nav variant="tabs" defaultActiveKey="link-1" >
                                    <Nav.Item>
                                        <Nav.Link eventKey="link-1" onClick={''}>All</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="link-2" onClick={''}>Client</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="link-3" onClick={''} >Freelancer</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table responsive>
                                    <thead className="background-blue text-light">
                                        <this.getHeadTable />
                                    </thead>
                                    <tbody>
                                        <this.getTableBody />
                                    </tbody>
                                </Table>
                            </Col>
                            <Col className="shadow background-blue">
                                <div id="balance-topic" className="text-light">
                                    <h2 className="mb-0">
                                        My Balance
                                    </h2>
                                </div>
                                <div className="rounded shadow bg-light">
                                    <Container fluid={true}>
                                        <Row>
                                            <Col xs={8}>
                                                <h3>Total {this.state.sum}</h3>
                                                {/* <br />
                                                <h5>Transfer</h5> */}
                                            </Col>
                                            <Col>
                                                <h3>THB</h3>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>

            </div>
        );
    }
}

export default PaymentPage;