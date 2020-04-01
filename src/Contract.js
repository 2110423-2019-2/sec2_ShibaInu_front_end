import React from 'react';
import {Card, Form, Col, Row, Container,Button} from 'react-bootstrap';
import NavBar from './NavBar';
import CKEditor from 'ckeditor4-react';
import "./Contract.css"
import example from './contractExample'
import swal from 'sweetalert';
class Contract extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isFreelancer : true,
            isModifying : false,
            jobName: "name",
            editedData : {price:0,text: example},
            currData: {price:0,text: example},
            modifiedTime: new Date().toLocaleString(),
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
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                swal("Your new contract has been submit", {
                    icon: "success",
                });
                ///api
            }
          });
    }
    handleAccept(){

    }
    handleDecline(){

    }
    componentDidMount(){
    }
    render(){
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
                            <Form.Control plaintext  disabled defaultValue={"name1"} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextClient">
                        <Form.Label column sm="2">
                        Freelancer
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext  disabled defaultValue={"name2"} />
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
                                type="inline"
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
                            <div classname="col2">
                                {this.state.isFreelancer?
                                <>
                                <Button variant="outline-danger" onClick={this.handleAccept}>Decline</Button>{' '}
                                <Button variant="outline-success" onClick={this.handleDecline}>Accept</Button>{' '}
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