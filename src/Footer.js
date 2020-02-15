import React from 'react';
import './Footer.css';
import logo from './material/Logo.png';
import {Navbar} from 'react-bootstrap';

class Footer extends React.Component {
    
    constructor(props){
        super(props);
        this.state={};
    }

    render(){   

        return (
            <Navbar bg="dark" expand="lg" sticky="bottom" className="shadow">
                <Navbar.Brand href="/">
                    <img src={logo} id="footer-logo" className alt="youngstar logo" />
                </Navbar.Brand>
            </Navbar>
        );
    }   
}

export default Footer;