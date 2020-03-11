import React from 'react';
import NavBar from "./NavBar";
import logo from './material/Logo.png';
import './SignInSignUp.css';
import axios from 'axios';
import LocalStorageService from './LocalStorageService';
import { Button, Form } from 'react-bootstrap';
var utilities = require('./Utilities.json');

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginData: { username: '', password: '' },
            validated: false,
            unauthorized: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        let tempData = this.state.loginData;
        tempData[e.target.name] = e.target.value;
        this.setState({
            loginData: tempData
        });
        this.setState({unauthorized: false});
    }

    handleSubmit = (e) => {

        this.setState({ validated: true });
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        }

        axios.post(utilities['backend-url'] + '/auth/login', this.state.loginData)
            .then((response) => {

                switch (response.status) {
                    // Created
                    case 201:
                        LocalStorageService.setToken(response.data.access_token || '');
                        LocalStorageService.setUserID(response.data.userId || '');
                        console.log('Logged in. Redirecting to HomeClient...');
                        window.location.href = '/client/home';
                        break;

                    // Other case
                    default:
                        console.log('Status code is ' + response.status);
                }

            })
            .catch((error) => {

                if (error.response.status === 401) {
                    console.log('Unauthorization');
                    this.setState({unauthorized: true});

                } else {
                    console.error(error);
                }
            })
    }

    render() {

        return (
            <div>
                <NavBar mode='guest' userDatas='' />
                <div className='SignInSignUp-page'>
                    <div className='left-content'>
                        <span className='left-logo'><img src={logo} id="logo-img" alt="youngstar logo" /></span>
                        <span className='seperate-line'></span>
                    </div>

                    <div className='right-area'>
                        <div className='right-content'>
                            <div className='form-name'>Sign In</div>
                            <div className='form-container'>
                                <Form noValidate={true} validated={this.state.validated} onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" placeholder="Username" name='username' value={this.state.loginData.username} onChange={this.handleChange} required />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name='password' value={this.state.loginData.password} onChange={this.handleChange} required />
                                    </Form.Group>
                                    <p className='unauthorized-message' hidden={!this.state.unauthorized}>Wrong username or password.</p>
                                    <Button variant="success" type="submit" >
                                        Sign In
                                    </Button>
                                    <p>Don't have an account? <a href='/signup'>Create account</a></p>
                                </Form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default SignIn;