import React from 'react';
import {Card, Form, Col, Row, Container,Button} from 'react-bootstrap';
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
            creating : false,
            jobName: "",
            editedData : {price:0,text: example},
            currData: {price:0,text: example},
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
          .then((confirm) => {
            if (confirm) {
                swal("Your new contract has been submit", {
                    icon: "success",
                });
                this.onCreateContract();
            }
          });
    }
    handleAccept(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        axios
        .patch(utilities["backend-url"] + "/contracts/updateByJobId/" + this.state.jobId,{
            status : "accepted"
        })
        .then(res=>{
            console.log(res);
            // window.location.href = "/dashboard/"+this.state.freelancerId
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
            window.location.href = "/dashboard/"+this.state.jobId
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
        if(this.state.bidwage != -1 && this.state.currData.price ==-1){
            this.setState({currData : {price : this.state.bidwage , text : example}})
            this.setState({editedData : {price : this.state.bidwage , text : example}})
            this.state({creating : true})
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
        .get(utilities["backend-url"] + "/bids/bidId/" + this.state.jobId)
        .then(res =>{
            let bid = [];
            for(let i=0; i<res.data.length;i++){
                if(res.data[i].userId == this.state.freelancerId){
                   bid.push(res.data[i].biddedWage)
                }
            }
            if(bid.length != 0){
                this.setState({bidwage : bid[bid.length-1]})
            }
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
                currData:{price : res.data.price||0, text : res.data.description||example},
                editedData:{price : res.data.price||0, text : res.data.description||example},
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
            window.location.href = "/dashboard/"+this.state.jobId
        })
        .catch(err=>{
            console.log(err);
        })
    }
    async onUpdateContract(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        await axios
        .patch(utilities["backend-url"] + "/contracts/updateByJobId" + this.state.jobId,{
            freelancerId:this.state.freelancerId,
            price : this.state.editedData.price,
            description : this.state.editedData.text
        })
        .then(res=>{
            console.log(res);
            window.location.href = "/dashboard/"+this.state.freelancerId
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render(){
        if(!this.state.loadContractData || !this.state.loadJobData || this.state.bidwage===-1){
            return(
                <>
                </>
            )
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
                            Updated : {
                                this.state.modifiedTime
                            }
                            </div>
                            <div classname="col2" hidden={this.state.status === "accepted"}>
                                {this.state.mode === "freelancer"?
                                <>
                                <Button variant="outline-danger" onClick={this.handleDecline}>Decline</Button>{' '}
                                <Button variant="outline-success" onClick={this.handleAccept}>Accept</Button>{' '}
                                </>
                                :
                                <>
                                <Button variant="outline-danger" onClick={this.handlerDiscard}>Cancel</Button>{' '}
                                <Button variant="outline-secondary" onClick={this.handlerEdit}>Edit</Button>{' '}
                                <Button variant="outline-success" onClick={this.handleSubmit}>Submit</Button>{' '}
                                </>
                                }
                            </div>
                        
                    </Card.Footer>
                </Card>
                </Container>
            </>
        );
    }
}
export default Contract;