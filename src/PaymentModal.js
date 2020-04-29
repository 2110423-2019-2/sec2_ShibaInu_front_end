import React from 'react';
import { Modal, Button, Form, Row, Col, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';

import LocalStorageService from './LocalStorageService';

class PaymentModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: this.props.show || true,
            mode: this.props.mode || 'card',
            addPay: this.props.addPay || 'add',
            amount: this.props.amount || 0,
            payMode: this.props.payMode || 'Deposit',
            formText: '',
            cardData: {
                cardNumber: '',
                name: '',
                expirationMonthYear: '',
                securityCode: ''
            },
            bankData: {
                accountNumber: '',
                name: '',
                bankCode: '',
                branchName: ''
            },
            isSendingData: false,
            isFetching: false,
            reloadPage: false,
        }
        // console.log("constructor check");

    }

    componentDidMount() {
        if (this.state.mode === 'card' && this.state.addPay === 'pay') {
            this.fetchCardData();
        }
        // console.log("componentdidmount check");
    }

    fetchCardData = () => {

        this.setState({ isFetching: true });

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();

        axios.get(process.env.REACT_APP_BACKEND_URL + "/payment/creditCard")
            .then(res => {
                this.setState({ cardData: res.data });
            }).catch((err) => {
                //console.error(err);
            }).finally(() => {
                this.setState({ isFetching: false, });
            });
    }

    AddCardPayment = () => {
        // console.log("add card check");
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Card number</Form.Label>
                    <Form.Control type="text" placeholder="XXXXXXXXXXXXXXXX" name="cardNumber" maxLength="16" value={this.state.cardData.cardNumber} onChange={this.handleAddCardPaymentChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Name on card</Form.Label>
                    <Form.Control type="text" placeholder="John Smith" name="name" value={this.state.cardData.cardName} onChange={this.handleAddCardPaymentChange} />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Expiry date</Form.Label>
                            <Form.Control type="text" placeholder="XX/XX" maxLength="5" name="expirationMonthYear" value={this.state.cardData.expiryDate} onChange={this.handleAddCardPaymentChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Security code</Form.Label>
                            <Form.Control type="password" placeholder="XXX" maxLength="3" name="securityCode" value={this.state.cardData.securityCode} onChange={this.handleAddCardPaymentChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <text className='text-danger'>{this.state.formText}</text>
                <Button variant="success" onClick={this.handleSubmitAddCardPayment} disabled={this.state.isSendingData}>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        hidden={!this.state.isSendingData}
                    />
                    {' SUBMIT CARD'}
                </Button>
            </Form>
        );
    }

    AddBankAccount = () => {
        // console.log("add bank check");
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Account number</Form.Label>
                    <Form.Control type="text" placeholder="XXXXXXXXXXXXXXXX" name="accountNumber" value={this.state.bankData.accountNumber} maxLength={15} onChange={this.handleAddBankAccountChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Account name</Form.Label>
                    <Form.Control type="text" placeholder="John Smith" name="name" value={this.state.bankData.name} onChange={this.handleAddBankAccountChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Bank</Form.Label>
                    <Form.Control as="select" name="bankCode" value={this.state.bankData.bankCode} onChange={this.handleAddBankAccountChange} >
                        <option hidden>-- Please select --</option>
                        <option>BAY</option>
                        <option>BBL</option>
                        <option>CIMBT</option>
                        <option>CITI</option>
                        <option>GHB</option>
                        <option>GSB</option>
                        <option>KBANK</option>
                        <option>KKP</option>
                        <option>KTB</option>
                        <option>TMB</option>
                        <option>TISCO</option>
                        <option>TBANK</option>
                        <option>SCB</option>
                        <option>UOBT</option>
                        <option>TCD</option>
                        <option>LHFG</option>
                        <option>ICBCT</option>
                        <option>BAAC</option>
                        <option>ISBT</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Branch name</Form.Label>
                    <Form.Control type="text" placeholder="Siam" name="branchName" value={this.state.bankData.branchName} onChange={this.handleAddBankAccountChange} />
                </Form.Group>
                <text className='text-danger'>{this.state.formText}</text>
                <Button variant="success" onClick={this.handleSubmitAddBankAccount} disabled={this.state.isSendingData}>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        hidden={!this.state.isSendingData}
                    />
                    {' SUBMIT ACCOUNT'}
                </Button>
            </Form>
        );
    }

    PayCardPayment = (isLoading) => {
        console.log("paycard check");
        return (
            <Form>
                <Form.Group>
                    <Card border='secondary'>
                        <Card.Header>
                            Credit Card
                    </Card.Header>
                        <Card.Body>
                            {isLoading ? (this.renderLoading()) :
                                !this.state.cardData.cardNumber ?
                                    (<>
                                        <p>No credit card. Please add at My payment.</p>
                                        <Button variant='success' onClick={() => { window.location.href = '/payment' }}>My payment</Button>
                                    </>) :
                                    (<>
                                        <h5>{this.state.cardData.cardNumber.substring(0, 6) + 'XXXXXX' + this.state.cardData.cardNumber.substring(12)}</h5><br />
                                        <p>{this.state.cardData.name}</p>
                                    </>)}
                        </Card.Body>
                    </Card>
                </Form.Group>
                <Form.Group>
                    <Button variant="success" onClick={this.handleSubmitPayCardPayment} disabled={this.state.isSendingData} hidden={!this.state.cardData.cardNumber}>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            hidden={!this.state.isSendingData}
                        />
                        {' PAY ' + this.props.amount + ' THB (' + this.state.payMode + ')'}
                    </Button>
                </Form.Group>
            </Form>
        );
    }

    renderLoading = () => {
        return (<Spinner animation="border" role="status" className="loading">
            <span className="sr-only">Loading...</span>
        </Spinner>);
    }

    handleAddCardPaymentChange = (e) => {
        let temp = this.state.cardData;
        temp[e.target.name] = e.target.value;
        this.setState({
            cardData: temp,
            formText: ''
        });
    }

    handleAddBankAccountChange = (e) => {
        let temp = this.state.bankData;
        temp[e.target.name] = e.target.value;
        this.setState({
            bankData: temp,
            formText: ''
        });
    }

    handleSubmitAddCardPayment = () => {
        const cardData = this.state.cardData;
        if (isNaN(cardData.cardNumber) || cardData.cardNumber.length !== 16) {
            this.setState({
                formText: 'Please enter a valid card number.'
            });
            return;
        }
        if (cardData.name.length === 0) {
            this.setState({
                formText: 'Please enter a valid name on card.'
            });
            return;
        }
        if (cardData.expirationMonthYear[2] !== '/' || cardData.expirationMonthYear.length !== 5 || isNaN(cardData.expirationMonthYear.substring(0, 2)) || isNaN(cardData.expirationMonthYear.substring(3, 5))) {
            this.setState({
                formText: 'Please enter a valid expiry date.'
            });
            return;
        }
        if (isNaN(cardData.securityCode) || cardData.securityCode.length !== 3) {
            this.setState({
                formText: 'Please enter a valid security code.'
            });
            return;
        }

        this.setState({ isSendingData: true });
        // Send data to backend
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();

        axios.post(process.env.REACT_APP_BACKEND_URL + "/payment/creditCard", this.state.cardData)
            .then(res => {
                //console.log(res.data.message)
                this.showHideModal(false, true);
            }).catch((err) => {
                //console.error(err);
                this.setState({ formText: err.response.message })
            }).finally(() => {
                this.setState({ isSendingData: false });
            });

    }

    handleSubmitAddBankAccount = () => {
        const bankData = this.state.bankData;
        if (isNaN(bankData.accountNumber) || bankData.accountNumber.length < 10) {
            this.setState({
                formText: 'Please enter a valid account number.'
            });
            return;
        }
        if (bankData.name.length === 0) {
            this.setState({
                formText: 'Please enter a valid account name.'
            });
            return;
        }
        if (bankData.bankCode.length === 0) {
            this.setState({
                formText: 'Please enter a valid bank.'
            });
            return;
        }
        if (bankData.branchName.length === 0) {
            this.setState({
                formText: 'Please enter a valid branch.'
            });
            return;
        }

        this.setState({ isSendingData: true });
        // Send data to backend
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();

        axios.post(process.env.REACT_APP_BACKEND_URL + "/payment/bankAccount", this.state.bankData)
            .then(res => {
                //console.log(res.data.message)
                this.showHideModal(false, true);
            }).catch((err) => {
                //console.error(err);
                this.setState({ formText: err.response.message })
            }).finally(() => {
                this.setState({ isSendingData: false });
            });

    }

    handleSubmitPayCardPayment = () => {

        this.setState({ isSendingData: true });

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();

        axios.post(process.env.REACT_APP_BACKEND_URL + "/payment/charge", { job: this.props.jobId, amount: this.props.amount })
            .then(res => {
                //console.log(res.status);
                if (res.status === 201) {
                    this.showHideModal(false, true);
                }
            }).catch((err) => {
                //console.error(err);
            }).finally(() => {
                this.setState({ isSendingData: false });
            });
    }

    showHideModal = (status = false, reload = true) => {
        this.setState({
            showModal: status,
            reloadPage: reload
        });

    }

    modalExited = () => {
        if (this.props.callback) {
            this.props.callback(false, this.state.reloadPage);
        }
    }

    getModalBody = (isFetching) => {
        // console.log("get modal body check");
        const isCard = (this.state.mode === 'card');
        const isAdd = (this.state.addPay === 'add');

        if (isCard && isAdd) {
            // console.log("if1 check");
            return this.AddCardPayment();
        } else if (!isCard && isAdd) {
            // console.log("if2 check");
            return this.AddBankAccount();
        } else if (isCard && !isAdd) {
            // console.log("if3 check");
            return this.PayCardPayment(isFetching);
        } else {
            // console.log("if4 check");
            return ''
        }
    }

    render() {
        // console.log("render check");
        return (
            <Modal
                // {...props}
                show={this.state.showModal}
                size='sm'
                aria-labelledby="contained-modal-title-vcenter"
                onHide={this.showHideModal}
                onExited={this.modalExited}
                backdrop={this.state.addPay === 'add' ? true : 'static'}
                centered
            >
                <Modal.Header closeButton={this.state.addPay === 'add'}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        YoungStar Payment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.getModalBody(this.state.isFetching)}
                </Modal.Body>
            </Modal>
        );
    }

}

export default PaymentModal;