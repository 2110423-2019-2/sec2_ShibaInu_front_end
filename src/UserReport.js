import React from "react";
import { Container, Row, Col, Table, Card, Nav, Badge, Form, Spinner, Button, Modal } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import "./AdminReport.css";
import LocalStorageService from "./LocalStorageService";

class UserReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: { All: "all", Problem: "problem", Job: "job", Person: "person", Other: "other" },
            status: { All: "All", Open: "open", Closed: "closed" },
            reports: [],
            reportDetail: null,
            showReportDetail: false,
            filterType: "all",
            filterStatus: "All",
            loadReports: false,
            showCreateReport: false,
        }
    }
    async fetchDatas() {
        let data = [];
        /// showAllReport api
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + LocalStorageService.getAccessToken();
        await axios
            .get(process.env.REACT_APP_BACKEND_URL + "/reports/user/" + LocalStorageService.getUserID())
            .then(res => {
                res.data
                    .forEach((item) => {
                        let d = {
                            reportId: item.reportId,
                            topicName: item.topicName,
                            type: item.topicType,
                            status: item.status,
                            createdTime: item.createdTime,
                            name: item.user.firstName + " " + item.user.lastName
                        }
                        data.push(d);
                    })
            })
            .catch(err => {
                //console.log(err);
            })
        await this.setState({
            reports: data,
            loadReports: true,
        })
        //console.log(data)
    }

    showAllReport() {
        let tableDetail = this.state.reports
            .filter((report) => {
                if (this.state.filterStatus === this.state.status.All) {
                    return true;
                }
                else {
                    return report.status === this.state.filterStatus
                }
            })
            .filter((report) => {
                if (this.state.filterType.toLowerCase() === this.state.type.All) {
                    return true;
                }
                else {
                    return report.type.toLowerCase() === this.state.filterType
                }
            })
            .map((report, index) => (
                <tr key={index} className="text-center" >
                    <td className="align-middle">{report.topicName}</td>
                    <td className="align-middle">{report.type}</td>
                    <td className="align-middle">{report.name}</td>
                    <td className="align-middle">{
                        report.status === this.state.status.Open ?
                            <Badge pill variant="warning">
                                {this.state.status.Open}
                            </Badge>
                            :
                            <Badge pill variant="success">
                                {this.state.status.Closed}
                            </Badge>
                    }</td>
                    <td className="align-middle" >
                        <button type="button" className="btn btn-secondary btn-block" onClick={() => this.showReportDetail(report)}>
                            Detail
                    </button>
                    </td>
                </tr>
            ))
        let tableHead = (
            <tr className="text-center background-blue text-light">
                <td>
                    <h5>Topic</h5>
                </td>
                <td>
                    <h5>Type</h5>
                </td>
                <td>
                    <h5>Name</h5>
                </td>
                <td>
                    <h5>Status</h5>
                </td>
                <td></td>
            </tr>
        )
        return (
            <div id="admin-report-table">
                <Nav variant="tabs" defaultActiveKey="link-1" id="reportlist-table">
                    <Nav.Item>
                        <Nav.Link
                            eventKey="link-1"
                            onClick={() => { this.setState({ filterType: this.state.type.All }) }}
                        >
                            All
                  </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="link-2"
                            onClick={() => { this.setState({ filterType: this.state.type.Job }) }}
                        >
                            Job
                  </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="link-3"
                            onClick={() => { this.setState({ filterType: this.state.type.Person }) }}
                        >
                            Person
                  </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="link-4"
                            onClick={(e) => { this.setState({ filterType: this.state.type.Problem }) }}
                        >
                            Problem
                  </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="link-5"
                            onClick={(e) => { this.setState({ filterType: this.state.type.Other }) }}
                        >
                            Other
                  </Nav.Link>
                    </Nav.Item>
                    <Form inline >
                        <Form.Check
                            inline
                            checked={this.state.filterStatus === this.state.status.Open}
                            type="checkbox"
                            label="show only open status"
                            onChange={(e) => {
                                e.target.checked ?
                                    this.setState({ filterStatus: this.state.status.Open })
                                    :
                                    this.setState({ filterStatus: this.state.status.All })
                            }}
                        />
                    </Form>
                </Nav>
                <Table responsive hover >
                    <thead>
                        {tableHead}
                    </thead>
                    <tbody>
                        {tableDetail}
                    </tbody>
                </Table>
            </div>
        )

    }

    showReportDetail = (reportItem) => {
        this.setState({
            reportDetail: reportItem,
            showReportDetail: true
        })
    }
    closeReportDetail() {
        this.setState({
            reportDetail: null,
            showReportDetail: false
        })
    }

    componentDidMount() {
        this.fetchDatas();
    }

    renderReload() {
        return (<Spinner animation="border" role="status" className="loading">
            <span className="sr-only">Loading...</span>
        </Spinner>);
    }

    createReportCallback = () => {
        this.setState({ showCreateReport: false });
        this.fetchDatas();
    }

    render() {

        if (!this.state.loadReports) {
            return this.renderReload();
        }

        let component;
        if (this.state.showReportDetail) {
            component = (
                <Report report={this.state.reportDetail} refetch={() => this.fetchDatas()} close={() => this.closeReportDetail()} />
            )
        } else {
            component = this.showAllReport();
        }

        return (
            <>
                {this.state.showCreateReport ? <CreateReport cb={this.createReportCallback} show={this.state.showCreateReport} /> : ''}
                <Container id="homeclient-box">
                    <Container className="bg-light shadow">
                        {this.state.showReportDetail ? '' :
                            (<Row>
                                <Col >
                                    <h2 id="recentjob-topic">My Report</h2>
                                </Col >
                                <Col sm="auto" style={{ 'padding-top': '20px', 'padding-right': '30px' }}>
                                    <Button
                                        onClick={() => { this.setState({ showCreateReport: !this.state.showCreateReport }); }}
                                    >Create Report</Button>
                                </Col>
                            </Row>)
                        }
                        <Container>
                            <Row>
                                <Col>
                                    <CSSTransition
                                        classNames="fade"
                                        timeout={{
                                            enter: 450,
                                            exit: 450,
                                        }}
                                        in={this.state.showReportDetail}
                                    >{component}
                                    </CSSTransition>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </Container>
            </>
        );
    }
}

class Report extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            report: { reportId: "", topicName: "", type: "", status: "", name: "", description: "" },
            messages: [],
            sendingMessage: "",
            loadReport: false,
            loadMsg: false,
            refetch: null,
            tableUserId: new Map(),
        }
    }
    showMessage() {
        return this.state.messages.map((msg, index) => (
            <Container className={"report-message " + (this.state.tableUserId.get(msg.userId) === "Admin" ? "admin" : "user")} key={index}>
                <h6>{this.state.tableUserId.get(msg.userId)}</h6>
                <p>{msg.detail}</p>
            </Container>))

    }
    handleWrite = (e) => {
        this.setState({ sendingMessage: e.target.value })
    }
    async fetchData() {
        /// fetch for description and messages
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + LocalStorageService.getAccessToken();
        await axios
            .get(process.env.REACT_APP_BACKEND_URL + "/reports/" + this.state.report.reportId)
            .then(res => {
                /// get res.data as array which only have 1 member
                this.setState({
                    report : {...this.state.report,description : res.data[0].description,status : res.data[0].status},
                    loadReport: true
                })
                //console.log(res.data)
            })
            .catch(err => {
                //console.log(err);
            })
        await axios
            .get(process.env.REACT_APP_BACKEND_URL + "/reports/messages/" + this.state.report.reportId)
            .then(res => {
                this.setState({
                    messages: res.data,
                    loadMsg: true
                })
                //console.log(res.data)
            })
            .catch(err => {
                //console.log(err);
            })
        let userList = this.state.messages
        let map = new Map();
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].userId !== null && !map.has(userList[i].userId)) {
                await axios
                    .get(process.env.REACT_APP_BACKEND_URL + "/users/" + userList[i].userId)
                    .then(res => {
                        //console.log(res.data)
                        if (res.data.isAdmin) {
                            map.set(userList[i].userId, "Admin")
                        } else {
                            map.set(userList[i].userId, res.data.firstName + " " + res.data.lastName)
                        }
                    })
                    .catch(err => {
                        //console.log(err)
                    })
            }
        }
        await this.setState({ tableUserId: map })
        //console.log(map)

    }

    async sendMessage(e) {
        /// sendMessage api
        e.preventDefault()
        await this.fetchData()
        //console.log(this.state.report)
        if(this.state.report.status==="closed"){
            alert("this report was solved")
            return;
        }
        if(this.state.sendingMessage===""){
            alert("message cannot be empty")
            return;
        }
        e.preventDefault();
        await axios
            .post(process.env.REACT_APP_BACKEND_URL + "/reports/send", {
                detail: this.state.sendingMessage,
                report: this.state.report.reportId,
                user: LocalStorageService.getUserID(),
            })
            .then(res => {
                //console.log(res)
                this.fetchData()
                this.setState({ sendingMessage: "" })
            })
            .catch(err => {
                //console.log(err)
            })
        //console.log("send");
    }

    async componentDidMount() {
        await this.setState({
            report: { ...this.props.report, description: "" },
            refetch: this.props.refetch
        })
        await this.fetchData();
    }

    renderReload() {
        return (<Spinner animation="border" role="status" className="loading">
            <span className="sr-only">Loading...</span>
        </Spinner>);
    }

    render() {
        let showReportDetail = (
            <>
                <Row>
                    <Col sm={2}>
                        <h6>Topic</h6>
                    </Col>
                    <Col>
                        <p>{this.state.report.topicName}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        <h6>Type</h6>
                    </Col>
                    <Col>
                        <p>{this.state.report.type}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        <h6>Reporter name </h6>
                    </Col>
                    <Col>
                        <p>{this.state.report.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        <h6>Description</h6>
                    </Col>
                    <Col>
                        <p>{this.state.report.description}</p>
                    </Col>
                </Row>
            </>)
        return (
            <>
                <Container id="admin-report-box">
                    <h3 id="report-back" onClick={this.props.close}>{"< Back"}</h3>
                    <Card id="admin-report-card">
                        <Card.Header className="header">Report</Card.Header>
                        <Card.Body>
                            {
                                this.state.loadReport ? showReportDetail : this.renderReload()
                            }

                        </Card.Body>
                    </Card>
                    {
                        this.state.loadMsg ? this.showMessage() : this.renderReload()
                    }
                    <Container className="report-send-message" hidden={this.state.report.status === "closed"}>
                        <Form>
                            <Form.Group controlId="sendingMsg" id="myForm">
                                <Row>
                                    <Col md={10}>
                                        <Form.Control
                                            type="text"
                                            as="textarea"
                                            rows="2"
                                            value={this.state.sendingMessage}
                                            onChange={this.handleWrite}
                                            name="message"
                                            required
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <button type="submit" className="btn btn-secondary btn-block" size="sm" onClick={(e) => this.sendMessage(e)}>send</button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Container>
                </Container>
            </>
        )
    }
}

class CreateReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show || true,
            reportData: {
                topicName: '',
                description: '',
                topicType: ''
            },
            isSendingData: false,
        };
    }

    handleTextChange = (e) => {
        let temp = this.state.reportData;
        temp[e.target.name] = e.target.value;
        this.setState({
            reportData: temp
        });
    }

    handleCreate = () => {

        let reportData = this.state.reportData;

        if (!reportData['topicName'] || !reportData['description'] || !reportData['topicType']) {
            alert("please input in every field.");
            return;
        }

        this.setState({ isSendingData: true });

        reportData['user'] = LocalStorageService.getUserID();

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + LocalStorageService.getAccessToken();

        axios
            .post(process.env.REACT_APP_BACKEND_URL + "/reports", reportData)
            .then(res => {
                if (res.status === 201) {
                    this.handleClose();
                }
            })
            .catch(err => {
                //console.log(err);
            }).finally(() => {
                this.setState({ isSendingData: false });
            });
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    callbackClose = () => {
        this.props.cb();
    }

    render() {
        return (
            <Modal
                size="lg"
                centered
                show={this.state.show}
                onHide={this.handleClose}
                onExited={this.callbackClose}
            >
                <Modal.Header closeButton={!this.state.isSendingData}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Report
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group controlId="report.topic">
                            <Form.Label>Topic</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Your report's topic."
                                maxlength={50}
                                value={this.state.reportData.topic}
                                name="topicName"
                                onChange={this.handleTextChange}
                            />
                            <Form.Text className={"text-" + (this.state.reportData.topicName.length >= 50 ? "danger" : "success")}>
                                {this.state.reportData.topicName.length}/50
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="report.description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="5"
                                placeholder="Your report's description."
                                maxlength={200}
                                value={this.state.reportData.description}
                                name="description"
                                onChange={this.handleTextChange}
                            />
                            <Form.Text className={"text-" + (this.state.reportData.description.length >= 200 ? "danger" : "success")}>
                                {this.state.reportData.description.length}/200
                            </Form.Text>

                        </Form.Group>
                        <Form.Group controlId="report.type">
                            <Form.Label>Report type</Form.Label>
                            <Form.Control
                                as="select"
                                name="topicType"
                                onChange={this.handleTextChange}>
                                <option selected disabled hidden>-- Please select --</option>
                                <option>Job</option>
                                <option>Person</option>
                                <option>Problem</option>
                                <option>Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='danger'
                        onClick={this.handleClose}
                        disabled={this.state.isSendingData}
                    >Cancel</Button>
                    <Button
                        variant='success'
                        onClick={this.handleCreate}
                        disabled={this.state.isSendingData}
                    >
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            hidden={!this.state.isSendingData}
                        />
                        {" Submit"}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default UserReport
