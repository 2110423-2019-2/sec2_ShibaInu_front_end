import React from 'react';
import logo from './material/Logo.png';
import './NavBar.css';
import {FaBell,FaPlusCircle,FaUserCircle} from 'react-icons/fa';
import {NavDropdown} from 'react-bootstrap';

class NavBar extends React.Component {
    
    constructor(props){
        super(props);
        this.state={};
    }

    render(){   
        var profile = <FaUserCircle className="navbar-icon"/>;
        return (
        <nav className="navbar navbar-expand-xl" id="navbar">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item navbar-logo">
                <a href="/" className="navbar-brand">
                    <img src={logo} id="logo-img" alt="youngstar logo" />
                    YoungStar
                    Client
                </a>
            </li>
        </ul>    
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
    </nav>);
    }   
}

export default NavBar;

/*<a className="navbar-brand" href="/">
                    <img src={logo} className="img-fluid logo-img" alt="youngstar logo" />
                    <h2>YoungStar</h2>
                    <p>Client</p>
                </a>*/


/*<a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/">My Profile</a>
                            <a className="dropdown-item" href="/">My Job</a>
                            <a className="dropdown-item" href="/">My Balance</a>
                            <a className="dropdown-item" href="/">Switch Freelancer</a>
                            
                            <a className="dropdown-item" href="/">Sign Out</a>
                        </div>*/


/*<nav className="navbar navbar-expand-xl" id="navbar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a href="/" className="navbar-brand">
                            <img src={logo} id="logo-img" alt="youngstar logo" />
                            YoungStar
                            Client
                        </a>
                    </li>
                </ul>    
                <ul className="navbar-nav mr-right">
                    <li className="nav-item border-right border-warning">
                        <a href="/" className="nav-link"><FaPlusCircle className="navbar-icon" />Create Job</a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link"><FaBell /></a>
                    </li>
                    
                    <li className="nav-item dropdown border-left border-warning">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic navbar-profile" >
                                <FaUserCircle className="navbar-icon" />NeRaMit
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/">My Profile</Dropdown.Item>
                                <Dropdown.Item href="/">My Job</Dropdown.Item>
                                <Dropdown.Item href="/">My Balance</Dropdown.Item>
                                <div className="dropdown-divider"></div>
                                <Dropdown.Item href="/">Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        
                    </li>
                </ul>   
            </nav>*/

/*<Nav variant="pills" >
        <Nav.Item>
          <Nav.Link href="#/home">
            NavLink 1 content
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link title="Item">
            NavLink 2 content
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title="Dropdown" id="nav-dropdown">
          <NavDropdown.Item >Action</NavDropdown.Item>
          <NavDropdown.Item >Another action</NavDropdown.Item>
          <NavDropdown.Item >Something else here</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item >Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>);*/