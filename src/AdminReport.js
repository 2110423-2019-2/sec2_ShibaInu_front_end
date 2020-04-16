import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
class AdminReport extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            reports : []
        }
    }
    
    fetchDatas(){
        /// showAllReport api
        /// test Data
        let test_data = [{topicName : "Abuse",type : "Abuse",createdTime : "2020-12-12 10:00:00",userName : "Jolly"}]
        this.setState({
            reports : test_data
        })
    }

    setReportStatus(){
        /// setReportStatus api
    }

    showAllReport(){
        let tableDetail = this.state.reports.map((report,index) => (
                <tr key={index+1} className="text-center">
                    <td className="align-middle">{index+1}</td>
                    <td className="align-middle">{report.topicName}</td>
                    <td className="align-middle">{report.type}</td>
                    <td className="align-middle">{report.createdTime}</td>
                    <td className="align-middle">{report.userName}</td>
                    <td className="align-middle"> 
                    <button type="button" className="btn btn-success btn-block" >
                        Completed
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
                <td>time</td>
                <td>userName</td>
                <td></td>
            </tr>   
            )
        return (
            <Table responsive>
                <thead>
                    {tableHead}
                </thead>
                <tbody>
                    {tableDetail}
                </tbody>
            </Table>
        )
        
    }

    showReportDetail(){

    }
    
    componentDidMount(){
        this.fetchDatas();
        console.log("blah")
    }

    render(){
        return(
            <>
            <Container>
                <Row>
                    <Col>
                    {this.showAllReport()}
                    </Col>
                </Row>
            </Container>
            </>
        );
    }
}

export default AdminReport