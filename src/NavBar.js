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
                FREELANCER: "freelancer",
                GUEST: "guest"
            },
            mode: this.props.mode
        };
    }

    render(){   
        const YOUNGSTAR = "YoungStar ";
        var switchMode, createMenu, modePath, searchMenu, userMode, dropDownMenu, notiMenu, navbarMenu, signInMenu, signUpMenu, memberMenu, guestMenu;
        var jobPath = "/"+this.state.mode+"/job";

        notiMenu = <Nav.Link href="#link"><FaBell /></Nav.Link>;
        searchMenu = <Nav.Link href="#home"><FaSearch className="navbar-icon" />Search</Nav.Link>;
        userMode = YOUNGSTAR + this.state.mode;

        if(this.state.mode == this.state.status.CLIENT){
            
            createMenu = <Nav.Link href="#home"><FaPlusCircle className="navbar-icon" />Create Job</Nav.Link>;
            modePath = "/"+this.state.status.FREELANCER+"/home";
            switchMode = "Switch" + " " + this.state.status.FREELANCER;

        } else if(this.state.mode == this.state.status.FREELANCER) {

            modePath = "/";
            switchMode = "Switch" + " " + this.state.status.CLIENT;

        } else {    

            userMode=YOUNGSTAR
            signInMenu =  <Nav.Link href="#signin">Sign in</Nav.Link>;
            signUpMenu =  <Nav.Link href="#signup">Sign up</Nav.Link>;

        }

        dropDownMenu =  <DropdownMenu right>
                            <DropdownItem id="dropdown-item-profile" href="/profile">My profile</DropdownItem>
                            <DropdownItem id="dropdown-item-job" href={jobPath}>My job</DropdownItem>
                            <DropdownItem id="dropdown-item-balance">My balance</DropdownItem>
                            <DropdownItem id="dropdown-item-switch" href={modePath}>{switchMode}</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem id="dropdown-item-signout">Sign out</DropdownItem>
                        </DropdownMenu>;

        memberMenu = <Nav className="ml-auto">
                        {createMenu}
                        {searchMenu}
                        {notiMenu}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <FaUserCircle className="navbar-icon"/>profile
                            </DropdownToggle>
                            {dropDownMenu}
                        </UncontrolledDropdown>
                    </Nav>;
        
        guestMenu = <Nav className="ml-auto">
                        {signInMenu}
                        {signUpMenu}
                    </Nav>; 
        
        navbarMenu = (this.state.mode == this.state.status.GUEST)?guestMenu:memberMenu;

        var logoBrand = <Navbar.Brand href="/">
                            <img src={logo} id="logo-img" alt="youngstar logo" />
                            {userMode}
                        </Navbar.Brand>;
        
        return (
            <Navbar expand="lg" id="navbar" sticky="top" className="shadow">
                {logoBrand}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {navbarMenu}
                </Navbar.Collapse>
            </Navbar>
        );
    }   
}

export default NavBar;