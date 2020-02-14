import React from 'react';
import logo from './material/Logo.png';
import './NavBar.css';
import {FaBell,FaPlusCircle,FaUserCircle} from 'react-icons/fa';
import {Nav,NavDropdown,Navbar} from 'react-bootstrap';

class NavBar extends React.Component {
    
    constructor(props){
        super(props);
        this.state={};
    }

    render(){   
        var profile = <FaUserCircle className="navbar-icon"/>;
        return (
            <Navbar expand="lg" id="navbar" sticky="top">
                <Navbar.Brand href="#home">
                    <img src={logo} id="logo-img" alt="youngstar logo" />
                    YoungStar
                    Client
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home" id="navbar-create"><FaPlusCircle className="navbar-icon" />Create Job</Nav.Link>
                        <Nav.Link href="#link"><FaBell /></Nav.Link>
                        <NavDropdown title={profile} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1"><div id="dropdown-item-profile">My Profile</div></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2"><div id="dropdown-item-job">My Job</div></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3"><div id="dropdown-item-balance">My Balance</div></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3"><div id="dropdown-item-switch">Freelancer Mode</div></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4"><div id="dropdown-item-signout">Sign Out</div></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }   
}

export default NavBar;
/*<nav className="navbar navbar-expand-xl" id="navbar">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item navbar-logo">
                <a href="/" className="navbar-brand">
                    <img src={logo} id="logo-img" alt="youngstar logo" />
                    YoungStar
                    Client
                </a>
            </li>
        </ul>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-right">
            <li className="nav-item">
                <a href="/" className="nav-link"><FaPlusCircle className="navbar-icon" />Create Job</a>
            </li>
            <li className="nav-item">
                <a href="/" className="nav-link"><FaBell /></a>
            </li>
            
            <li className="nav-item dropdown">
                <NavDropdown title={profile} id="nav-dropdown">
                    <NavDropdown.Item className="text-dark">My Profile</NavDropdown.Item>
                    <NavDropdown.Item className="text-dark">My Job</NavDropdown.Item>
                    <NavDropdown.Item className="text-dark">My Balance</NavDropdown.Item>
                    <NavDropdown.Item className="text-dark">Switch Freelancer</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="text-dark">Sign out</NavDropdown.Item>
                </NavDropdown>
            </li>
        </ul>
        </div>
    </nav>*/ 