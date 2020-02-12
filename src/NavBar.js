import React from 'react';
import logo from './material/Logo.png';
import './NavBar.css';
import {FaBell,FaPlusCircle,FaUserCircle} from 'react-icons/fa';

class NavBar extends React.Component {
    
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <div className="navbar-area">
            <ul className="navbar-container">
                <a className="navbar-logo"  href="/">
                    <li className="left"><img src={logo} className="navbar-logo-img" alt="youngstar logo" /></li>
                    <li className="left navbar-logo-txt">
                        <p className="big-txt">YoungStar</p>
                        <p className="small-txt">Client</p>
                    </li>
                </a>
                <div></div>
                <li className="right">
                    <div className="dropdown">
                        <a href="/" className="navbar-txt"><FaUserCircle className="navbar-icon-profile" />Username</a>
                        <div className="dropdown-content">
                            <a href="/">My Profile</a>
                            <a href="/">My Job</a>
                            <a href="/">My Balance</a>
                            <a href="/">Switch Freelancer</a>
                            <a href="/">Sign Out</a>
                        </div>
                    </div>
                </li>
                <li className="right"><a className="navbar-txt" href="/"><FaBell className="navbar-icon" />Notification</a></li>
                <li className="right"><a className="navbar-txt" href="/"><FaPlusCircle className="navbar-icon" />Create Project</a></li>
            </ul>
            </div>
        );
    }
}

export default NavBar;
