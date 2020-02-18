import React from 'react';
import NavBar from "./NavBar";
import logo from './material/Logo.png';
import './SignInSignUp.css';
import axios from 'axios';

class SignUp extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            registerData : { fullname:'', username:'', password:'' },
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

    render(){   

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
                            <div className='form-name'>Create an account</div>
                            <div className='form-container'>
                                <form >

                                    <div class="form-group">
                                        <label for="formGroupFullNameInput">Full name</label>
                                        <input type="text" class="form-control" id="formGroupFullNameInput" name='fullname' onChange={this.handleChange} placeholder="Full name" />
                                    </div>

                                    <div class="form-group">
                                        <label for="formGroupUsernameInput">Username</label>
                                        <input type="text" class="form-control" id="formGroupUsernameInput" name='username' onChange={this.handleChange} placeholder="Username" />
                                    </div>

                                    <div class="form-group">
                                        <label for="formGroupPasswordInput">Password</label>
                                        <input type="password" class="form-control" id="formGroupPasswordInput" name='password' onChange={this.handleChange} placeholder="Password" />
                                    </div>

                                    <div class="form-group">
                                        <label for="formGroupRepeatPasswordInput">Repeat password</label>
                                        <input type="password" class="form-control" id="formGroupRepeatPasswordInput" placeholder="Repeat password" />
                                    </div>

                                    <button type="submit" class="btn btn-success" onClick={this.handleSubmit}>Sign up</button>

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