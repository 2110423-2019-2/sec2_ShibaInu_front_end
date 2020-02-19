import React from 'react';
import NavBar from "./NavBar";
import logo from './material/Logo.png';
import './SignInSignUp.css';
import axios from 'axios';
import { Form, Button, Col } from 'react-bootstrap';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerData: { firstName: '', lastName: '', username: '', password: '' },
            validated: false,
        };
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
        this.checkPassword.bind(this);
    }

    checkPassword = (e) => {
        if (e.target.value === this.state.registerData.password) {
            e.target.setCustomValidity("");
        } else {
            e.target.setCustomValidity("Password not match");
        }

    }

    handleChange = (e) => {
        let tempData = this.state.registerData;
        tempData[e.target.name] = e.target.value;
        this.setState({
            registerData: tempData
        });

    }

    handleSubmit = (e) => {

        this.setState({ validated: true });
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        }

        axios.post('http://35.198.228.244:10000/users', this.state.registerData)
            .then((response) => {
                switch (response.status) {

                    // Created
                    case 201:
                        window.location.href = '/signin';
                        break;

                    // Other case
                    default:
                        console.log('Status code is ' + response.status);

                }
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
                            <div className='form-name'>Create an account</div>
                            <div className='form-container'>
                                <Form noValidate={true} validated={this.state.validated} onSubmit={this.handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formBasicFirstname">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control type="text" placeholder="First name" name='firstName' onChange={this.handleChange} required />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formBasicLastname">
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control type="text" placeholder="Last name" name='lastName' onChange={this.handleChange} required />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" placeholder="Username" name='username' onChange={this.handleChange} required />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name='password' onChange={this.handleChange} required />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicConfirmPassword">
                                        <Form.Label>Confirm password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm password" onChange={this.checkPassword} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a match password.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button variant="success" type="submit">
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