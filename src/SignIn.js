import React from 'react';
import NavBar from "./NavBar";
import logo from './material/Logo.png';
import './SignInSignUp.css';
import axios from 'axios';
import LocalStorageService from './LocalStorageService';
import { Button, Form } from 'react-bootstrap';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginData: { username: '', password: '' },
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
    }

    handleSubmit = (e) => {

        e.preventDefault();

        axios.post('http://35.198.228.244:10000/auth/login', this.state.loginData)
            .then((response) => {
                // localStorage.setItem('access_token', response.data.access_token);
                LocalStorageService.setToken(response.data.access_token);
            })
            .catch((error) => {
                console.error(error);
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
                                <Form>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" placeholder="Username" name='username' onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name='password' onChange={this.handleChange}/>
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={this.handleSubmit}>
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