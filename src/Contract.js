import React from 'react';
import {Card, Form, Col, Row, Container,Button,Alert} from 'react-bootstrap';
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
        }
        this.handlerEdit=this.handlerEdit.bind(this);
        this.onEditorChange=this.onEditorChange.bind(this,);
        this.onPriceChange=this.onPriceChange.bind(this,);
        this.handlerDiscard=this.handlerDiscard.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleAccept=this.handleAccept.bind(this);
        this.handleDecline=this.handleDecline.bind(this);
    }
    handlerEdit(){
        let prev = this.state.isModifying;
        this.setState({isModifying:!prev});
    }
    onEditorChange(evt){
        let price = this.state.editedData.price;
        this.setState( {
            editedData: {text:evt.editor.getData(),price:price}
        });
    }
    onPriceChange(evt){
        let text = this.state.editedData.text;
        this.setState({
            editedData:{price:evt.target.value,text:text}
        });
        console.log(this.state.editedData.text)
    }
    handlerDiscard(){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                swal("Your new contract has been discarded", {
                    icon: "success",
                });
                let data = this.state.currData
                this.setState({editedData:data});
            }
          });
        
    }
    handleSubmit(){
        swal({
            title: "Are you sure?",
            text: "Once submit, you will not be able to recover this  contract!",
            icon: "success",
            buttons: true,
            dangerMode: true,
          })
          .then(async(confirm) => {
            if (confirm) {
                swal("Your new contract has been submit", {
                    icon: "success",
                });
                if(this.state.creating){
                    await this.onCreateContract();
                }else{
                    await this.onUpdateContract();
                }
                window.history.back();
            }
          })
          
    }
    handleAccept(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        axios
        .patch(utilities["backend-url"] + "/contracts/updateByJobId/" + this.state.jobId,{
            status : "accepted"
        })
        .then(()=>{
            axios.patch(utilities["backend-url"] + "/jobs/" + this.state.jobId,{
                status : "accepted"
            })
        })
        .then(()=>{
            window.history.back();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    handleDecline(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        axios
        .patch(utilities["backend-url"] + "/contracts/updateByJobId/" + this.state.jobId,{
            status : "rejected"
        })
        .then(res=>{
            console.log(res);
            window.history.back();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    async componentDidMount(){
        this.setState({mode : LocalStorageService.getUserMode()});
        await this.getJobDetail();
        await this.getUserName();
        await this.getContractDetail();
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
            console.log(err);
        })
    }
    async getContractDetail(){
        
        await axios
        .get(utilities["backend-url"] + "/contracts/jobId/" + this.state.jobId)
        .then(res =>{
            console.log(res.data)
            this.setState({
                currData:{price : res.data.price, text : res.data.description||example},
                editedData:{price : res.data.price, text : res.data.description||example},
                modifiedTime : res.data.updatedTime,
                status : res.data.status,
                loadContractData:true,
                creating : false,
            })
        })
        .catch(err=>{
            console.log(err);
            this.setState({loadContractData : true,})
        });
    }
    async onCreateContract(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        await axios
        .post(utilities["backend-url"] + "/contracts",{
            jobId : this.state.jobId,
            freelancerId: this.state.freelancerId,
            price : this.state.editedData.price,
            description : this.state.editedData.text,
        })
        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(err=>{
            console.log(err);
            return err;
        })
    }
    async onUpdateContract(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        await axios
        .patch(utilities["backend-url"] + "/contracts/updateByJobId/" + this.state.jobId,{
            freelancerId:this.state.freelancerId,
            price : this.state.editedData.price,
            description : this.state.editedData.text,
            status : "null"
        })
        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(err=>{
            console.log(err);
            return err;
        })
    }

    renderRejected(){
        if(this.state.status === "rejected" && this.state.mode === "client"){
           return <AlertDanger />
        }
    }

    renderButton(){
        if(this.state.mode === "client" && this.state.status !== "accepted"){
            return (<>
                <Button variant="outline-danger" onClick={this.handlerDiscard}>Cancel</Button>{' '}
                <Button variant="outline-secondary" onClick={this.handlerEdit}>Edit</Button>{' '}
                <Button variant="outline-success" onClick={this.handleSubmit}>Submit</Button>{' '}
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

    render(){
        if(!this.state.loadContractData || !this.state.loadJobData || this.state.bidwage===-1){
            return null
        }
        if(this.state.mode === "client" && LocalStorageService.getUserID() != this.state.clientId ){
            return (
                <>
                    <NavBar mode={this.state.mode} userDatas={""} />
                    <h1 align="center">you're not allowed to access this page</h1>
                </>
            )
        }
        if(this.state.mode === "freelancer" && LocalStorageService.getUserID() != this.state.freelancerId ){
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
                    <Form>
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
                        <Col sm="10">
                            <Form.Control 
                            value={this.state.editedData.price}
                            plaintext={!this.state.isModifying} 
                            disabled={!this.state.isModifying} 
                            onChange={this.onPriceChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}  controlId="formContract">
                        <Form.Label column sm="2">
                        Contract
                        </Form.Label>
                        <Col sm="10">
                            <CKEditor
                                config={
                                    {
                                        extraPlugins : 'autogrow',
                                    }
                                }
                                data={this.state.editedData.text}
                                type="classic"
                                readOnly = {!this.state.isModifying}
                                onChange={this.onEditorChange}
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
                            <div classname="col2" >
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