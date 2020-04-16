import React from "react";
import { Container, Row, Col, Table, Breadcrumb } from "react-bootstrap";
class AdminReportList extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            reports : [],
            reportDetail : null,
            showReportDetail : false,
        }
    }
    
    fetchDatas(){
        /// showAllReport api
        /// test Data
        let test_data = [{topicName : "Abuse",type : "Abuse",createdTime : "2020-12-12 10:00:00",userName : "Jolly"},
        {topicName : "How can ..",type : "Abuse",createdTime : "2020-12-12 10:00:00",userName : "Lee"}
        ]
        this.setState({
            reports : test_data
        })
    }

    setReportStatus(){
        /// setReportStatus api
    }

    showAllReport(){
        let tableDetail = this.state.reports.map((report,index) => (
                <tr key={index+1} className="text-center" onClick={()=>this.showReportDetail(report)}>
                    <td className="align-middle">{index+1}</td>
                    <td className="align-middle">{report.topicName}</td>
                    <td className="align-middle">{report.type}</td>
                    <td className="align-middle">{report.createdTime}</td>
                    <td className="align-middle">{report.userName}</td>
                    <td className="align-middle"> 
                    <button type="button" className="btn btn-success btn-block" >
                        Complete
                    </button>
                    </td>
                </tr>
            ))
        let tableHead = (
            <tr className="text-center background-blue text-light">
                <td>
                <h5>No</h5>
                </td>
                <td>
                <h5>topic</h5>
                </td>
                <td>
                <h5>type</h5>
                </td>
                <td>
                <h5>time</h5>
                </td>
                <td>
                <h5>username</h5>
                </td>
                <td></td>
            </tr>   
            )
        return (
            <Table responsive hover>
                <thead>
                    {tableHead}
                </thead>
                <tbody>
                    {tableDetail}
                </tbody>
            </Table>
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
            report : {topicName : "",type : "",createdTime : "",userName : ""}
        }
    }
    componentDidMount(){
        this.setState({
            report : this.props.report
        })
    }
    render(){
        return(
            <>
                <Container>
                <Breadcrumb>
                <Breadcrumb.Item href="#" onClick={this.props.close}>Reports</Breadcrumb.Item>
                <Breadcrumb.Item active>{this.state.report.topicName}</Breadcrumb.Item>
                </Breadcrumb>
                    <Row>
                        <Col>
                            Topic
                        </Col>
                        <Col>
                            {this.state.report.topicName}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Type
                        </Col>
                        <Col>
                            {this.state.report.type}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Username
                        </Col>
                        <Col>
                            {this.state.report.userName}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
export default AdminReportList
