import React from 'react';
import {Spinner,Badge} from 'react-bootstrap';
import swal from 'sweetalert'

class ImageUploader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId : null,
            selectedImage : null,
            imageUrl : null,
            onloadUpload : false,
            uploadstate : this.props.upload,
            maxHeight:1920,
            maxWidth:1080,
        }
        this.selectHandler = this.selectHandler.bind(this,);
        this.uploadHandler = this.uploadHandler.bind(this);
        this.resizeImage = this.resizeImage.bind(this);
    }
    selectHandler(event){
        console.log("do")
        if(event.target.files[0]){
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
                //this.setState({selectedImage : image},console.log(image))
                
            }
            reader.onloadend = ()=>{
                this.setState({onloadUpload:false})
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
        canvas.toBlob((blob)=>{
            this.setState({selectedImage: blob})
        }, "image/jpg",quality);
        return canvas.toDataURL("image/jpg", quality);
    }
    componentDidUpdate(prevProps){
        if(this.props.upload !== prevProps.upload){
            this.setState({uploadstate : this.props.upload})
        }
    }
    uploadHandler(){
        console.log("Uploaded");
        if(this.state.selectedImage === null){
            swal("Error","Image file cannot be null","error");
            return;
        }
        const timestamp = new Date();
        const fd = new FormData();
        fd.append('image',this.state.selectedImage,this.userId+timestamp.toString());
        this.props.handlerUpload(fd);
        this.setState({uploadstate : false/*selectedImage:null,imageUrl:null*/});
    }
    render(){
        if(this.state.uploadstate){
            this.uploadHandler()
        }
        return(
        <div className="image-uploader">
            
            <div className="image-container">
                {this.state.onloadUpload?<Spinner animation="border" />:null}
                {this.state.imageUrl===null? null: <img src={this.state.imageUrl} alt="profile" width="200" height="200"/>}
            </div>
            <label>
                <input type="file" onChange={this.selectHandler} value={this.state.image} accept="image/*" hidden={true}/>
                <Badge variant={this.state.imageUrl===null?"secondary":"primary"}>choose</Badge>
            </label>{' '}
            {this.state.selectedImage!==null?this.state.selectedImage.name:"no file choosen"}
        </div>
        )
    }
}
export default ImageUploader