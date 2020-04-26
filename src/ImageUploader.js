import React from 'react';
import {Spinner,Container,Row,Col} from 'react-bootstrap';
import swal from 'sweetalert'
import "./ImageUploader.css"

class ImageUploader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedImage : null,
            imageUrl : null,
            onloadUpload : false,
            uploadstate : this.props.upload,
            maxHeight:1920,
            maxWidth:1080,
            limit_file_size : 5_000_000,
            fd : null,
            file : null,
        }
        this.selectHandler = this.selectHandler.bind(this,);
        this.uploadHandler = this.uploadHandler.bind(this);
        this.resizeImage = this.resizeImage.bind(this);
    }
    selectHandler=async(event)=>{
        if(event.target.files[0]&&event.target.files[0].size > this.state.limit_file_size){
            swal("Error","Image file size cannot exceed "+(this.state.limit_file_size/10**6)+" MB","error");
            document.getElementById("image"+this.props.name||"").value = ""
            return;
        }
        else if(event.target && event.target.files[0]){
            let image = event.target.files[0];
            let reader = new FileReader();
            this.setState({imageUrl:null})
            reader.onloadstart = () => {
                this.setState({onloadUpload : true})
            }
            reader.onload =  () => {
                let img = new Image();
                img.src = reader.result;
                img.onload = ()=>{
                    let resizedImageUrl = this.resizeImage(img,this.state.maxHeight,this.state.maxWidth,1.0);
                    this.setState({
                        imageUrl: resizedImageUrl
                    })
                }
                this.setState({selectedImage : image})
                
            }
            reader.onloadend = ()=>{
                this.setState({onloadUpload:false})
                this.uploadHandler()
            }
            reader.readAsDataURL(image);
        }
        
    }
    resizeImage(image, maxWidth, maxHeight, quality) {
        let canvas = document.createElement('canvas');
    
        let width = image.width;
        let height = image.height;
    
        if (width > height) {
            if (width > maxWidth) {
                height = Math.round(height * maxWidth / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round(width * maxHeight / height);
                height = maxHeight;
            }
        }
    
        canvas.width = width;
        canvas.height = height;
    
        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);
        /*canvas.toBlob((blob)=>{
            this.setState({selectedImage: blob})
        }, "image/jpg",quality);*/
        return canvas.toDataURL("image/jpg", quality);
    }
    uploadHandler=async()=>{
        if(this.state.selectedImage === null){
            return;
        }
        const timestamp = new Date();
        const fd = new FormData();
        fd.append('image',this.state.selectedImage,timestamp.toString()+".jpg");
        this.setState({fd:fd})
        this.props.handlerUpload(fd)
        //this.setState({uploadstate : false,selectedImage:null,imageUrl:null});
    }
    render(){
        return(
        <Container className="image-uploader">
            <Row>
                <Col className="image-container">
                {this.state.onloadUpload?<Spinner animation="border" />:null}
                {this.state.imageUrl===null? null: <img src={this.state.imageUrl} alt="profile" width="200" height="200"/>}
                </Col>
            </Row>
            <Row>
                <Col>
                <input type="file" id={"image"+this.props.name||""} onChange={this.selectHandler} accept="image/*" hidden={true} key={this.props.name||""}/>
                <div id="image-upload-bar">
                <span>{this.state.selectedImage!==null?this.state.selectedImage.name:"no file choosen"}</span>
                    <label htmlFor={"image"+this.props.name||""} >
                    <span id="image-upload-button" variant={this.state.imageUrl===null?"secondary":"primary"}>choose</span>
                    </label>
                </div>
                <p className="unauthorized-message" id="image-error">{this.props.error}</p>
                </Col>
            </Row>
            
           
        </Container>
        )
    }
}
export default ImageUploader