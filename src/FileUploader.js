import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import swal from "sweetalert"
import "./FileUploader.css"
class FileUploader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            file : null,
            onloadUpload : false,
            uploadstate : this.props.upload,
        }
    }
    selectHandler=(event)=>{
        //console.log(event.target.files[0])
        if(event.target.files[0].size > 20_000_000){
            swal("Error","File size cannot exceed 1 MB","error");
            return;
        }
        if(event.target.files[0]){
            let f = event.target.files[0];
            this.setState({file:f})
        }
        
    }

    componentDidUpdate(prevProps){
        if(this.props.upload !== prevProps.upload){
            this.setState({uploadstate : this.props.upload})
        }
    }

    uploadHandler(){
        //console.log("Uploaded");
        if(this.state.selectedImage === null){
            swal("Error","Image file cannot be null","error");
            return;
        }
        const timestamp = new Date();
        const fd = new FormData();
        fd.append('image',this.state.selectedImage,this.userId+timestamp.toString());
        //console.log(this.state.file)
        this.props.handlerUpload(fd);
        this.setState({uploadstate : false/*selectedImage:null,imageUrl:null*/});
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col>
                    <input type="file" id="file" onChange={this.selectHandler} hidden={true}/>
                    <label htmlFor="file" id="file-upload-bar">
                        <span>{this.state.file!==null?this.state.file.name:"no file choosen" }</span>
                        <span id="file-upload-button">choose</span>
                    </label>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default FileUploader;