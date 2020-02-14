import React from 'react';
import NavBar from './NavBar';
import './HomeClient.css';
import { Container, Row, Col, Table } from 'react-bootstrap';

class HomeClient extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            username:"NeRaMit",
            balance:"0.0",
            jobList:[{
                id: "00001",
                name: "Make Android App",
                type: "Android App",
                freelancerID: "123456789",
                freelancerName: "-",
                status: "Open",
            },{
                id: "00002",
                name: "Make Website",
                type: "Frontend Backend",
                freelancerID: "55555555",
                freelancerName: "Shiba",
                status: "In progress",
            }]
        };
    }

    render(){
        var recentJob = this.state.jobList.map((job,index)=>
            <tr key={index} className="text-center">
                <td className="align-middle">
                    {job.name}<br/><br/>
                    {job.type}
                </td>
                <td className="align-middle">{job.freelancerName}</td>
                <td className="align-middle">{job.status}</td>
                <td className="align-middle"><button type="button" className="btn btn-secondary btn-block">Detail</button></td>
            </tr>
        );
        return(
            <div className="main-background">
                <NavBar />
                <Container id="homeclient-box">
                    <Row>
                        <Col className="bg-light shadow" xs={8}>
                            <h2 id="recentjob-topic">Recent Job Offering</h2>
                            <Table responsive>
                                <tbody>
                                    {recentJob}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="shadow balance-box background-blue">
                            <div id="balance-topic" className="text-light">
                                <p className="mb-0">Welcome Back!</p>
                                <h2 className="mb-0">{this.state.username}</h2>
                            </div>
                            <div className="bg-light">
                                <Container>
                                    <Row className="rounded shadow">
                                        <Col xs={7}>
                                            <h5 className="mb-0 p-3">Account Balance</h5>
                                        </Col>
                                        <Col>
                                            <p className="mb-0 p-3">{this.state.balance} USD</p>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default HomeClient;