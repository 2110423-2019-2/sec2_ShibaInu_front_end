import React from 'react';
import NavBar from './NavBar';
import './HomeClient.css';

class HomeClient extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            jobList:[{
                id: "00001",
                name: "Make Android App",
                type: "Android App",
                freelancerID: "123456789",
                freelancerName: "NeRaMit",
                status: "Open",
            }]
        };
    }

    render(){
        return(
            <div>
                <NavBar />
                
            </div>
        );
    }
}

export default HomeClient;
/*<div className="recent-job-segment">
                    <h1>Recent Job Offering</h1>
                    <div>
                        <table className="centered">
                            <tbody>
                                <tr>
                                    <td>{this.state.jobList[0].name}</td>
                                    <td>{this.state.jobList[0].freelancerName}</td>
                                    <td>{this.state.jobList[0].status}</td>
                                    <td><button>Detail</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>*/