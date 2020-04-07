import React from 'react';
import {Card, Form, Col, Row, Container,Button,Alert,Spinner} from 'react-bootstrap';
import NavBar from './NavBar';
import CKEditor from 'ckeditor4-react';
import "./Contract.css"
import example from './contractExample'
import swal from 'sweetalert';
import axios from 'axios';
import LocalStorageService from './LocalStorageService'
let utilities = require('./Utilities.json')
class Contract extends React.Component{
    constructor(props){
        super(props)
        this.state={
            contractId : null,
            jobId: this.props.params.jobId,
            bidwage : -1,
            clientId: null,
            clientName: "",
            freelancerName: "",
            freelancerId: this.props.params.freelancerId,
            mode : "",
            isModifying : false,
            creating : true,
            jobName: "",
            editedData : {price:-1,text: example},
            currData: {price:-1,text: example},
            modifiedTime: "",
            loadContractData : false,
            loadJobData: false,
            status : "null",
            inputError : {price : false},
            fetchError : {loadUser : false, loadJob : false}
        }
        this.handleEdit=this.handleEdit.bind(this);
        this.onTextChange=this.onTextChange.bind(this,);
        this.onPriceChange=this.onPriceChange.bind(this,);
        this.handleDiscard=this.handleDiscard.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleAccept=this.handleAccept.bind(this);
        this.handleDecline=this.handleDecline.bind(this);
    }
    redirect(time){
        setTimeout(()=>{
            window.history.back()
        },time);
    }
    handleEdit(){
        let prev = this.state.isModifying;
        this.setState({isModifying:!prev});
    }
    onTextChange(evt){
        this.setState({
            editedData:{...this.state.editedData,text : evt.editor.getData()}
        });
        
    }
    onPriceChange(evt){
        if(evt.target.value === ""){
            this.setState({
                inputError:{...this.state.inputError,price : true}
            });
        }else{
            this.setState({
                inputError:{...this.state.inputError,price : false}
            });
        }
        this.setState({
            editedData:{...this.state.editedData,price : evt.target.value}
        });
    }
    handleDiscard(){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let data = this.state.currData
                this.setState({editedData:data});
            }
          });
        
    }
    handleSubmit(e){
        if(this.state.inputError.text || this.state.inputError.price){
            return;
        }
        swal({
            title: "Are you sure?",
            text: "Once submit, you will not be able to recover this  contract!",
            icon: "success",
            buttons: true,
            dangerMode: true,
          })
          .then(async(confirm) => {
            if (confirm) {
                let res;
                if(this.state.creating){
                    res = await this.onCreateContract();
                }else{
                    res = await this.onUpdateContract();
                }
                if(res.error !== null){
                    swal("Error occured!", {
                        icon: "error",
                    });
                }else{
                    swal("Your new contract has been submit, You will go back in 3 seconds", {
                        icon: "success",
                        timer : 3000,
                        buttons : false,
                    });
                    this.redirect(3000)
                     
                    
                }
            }
          })
          return false;
    }
    handleAccept(){
        swal({
            title: "Are you sure?",
            text: "Once Accept, you will not be able to cancel this  contract!",
            icon: "success",
            buttons: true,
            dangerMode: true,
          })
          .then(async(confirm) => {
            if (confirm) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
                let status;
                await axios
                .get(utilities["backend-url"] + "/contracts/jobId/" + this.state.jobId)
                .then(res=>{
                    status = res.data.status;
                }).catch(err=>{
                    console.log(err)
                })
                if(status != null && status === "accepted"){
                    swal("Error occured!", {
                        icon: "error",
                    });
                    return;
                }
                await axios
                .patch(utilities["backend-url"] + "/contracts/accept/" + this.state.contractId,{
                    status : "accepted"
                })
                .then(()=>{
                    swal("Your new contract has been submit, You will go back in 3 seconds", {
                        icon: "success",
                        timer : 3000,
                        buttons : false,
                    });
                    this.redirect(3000)
                })
                .catch(err=>{
                    console.log(err);
                    swal("Error occured!", {
                        icon: "error",
                    });
                })
            }
          })
        
    }

    handleDecline(){
        swal({
            title: "Are you sure?",
            text: "Once Decline, you will not be able to cancel this  contract!",
            icon: "success",
            buttons: true,
            dangerMode: true,
          })
          .then(async(confirm) => {
            if (confirm) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
                let status;
                await axios
                .get(utilities["backend-url"] + "/contracts/jobId/" + this.state.jobId)
                .then(res=>{
                    status = res.data.status;
                }).catch(err=>{
                    console.log(err)
                })
                if(status != null && status === "accepted"){
                    swal("Error occured!", {
                        icon: "error",
                    });
                    return;
                }
                await axios
                .patch(utilities["backend-url"] + "/contracts/updateByJobId/" + this.state.jobId,{
                    status : "rejected"
                })
                .then(()=>{
                    swal("Your new contract has been submit, You will go back in 3 seconds", {
                        icon: "success",
                        timer : 3000,
                        buttons : false,
                    });
                    this.redirect(3000)
                })
                .catch(err=>{
                    console.log(err);
                    swal("Error occured!", {
                        icon: "error",
                    });
                })
            }
          })
    }
    async componentDidMount(){
        this.setState({mode : LocalStorageService.getUserMode()});
        await this.getJobDetail();
        await this.getContractDetail();
        await this.getUserName();
        if(this.state.currData.price === -1){
            this.setState({currData : {price : this.state.bidwage , text : example}})
            this.setState({editedData : {price : this.state.bidwage , text : example}})
        }
    }
    async getJobDetail(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        await axios
        .get(utilities["backend-url"] + "/jobs/" + this.state.jobId)
        .then(res => {
            this.setState({
            jobName: res.data.name,
            clientId: res.data.client.userId,
            loadJobData:true,
            })
            
        })
        .catch(err=>{
            console.log(err);
            this.setState({fetchError : {...this.state.fetchError, loadJob :true}})
        });
    }
    async getUserName(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        await axios
        .get(utilities["backend-url"] + "/users/" + this.state.clientId)
        .then(res=>{
            this.setState({clientName : res.data.firstName+" "+res.data.lastName})
        })
        .catch(err=>{
            console.log(err)
        })
        await axios
        .get(utilities["backend-url"] + "/users/" + this.state.freelancerId)
        .then(res=>{
            this.setState({freelancerName : res.data.firstName+" "+res.data.lastName})
        })
        .catch(err=>{
            this.setState({freelancerId : null})
            console.log(err)
        })
        await axios
        .get(utilities["backend-url"] + "/bids/jobuser/"+ this.state.jobId+","+this.state.freelancerId)
        .then(res =>{
            console.log(res)
            this.setState({bidwage : res.data.biddedWage})
        })
        .catch(err =>{
            console.log(err.response.status);
            this.setState({fetchError : {...this.state.fetchError, loadUser :true}})
        })
    }
    async getContractDetail(){
        
        await axios
        .get(utilities["backend-url"] + "/contracts/jobId/" + this.state.jobId)
        .then(res =>{
            console.log(res.data)
            let time;
            if(res.data.status === "accepted"){
                time = res.data.updatedTime;
            }
            else{
                time = res.data.acceptedTime
            }
            this.setState({
                contractId : res.data.contractId,
                currData:{price : res.data.price, text : res.data.description||example},
                editedData:{price : res.data.price, text : res.data.description||example},
                freelancerId : res.data.freelancerId,
                modifiedTime : time,
                status : res.data.status,
                loadContractData:true,
                creating : false,
            })
        })
        .catch(err=>{
            console.log(err.response.status);
            this.setState({loadContractData : true,})
        });
    }
    async onCreateContract(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        let ans = {result : null, error: null};
        await axios
        .post(utilities["backend-url"] + "/contracts",{
            jobId : this.state.jobId,
            freelancerId: this.state.freelancerId,
            price : this.state.editedData.price,
            description : this.state.editedData.text,
        })
        .then(res=>{
            console.log(res);
            ans.result = res.data;
        })
        .catch(err=>{
            console.log(err);
            ans.error = err;
        })
        return ans;
    }
    async onUpdateContract(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        let ans = {result : null, error: null};
        let status;
        await axios
        .get(utilities["backend-url"] + "/contracts/jobId/" + this.state.jobId)
        .then(res=>{
            status = res.data.status;
        }).catch(err=>{
            console.log(err)
        })
        if(status != null && status === "accepted"){
            ans.error = "error,contact was accepted"
            return ans;
        }
        await axios
        .patch(utilities["backend-url"] + "/contracts/updateByJobId/" + this.state.jobId,{
            price : this.state.editedData.price,
            description : this.state.editedData.text,
            status : "null"
        })
        .then(res=>{
            console.log(res);
            ans.result = res.data;
        })
        .catch(err=>{
            console.log(err);
            ans.error = err;
        })
        return ans;
    }

    renderRejected(){
        if(this.state.status === "rejected" && this.state.mode === "client"){
           return <AlertDanger />
        }
    }

    renderButton(){
        if(this.state.mode === "client" && this.state.status !== "accepted"){
            return (<>
                <Button variant="outline-danger" onClick={this.handleDiscard}>Cancel</Button>{' '}
                <Button variant="outline-secondary" onClick={this.handleEdit}>Edit</Button>{' '}
                <Button variant="outline-success" onClick={this.handleSubmit} >Submit</Button>{' '}
            </>)
        }
        else if(this.state.mode === "freelancer" && this.state.status !== "accepted" && this.state.status !== "rejected"){
            return ( 
                    <>
                    <Button variant="outline-danger" onClick={this.handleDecline}>Decline</Button>{' '}
                    <Button variant="outline-success" onClick={this.handleAccept}>Accept</Button>{' '}
                    </>
                    )
        }
        else{
            return null;
        }
    }

    renderReload() {
        return (<Spinner animation="border" role="status" className="loading">
          <span className="sr-only">Loading...</span>
        </Spinner>);
    }

    render(){
        if(!this.state.loadContractData || !this.state.loadJobData || this.state.bidwage===-1){
            if(this.state.fetchError.loadJob || this.state.fetchError.loadUser){
                return (
                    <>
                        <NavBar mode={this.state.mode} userDatas={""} />
                        <h1 align="center">you're not allowed to access this page</h1>
                    </>
                )
            }
            return (
                <>
                <NavBar mode={this.state.mode} userDatas={""} />
                {this.renderReload()}
            </>
            )
        }
        if(this.state.mode === "client" && parseInt(LocalStorageService.getUserID()) !== this.state.clientId ){
            return (
                <>
                    <NavBar mode={this.state.mode} userDatas={""} />
                    <h1 align="center">you're not allowed to access this page</h1>
                </>
            )
        }
        if(this.state.mode === "freelancer" && parseInt(LocalStorageService.getUserID()) !== this.state.freelancerId ){
            return (
                <>
                    <NavBar mode={this.state.mode} userDatas={""} />
                    <h1 align="center">you're not allowed to access this page</h1>
                </>
            )
        }
        if(this.state.mode === "client" && parseInt(LocalStorageService.getUserID()) === this.state.clientId &&
        (!this.state.creating) && this.state.freelancerId.toString() !== this.props.params.freelancerId.toString()){
            return (
                <>
                    <NavBar mode={this.state.mode} userDatas={""} />
                    <h1 align="center">you're not allowed to access this page</h1>
                </>
            )
        }
        return (
            <>  
                <NavBar mode={this.state.mode} userDatas={""} />
                <Container>
                <Card className="contract-box">
                    <Card.Header className="header">Contract</Card.Header>
                    <Card.Body className="contract-box-body">
                    {this.renderRejected()}
                    <Form >
                    <Form.Group as={Row} controlId="formPlaintextJob">
                        <Form.Label column sm="2">
                        Job
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext  disabled defaultValue={this.state.jobName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextClient">
                        <Form.Label column sm="2">
                        Client
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext  disabled defaultValue={this.state.clientName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextClient">
                        <Form.Label column sm="2">
                        Freelancer
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext  disabled defaultValue={this.state.freelancerName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPrice">
                        <Form.Label column sm="2">
                        Price
                        </Form.Label>
                        <Col sm="3">
                            <Form.Control
                            type = "number"
                            value={this.state.editedData.price}
                            disabled={!this.state.isModifying} 
                            onChange={this.onPriceChange}
                            required
                            isInvalid={this.state.inputError.price}
                            />
                            <Form.Control.Feedback type="invalid">Price should be number</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}  controlId="formContract">
                        <Form.Label column sm="2">
                        Contract
                        </Form.Label>
                        <Col sm="10">
                            <CKEditor
                                data={this.state.editedData.text}
                                type="classic"
                                readOnly = {!this.state.isModifying}
                                onChange={this.onTextChange}
                                 
                            />
                        </Col>
                    </Form.Group>
                    </Form>
                    </Card.Body>
                    <Card.Footer className="contract-box-footer">
                    
                            <div className="col1">
                            updated : {
                                this.state.modifiedTime
                            }
                            </div>
                            <div className="col1">
                            {this.state.status === "null"?
                             null
                             :
                            "status : "+(this.state.status === "accepted"? "accepted" : "rejected")
                            }
                            </div>
                            <div className="col2" >
                                {this.renderButton()}
                            </div>
                        
                    </Card.Footer>
                </Card>
                </Container>
            </>
        );
    }
}

class AlertDanger extends React.Component{
    constructor(props){
        super(props)
        this.state={
            show : true
        }
    }
    handleShow(){
        this.setState({show:false})
    }
    render(){
        if(!this.state.show){
            return null;
        }
        return (
        <Alert variant={"danger"} onClose={()=>this.handleShow()} dismissible>
            <p>Your contract are rejected </p>
        </Alert>
        )
    }
}
export default Contract;