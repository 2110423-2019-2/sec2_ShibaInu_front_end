import React from 'react';
import { Nav, Container, Row, Col, Table, Button } from 'react-bootstrap';

import NavBar from './NavBar';
import PaymentModal from './PaymentModal';

class WalletPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
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
                <td className="align-middle">
                    <h5>Status</h5>
                </td>
                <td className="align-middle"></td>
            </tr>
        );
    }

    getTableBody() {
        return (
            <tr className="text-center">
                <td className="align-middle">
                    jobname
                                            </td>
                <td className="align-middle">-</td>
                <td className="align-middle">jobstatus</td>
                <td className="align-middle">
                    <button type="button" className="btn btn-secondary btn-block" onClick={''}>
                        Detail
              </button>
                </td>
            </tr>
        );
    }

    render() {

        return (
            <div>
                <PaymentModal />
                <NavBar mode='guest' userDatas='' />
                <Container id="homeclient-box">
                    <Container className="bg-light shadow">
                        <Row>
                            <Col >
                                <h2 id="recentjob-topic">My Balance</h2>
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
                                        {"Name's "}Balance
                                    </h2>
                                </div>
                                <div className="rounded shadow bg-light">
                                    <Container fluid={true}>
                                        <Row>
                                            <Col xs={8}>
                                                <h5>Total</h5>
                                                <br />
                                                <h5>Transfer</h5>
                                            </Col>
                                            <Col>
                                                <h5>Money USD</h5>
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

export default WalletPage;