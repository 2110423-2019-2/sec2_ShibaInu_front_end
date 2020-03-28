import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

class PaymentModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: this.props.show || true,
            mode: this.props.mode || 'card',
            amount: this.props.amount || '0',
            formText: '',
            cardData: {
                cardNumber: '',
                cardName: '',
                expiryDate: '',
                securityCode: ''
            }
        }

        this.CardPayment = this.CardPayment.bind(this);
        this.handleCardPaymentChange = this.handleCardPaymentChange.bind(this);
        this.handleSubmitCardPayment = this.handleSubmitCardPayment.bind(this);
    }

    CardPayment() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Card number</Form.Label>
                    <Form.Control type="text" placeholder="XXXXXXXXXXXXXXXX" name="cardNumber" maxLength="16" value={this.state.cardData.cardNumber} onChange={this.handleCardPaymentChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Name on card</Form.Label>
                    <Form.Control type="text" placeholder="John Smith" name="cardName" value={this.state.cardData.cardName} onChange={this.handleCardPaymentChange} />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Expiry date</Form.Label>
                            <Form.Control type="text" placeholder="XX/XX" maxLength="5" name="expiryDate" value={this.state.cardData.expiryDate} onChange={this.handleCardPaymentChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Security code</Form.Label>
                            <Form.Control type="password" placeholder="XXX" maxLength="3" name="securityCode" value={this.state.cardData.securityCode} onChange={this.handleCardPaymentChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <text className='text-danger'>{this.state.formText}</text>
                <Button variant="success" onClick={this.handleSubmitCardPayment}>
                    PAY{' ' + this.state.amount + ' THB'}
                </Button>
            </Form>
        );
    }

    handleCardPaymentChange = (e) => {
        let temp = this.state.cardData;
        temp[e.target.name] = e.target.value;
        this.setState({
            cardData: temp,
            formText: ''
        });
    }

    handleSubmitCardPayment() {
        const cardData = this.state.cardData;
        if (isNaN(cardData.cardNumber) || cardData.cardNumber.length !== 16){
            this.setState({
                formText: 'Please enter a valid card number.'
            });
            return;
        }
        if(cardData.cardName.length === 0) {
            this.setState({
                formText: 'Please enter a valid name on card.'
            });
            return;
        }
        if(cardData.expiryDate[2] !== '/' || cardData.expiryDate.length !== 5 || isNaN(cardData.expiryDate.substring(0,2)) || isNaN(cardData.expiryDate.substring(3,5))){
            this.setState({
                formText: 'Please enter a valid expiry date.'
            });
            return;
        }
        if(isNaN(cardData.securityCode) || cardData.securityCode.length !== 3){
            this.setState({
                formText: 'Please enter a valid security code.'
            });
            return;
        }
        
        // Send data to backend

    }

    render() {
        return (
            <Modal
                // {...props}
                show={this.state.showModal}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={() => { this.setState({ showModal: false }) }}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        YoungStar Payment
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <this.CardPayment />
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={''}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        );
    }

}

export default PaymentModal;