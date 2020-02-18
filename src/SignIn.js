import React from 'react';
import NavBar from "./NavBar";
import logo from './material/Logo.png';
import './SignInSignUp.css';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <div>
                <NavBar />
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
                                        <input type="text" class="form-control" id="formGroupUsernameInput" placeholder="Username" />
                                    </div>

                                    <div class="form-group">
                                        <label for="formGroupPasswordInput">Password</label>
                                        <input type="password" class="form-control" id="formGroupPasswordInput" placeholder="Password" />
                                    </div>

                                    <button type="submit" class="btn btn-success">Sign in</button>

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