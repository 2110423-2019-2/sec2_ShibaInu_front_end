import React from "react";
import { Container, Row, Col, Table, Card, Nav, Badge, Form} from "react-bootstrap";
import "./AdminReport.css"
class AdminReportList extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            type: {All : "All", Problem : "Problem", Job : "Job", Person : "Person"},
            status : {All : "All", Open : "open", Closed : "closed"},
            reports : [],
            reportDetail : null,
            showReportDetail : false,
            filterType : "All",
            filterStatus : "All",
        }
    }
    
    fetchDatas(){
        /// showAllReport api
        /// test Data
        let test_data = [{reportId:"1",topicName : "I was accused by Teddy",type : "Person",status : "open",name : "Jolly Bear"},
        {reportId:"2",topicName : "I lost my money",type : "Problem",status : "closed",name : "Teddy Bear"},
        {reportId:"3",topicName : "My job was deleted from job list",type : "Job",status : "open",name : "Teddy Bear"}
        ]
        ///
        this.setState({
            reports : test_data
        })
    }

    setReportStatus(){
        /// setReportStatus api
    }

    showAllReport(){
        let tableDetail = this.state.reports
        .filter((report) => {
            if(this.state.filterStatus === this.state.status.All){
                return true;
            }
            else{
                return report.status === this.state.filterStatus
            }
        })
        .filter((report) => {
            if(this.state.filterType === this.state.type.All){
                return true;
            }
            else{
                return report.type === this.state.filterType
            }
        })
        .map((report,index) => (
                <tr key={index} className="text-center" >
                    <td className="align-middle">{report.topicName}</td>
                    <td className="align-middle">{report.type}</td>
                    <td className="align-middle">{report.name}</td>
                    <td className="align-middle">{
                    report.status === this.state.status.Open?
                        <Badge pill variant="warning">
                            {this.state.status.Open}
                        </Badge>
                    :
                        <Badge pill variant="success">
                             {this.state.status.Closed}
                        </Badge>
                    }</td>
                    <td className="align-middle" > 
                    <button type="button" className="btn btn-secondary btn-block" onClick={()=>this.showReportDetail(report)}>
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
                    onClick={() =>{this.setState({filterType : this.state.type.All})}}
                  >
                    All
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-2"
                    onClick={() =>{this.setState({filterType : this.state.type.Job})}}
                  >
                    Job
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-3"
                    onClick={() =>{this.setState({filterType : this.state.type.Person})}}
                  >
                    Person
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-4"
                    onClick={(e) =>{this.setState({filterType : this.state.type.Problem})}}
                  >
                    Problem
                  </Nav.Link>
                </Nav.Item>
                <Form inline >
                <Form.Check
                  inline
                  checked ={this.state.filterStatus === this.state.status.Open}
                  type="checkbox"
                  label = "show only open status"
                  onChange={(e) =>{ e.target.checked?
                    this.setState({filterStatus : this.state.status.Open})
                    :
                    this.setState({filterStatus : this.state.status.All})
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

    showReportDetail = (reportItem)=>{
        this.setState({
            reportDetail : reportItem,
            showReportDetail : true
        })
    }
    closeReportDetail(){
        this.setState({
            reportDetail : null,
            showReportDetail : false
        })
    }

    componentDidMount(){
        this.fetchDatas();
        console.log("blah")
    }

    render(){
        let component =  this.showAllReport();
        if(this.state.showReportDetail){
            component = (<Report report={this.state.reportDetail} close={()=>this.closeReportDetail()}/>)
        }
        return(
            <>
            <Container>
                <Row>
                    <Col>
                        {component}
                    </Col>
                </Row>
            </Container>
            </>
        );
    }
}

class Report extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            report : {reportId : "",topicName : "",type : "",status : "",name : "", description : ""},
            messages : [],
            sendingMessage : "",
        }
    }
    showMessage(){
        return this.state.messages.map((msg,index) => (
            <Container className="report-message" key={index}>
            <h4>{msg.name} :</h4>
            <p>{msg.text}</p>
            </Container>))
        
    }
    handleWrite = (e)=>{
        this.setState({sendingMessage : e.target.value})
    }
    fetchData(){
        /// fetch for description and messages
        /// test Data
        let descList = [{reportId : "1" ,desc : "Two-thirds of those adopting paper-free processes report a payback within 18 months. 50% see payback in under 12 months."},
        {reportId : "2" ,desc : "Respondents felt that driving paper out of the process would improve the productivity of process staff by 29.7%. For respondents who understood document management and capture technology, that number rose to 35.4%."},]
        let data = descList.filter(report => this.state.report.reportId === report.reportId)
        ///
        let prevReport = this.state.report
        let prevMsg = this.state.messages
        if(data.length > 0){
            this.setState({report : {...prevReport, description : data[0].desc}})
        }
        /// test data
        let msg = {name:this.state.report.name,text:"Did you fixed it yet?"}
        ///
        this.setState({messages : [...prevMsg,msg]})

    }

    sendMessage(){
        /// sendMessage api
        console.log("send");
    }

    async componentDidMount(){
        await this.setState({
            report : {...this.props.report}
        })
        await this.fetchData();
    }
    render(){
        return(
            <>
                <Container id="admin-report-box">
                <h3 id="report-back" onClick={this.props.close}>{"< Back"}</h3>
                <Card id="admin-report-card">
                <Card.Header className="header">{this.state.report.topicName}</Card.Header>
                <Card.Body>
                <Row>
                    <Col sm={2}>
                        Type
                    </Col>
                    <Col>
                        {this.state.report.type}
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        Reporter name
                    </Col>
                    <Col>
                        {this.state.report.name}
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        Description
                    </Col>
                    <Col>
                        {this.state.report.description}
                    </Col>
                </Row>
                </Card.Body>
                </Card>
                {
                   this.showMessage()
                }
                <Container className="report-send-message" hidden={this.state.report.status === "closed"}>
                <Form>
                <Form.Group controlId="jobDes">
                <Row>
                    <Col md={10}>
                    <Form.Control
                    type="text"
                    as="textarea"
                    rows="2"
                    onChange={this.handleWrite}
                    name="description"
                    required
                    />
                    </Col>
                    <Col md={2}>
                    <button type="submit" className="btn btn-success btn-block" onClick={()=>this.sendMessage()}>send</button>
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
export default AdminReportList
