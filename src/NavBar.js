import React from 'react';
import logo from './material/Logo.png';
import './NavBar.css';
import {FaBell,FaPlusCircle,FaUserCircle,FaSearch} from 'react-icons/fa';
import {Nav,Navbar} from 'react-bootstrap';
import {UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap';

class NavBar extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            status: {
                CLIENT: "client",
                FREELANCER: "freelancer"
            },
            mode: this.props.mode
        };
    }

    render(){   
        var switchMode;
        var createMenu;
        var modePath;
        var jobPath = "/"+this.state.mode+"/job";
        if(this.state.mode == this.state.status.CLIENT){
            switchMode = "Switch" + " " + this.state.status.FREELANCER;
            createMenu = <Nav.Link href="#home"><FaPlusCircle className="navbar-icon" />Create Job</Nav.Link>;
            modePath = "/"+this.state.status.FREELANCER+"/home";
        } else {
            switchMode = "Switch" + " " + this.state.status.CLIENT;
            modePath = "/";
        }
        var searchMenu = <Nav.Link href="#home"><FaSearch className="navbar-icon" />Search</Nav.Link>;
        var mode = "YounStar " + this.state.mode;
        

        return (
            <Navbar expand="lg" id="navbar" sticky="top" className="shadow">
                <Navbar.Brand href="/">
                    <img src={logo} id="logo-img" alt="youngstar logo" />
                    {mode}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {createMenu}
                        {searchMenu}
                        <Nav.Link href="#link"><FaBell /></Nav.Link>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <FaUserCircle className="navbar-icon"/>profile
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem id="dropdown-item-profile" href="/profile">My profile</DropdownItem>
                                <DropdownItem id="dropdown-item-job" href={jobPath}>My job</DropdownItem>
                                <DropdownItem id="dropdown-item-balance">My balance</DropdownItem>
                                <DropdownItem id="dropdown-item-switch" href={modePath}>{switchMode}</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem id="dropdown-item-signout">Sign out</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }   
}

export default NavBar;