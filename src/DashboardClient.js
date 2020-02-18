import React from 'react';
import NavBar from "./NavBar";
// import logo from './material/Logo.png';

class DashboardClient extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
        };
    }

    render(){   

        return (
            <div>
                <NavBar />
                Dashboard
            </div>
        );
    }   
}

export default DashboardClient;