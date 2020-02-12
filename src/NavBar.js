import React from 'react';
import logo from './material/Logo.png';
import './NavBar.css';
import {FaBell,FaPlusCircle} from 'react-icons/fa';

class NavBar extends React.Component {
    
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <ul className="navbar-container">
                <a className="navbar-logo"  href="/">
                    <li className="left"><img src={logo} className="navbar-logo-img" alt="youngstar logo" /></li>
                    <li className="left navbar-logo-txt">
                        <p className="big-txt">YoungStar</p>
                        <p className="small-txt">Client</p>
                    </li>
                </a>
                <li className="right">
                    <a href="/" className="navbar-txt dropdown">Username</a>
                    <div className="dropdown-content">
                        <p>Hello World!</p>
                    </div>
                </li>
                <li className="right"><a className="navbar-txt" href="/"><FaBell className="navbar-icon" />Notification</a></li>
                <li className="right"><a className="navbar-txt" href="/"><FaPlusCircle className="navbar-icon" />Create Project</a></li>
                
            </ul>
        );
    }
}

export default NavBar;
