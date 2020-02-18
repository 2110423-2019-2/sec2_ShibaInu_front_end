import React from 'react';
import NavBar from "./NavBar";
import logo from './material/Logo.png';
import './SignInSignUp.css';

class SignUp extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
        };
    }

    render(){   

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
                            <div className='form-name'>Create an account</div>
                            <div className='form-container'>
                                <form >

                                    <div class="form-group">
                                        <label for="formGroupFullNameInput">Full name</label>
                                        <input type="text" class="form-control" id="formGroupFullNameInput" placeholder="Full name" />
                                    </div>

                                    <div class="form-group">
                                        <label for="formGroupUsernameInput">Username</label>
                                        <input type="text" class="form-control" id="formGroupUsernameInput" placeholder="Username" />
                                    </div>

                                    <div class="form-group">
                                        <label for="formGroupPasswordInput">Password</label>
                                        <input type="password" class="form-control" id="formGroupPasswordInput" placeholder="Password" />
                                    </div>

                                    <div class="form-group">
                                        <label for="formGroupRepeatPasswordInput">Repeat password</label>
                                        <input type="password" class="form-control" id="formGroupRepeatPasswordInput" placeholder="Repeat password" />
                                    </div>

                                    <button type="submit" class="btn btn-success">Sign up</button>

                                        <p>Already have an account? <a href='/signin'>Sign in</a></p>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }   
}

export default SignUp;