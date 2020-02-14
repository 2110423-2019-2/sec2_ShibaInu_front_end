import React,{useState} from 'react';
import logo from './material/Logo.png'
import './Profile.css';
import {FaRegEdit} from 'react-icons/fa';
import NavBar from './NavBar';
import ProfileModal from './ProfileModal';
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={skills:['c','c++','c#'],upper1:true};
        this.handleUpper1 = this.handleUpper1.bind(this);
        
    }
    handleUpper1(){
        this.setState({upper1:true});
    }
    render(){
        
        const items1 = this.state.skills.map(function(item){
            return <li> {item} </li>;
          });
        return(
            <>
            <NavBar />
            <div className="container">
                <div className="row-5-xs" id="personal">
                    <div className ="row" id="pro-bg">
                        ProfileBG
                    </div>
                    <div className="row" id="upper-second">
                        <div className="col-3 mr" id="pro-img-frame">
                            <div id="img-f">
                                <img src={logo} className="pro-img" alt="youngstar logo"/>
                                <button className="btn" id="pic-e" onClick={this.handleUpper1}><FaRegEdit size={20} id="pic-edit"/></button>
                            </div>
                            
                        </div>
                        <div className="col-2" >
                            <div className="Fullname">Fullname</div>
                            <div className="Headline">Headline</div>
                        </div>
                        <div className="col-1"><button type="button" className="btn btn-outline-dark" id="e-link" >verify</button></div>
                        <div className="col-1" id="edit">
                            <ProfileModal/>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="">Tel</div>
                            <div className="">Email</div>
                            <div className="">website</div>
                        </div>
                        <div className="col-6">
                            <div className="">location</div>
                            <div className="">Email</div>
                        </div>
                    </div>
                </div>
                <div className="row-1 bg-danger" id="exp">
                    <div className="Exp">Experience
                    <button type="button" className="btn" id="e-link" ><FaRegEdit size={20} id="edit-icon"/></button>
                    </div>
                    

                </div>
                <div className="row-1 bg-success" id="edu">
                    <div className="Edu">Education
                    <button type="button" className="btn" id="e-link" ><FaRegEdit size={20} id="edit-icon"/></button>
                    </div>
                </div>
                <div className="row-1">
                </div>
                <div className="row-1 bg-warning" id="skill">
                    <div className="skill">Skills
                    <button type="button" className="btn" id="e-link" ><FaRegEdit size={20} id="edit-icon"/></button>
                    </div>
                    <ul className="list-group">{items1}</ul>
                    
                </div>
            </div>
            <div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Modal Header</h4>
      </div>
      <div class="modal-body">
        <p>Some text in the modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
            </>
        )
    }
}
export default Profile;