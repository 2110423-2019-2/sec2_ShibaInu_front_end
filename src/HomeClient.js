import React from 'react';
import NavBar from './NavBar';

class HomeClient extends React.Component {
    
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <div>
                <NavBar />
                <p>HomeClient</p>
            </div>
        );
    }
}

export default HomeClient;
