import React from 'react';

class ImageUploader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedImage : null,
            imageUrl : null
        }
        this.selectHandler = this.selectHandler.bind(this,);
    }
    selectHandler(event){
        if(event.target.files[0]){
            let image = event.target.files[0];
            this.setState({selectedImage : image},console.log(this.state.selectedImage))
            let reader = new FileReader();
            let url = reader.readAsDataURL(image);
            reader.onloadend =  (e) => {
                this.setState({
                    imageUrl: reader.result
                })
              };
            console.log(url)
        }
    }
    uploadHandler(){
        
    }
    render(){

        return(
        <div className="image-uploader">
            <label>
                <input type="file" onChange={this.selectHandler} hidden="true"/>
                choose
            </label>
            <div className="image-container">
                {this.state.imageUrl===null?"put sth": <img src={this.state.imageUrl} alt="profile" width="200" height="200"/>}
            </div>
            <button>upload</button>
        </div>
        )
    }
}
export default ImageUploader