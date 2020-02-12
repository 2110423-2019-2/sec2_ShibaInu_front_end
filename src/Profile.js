import React from 'react';
import logo from './material/Logo.png'
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <div class="container-lg center">
                <div class="row-8 bg-dark">
                    <div class ="row">
                        <div class="col bg-white">s</div>
                    </div>
                    <div class="row">
                        <div class="col-2"><img src={logo} className="navbar-logo-img" alt="youngstar logo" /></div>
                        <div class="col-10" >
                            <div className="Fullname">Fullname</div>
                            <div className="Headline">Headline</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div classname="">Tel</div>
                            <div classname="">Email</div>
                            <div classname="">website</div>
                        </div>
                        <div class="col-6">
                            <div classname="">location</div>
                            <div classname="">Email</div>
                        </div>
                    </div>
                </div>
                <div class="row-1">

                </div>
                <div class="row-1">

                </div>
                <div class="row-1">
                    
                </div>
            </div>
        )
    }
}
export default Profile;