import React from 'react';
import NavBar from "./NavBar";
import "./DashBoardClient.css"
import { Table, Container, Row, Col } from 'react-bootstrap';
//import { ReactComponent } from '*.svg';
// import logo from './material/Logo.png';

class DashboardClient extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            mode : "client"
        };
    }

    render(){   

        return (
            <div>
                <NavBar mode={this.state.mode} userDatas={""} />
                <Container>
                    <header></header>
                    <Row>
                        <Col sm={8}>
                            <FreelancerBox/>
                        </Col>
                        <Col sm={4}>
                        
                        </Col>
                    </Row>
                    <Row>
                        Timeline
                    </Row>
                </Container>
                
            </div>
        );
    }   
}

class FreelancerBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            freelancerList : [{userId : "1", fname : "Irma", lname : "Williamson", score : 10},]
        }
        this.showInterestedList = this.showInterestedList.bind(this);
    }

    

    showInterestedList(){
        return this.state.freelancerList.length === 0 ? "No one interested yet" : this.state.freelancerList.map(item => 
            <tr key={item.userId}>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>
                    <button type="button" className="btn btn-secondary btn-block" onClick={""}>
                    Delete </button>
                </td>
            </tr>
        )
    }

    render(){
        return (
            <div className="freelancerBox">
                <header>Interested Freelancer</header>
                <Table responsive><tbody>{this.showInterestedList()}</tbody></Table>
            </div>
        )
    }
}

class StatusBox extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
}

class ContractBox extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
}
export default DashboardClient;