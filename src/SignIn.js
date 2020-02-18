import React from 'react';
import NavBar from "./NavBar";
import logo from './material/Logo.png';
import './SignInSignUp.css';
import axios from 'axios';

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

        axios.post('http://35.198.228.244:10000/auth/login', this.state.loginData)
            .then((response) => {
                localStorage.setItem('access_token', response.data.access_token);
                axios.interceptors.request.use((config) => {
                    const token = localStorage.getItem('access_token');
                    config.headers.authorization = token;

                    return config;
                });
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {

        return (
            <div>
                <NavBar mode='guest' userDatas=''/>
                <div className='SignInSignUp-page'>
                    <div className='left-content'>
                        <span className='left-logo'><img src={logo} id="logo-img" alt="youngstar logo" /></span>
                        <span className='seperate-line'></span>
                    </div>

                    <div className='right-area'>
                        <div className='right-content'>
                            <div className='form-name'>Sign In</div>
                            <div className='form-container'>
                                <form >

                                    <div class="form-group">
                                        <label for="formGroupUsernameInput">Username</label>
                                        <input type="text" class="form-control" id="formGroupUsernameInput" name='username' onChange={this.handleChange} placeholder="Username" />
                                    </div>

                                    <div class="form-group">
                                        <label for="formGroupPasswordInput">Password</label>
                                        <input type="password" class="form-control" id="formGroupPasswordInput" name='password' onChange={this.handleChange} placeholder="Password" />
                                    </div>

                                    <button type="submit" class="btn btn-success" onClick={this.handleSubmit}>Sign in</button>

                                    <p>Don't have an account? <a href='/signup'>Create account</a></p>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default SignIn;