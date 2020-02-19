import React from 'react';
import NavBar from "./NavBar";
import logo from './material/Logo.png';
import './SignInSignUp.css';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerData: { fullname: '', username: '', password: '' },
        };
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        let tempData = this.state.registerData;
        tempData[e.target.name] = e.target.value;
        this.setState({
            registerData: tempData
        });

    }

    handleSubmit = (e) => {

        e.preventDefault();

        // axios.post('http://35.198.228.244:10000/users', this.state.registerData)
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     })
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
                            <div className='form-name'>Create an account</div>
                            <div className='form-container'>
                                <Form>
                                    <Form.Group controlId="formBasicFullname">
                                        <Form.Label>Full name</Form.Label>
                                        <Form.Control type="text" placeholder="Full name" name='fullname' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" placeholder="Username" name='username' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name='password' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicRepeatPassword">
                                        <Form.Label>Repeat password</Form.Label>
                                        <Form.Control type="password" placeholder="Repeat password" />
                                    </Form.Group>

                                    <Button variant="success" type="submit" onClick={this.handleSubmit}>
                                        Sign Up
                                    </Button>
                                    <p>Already have an account? <a href='/signin'>Sign in</a></p>
                                </Form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default SignUp;