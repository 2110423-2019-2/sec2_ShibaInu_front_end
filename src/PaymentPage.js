import React from 'react';
import { Nav, Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import axios from 'axios';

import NavBar from './NavBar';
import PaymentModal from './PaymentModal';
import LocalStorageService from './LocalStorageService';
const utilities = require('./Utilities.json');

class PaymentPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalMode: 'card',
            sum: 'NONE',
            sumCharge: 'NONE',
            sumTransfer: 'NONE',
            transaction: null,
            transactionCharge: null,
            transactionTransfer: null,
            creditCard: null,
            bankAccount: null,
            selectedTab: 'all',
            loadedData: function () {
                return !isNaN(this.sum) &&
                    !isNaN(this.sumCharge) &&
                    !isNaN(this.sumTransfer) &&
                    this.transaction &&
                    this.transactionCharge &&
                    this.transactionTransfer &&
                    this.bankAccount &&
                    this.creditCard
            },
        };
    }

    componentDidMount() {
        this.fetchSumFromDB();
        this.fetchTransactionFromDB();
        this.fetchCardAndBankAccountFromDB();
    }

    fetchSumFromDB() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();

        axios.get(utilities['backend-url'] + "/payment/sum")
            .then(res => {
                this.setState({ sum: res.data.sum * -1 });
            }).catch((err) => {
                console.error(err);
            });

        axios.get(utilities['backend-url'] + "/payment/sum/charge")
            .then(res => {
                this.setState({ sumCharge: res.data.sum * -1 });
            }).catch((err) => {
                console.error(err);
            });

        axios.get(utilities['backend-url'] + "/payment/sum/transfer")
            .then(res => {
                this.setState({ sumTransfer: res.data.sum * -1 });
            }).catch((err) => {
                console.error(err);
            });

    }

    fetchTransactionFromDB() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();

        axios.get(utilities['backend-url'] + "/payment")
            .then(res => {
                this.setState({ transaction: res.data.map(item => { return ({ ...item, 'amount': item.amount * -1 }) }) });
            }).catch((err) => {
                console.error(err);
            });

        axios.get(utilities['backend-url'] + "/payment/charge")
            .then(res => {
                this.setState({ transactionCharge: res.data.map(item => { return ({ ...item, 'amount': item.amount * -1 }) }) });
            }).catch((err) => {
                console.error(err);
            });

        axios.get(utilities['backend-url'] + "/payment/transfer")
            .then(res => {
                this.setState({ transactionTransfer: res.data.map(item => { return ({ ...item, 'amount': item.amount * -1 }) }) });
            }).catch((err) => {
                console.error(err);
            });
    }

    fetchCardAndBankAccountFromDB() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();

        axios.get(utilities['backend-url'] + "/payment/creditCard")
            .then(res => {
                this.setState({ creditCard: res.data });
            }).catch((err) => {
                console.error(err);
            });

        axios.get(utilities['backend-url'] + "/payment/bankAccount")
            .then(res => {
                this.setState({ bankAccount: res.data });
            }).catch((err) => {
                console.error(err);
            });
    }

    getTransactionHead() {
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

    getTransactionBody = () => {
        let data = this.state.transaction;

        switch (this.state.selectedTab) {
            case 'client':
                data = this.state.transactionCharge;
                break;

            case 'freelancer':
                data = this.state.transactionTransfer;
                break;
        }

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

    getSumAmount = () => {
        switch (this.state.selectedTab) {
            case 'client':
                return this.state.sumCharge;

            case 'freelancer':
                return this.state.sumTransfer;
            default:
                return this.state.sum;

        }
    }

    getCreditCardBox = () => {
        return (
            <Col>
                <Card>
                    <Card.Header>
                        Credit Card
                    </Card.Header>
                    {!this.state.creditCard ? '' :
                        <Card.Body>
                            <h3>{this.state.creditCard.cardNumber.substring(0, 6) + 'XXXXXX' + this.state.creditCard.cardNumber.substring(12)}</h3><br />
                            <h5>{this.state.creditCard.name}</h5>
                        </Card.Body>}
                    <Card.Footer>
                        <Button onClick={() => this.handleClickCardBank('card')}>
                            {(this.state.bankAccount ? 'CHANGE' : 'ADD') + ' CARD'}
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }

    getBankAccountBox = () => {
        return (
            <Col>
                <Card>
                    <Card.Header>
                        Bank Account
                    </Card.Header>
                    {!this.state.bankAccount ? '' : (
                        <Card.Body>
                            <h3>{this.state.bankAccount.accountNumber}</h3><br />
                            <h5>{this.state.bankAccount.bankCode.toUpperCase() + ' ' + this.state.bankAccount.branchName}</h5><br />
                            <h5>{this.state.bankAccount.name}</h5>
                        </Card.Body>)}
                    <Card.Footer>
                        <Button onClick={() => this.handleClickCardBank('bank')}>
                            {(this.state.bankAccount ? 'CHANGE' : 'ADD') + ' BANK ACCOUNT'}
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }

    showHideModalCallback = (status, reload) => {
        this.setState({
            showModal: status
        });

        if (reload) {
            window.location.reload();
        }
    }

    handleClickCardBank = (mode) => {
        this.setState({ modalMode: mode, showModal: true });
    }

    render() {
        return !this.state.loadedData() ? '' : (
            <div>
                {!this.state.showModal ? '' : <PaymentModal mode={this.state.modalMode} addPay='add' callback={this.showHideModalCallback} />}
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
                                        <Nav.Link eventKey="link-1" onClick={() => { this.setState({ selectedTab: 'all' }) }}>All</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="link-2" onClick={() => { this.setState({ selectedTab: 'client' }) }}>Client</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="link-3" onClick={() => { this.setState({ selectedTab: 'freelancer' }) }} >Freelancer</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table responsive>
                                    <thead className="background-blue text-light">
                                        <this.getTransactionHead />
                                    </thead>
                                    <tbody>
                                        <this.getTransactionBody />
                                    </tbody>
                                </Table>
                            </Col>
                            <Col className="shadow background-blue">
                                <div id="balance-topic" className="text-light">
                                    <h2 className="mb-0">
                                        Summary
                                    </h2>
                                </div>
                                <div className="card-container">
                                    <Row>
                                        <Col>
                                            <Card>
                                                <Card.Body>
                                                    <h3>Total {this.getSumAmount()}฿</h3>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {this.getCreditCardBox()}
                                    </Row>
                                    <Row>
                                        {this.getBankAccountBox()}
                                    </Row>
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