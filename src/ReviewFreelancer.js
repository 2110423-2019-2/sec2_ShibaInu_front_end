import React from "react";
import {Container, Row, Col, Form} from "react-bootstrap";
import Rating from "@material-ui/lab/Rating"
import "./ReviewFreelancer.css";
class ReviewFreelancer extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            jobname:"",
            targetName:"",
            price : "",
            duration : {day:"",hour:"",min:"",sec:""},
            description : "",
            mode: "" ,
            closed : false,
            rating : 3,
            writeReview : null,
        }
    }
    handleRating=(e)=>{
      this.setState({rating:e.target.value})
    }
    handleShowDuration=()=>{
      let str = "";
      if(this.state.duration.day>0){
        str+= this.state.duration.day+" day"
      }
      if(this.state.duration.hour>0){
        str+= this.state.duration.hour+" hour"
      }
      if(this.state.duration.min>0){
        str+= this.state.duration.min+" min"
      }
      else{
        str+=0
      }
      return str
    }
    componentDidMount=()=>{
      this.setState({
        jobname : this.props.jobName,
        targetName : this.props.targetName,
        price : this.props.price,
        duration : this.props.duration,
        description : this.props.description,
        rating : this.props.rating,
        mode : this.props.mode,
        closed : this.props.closed===undefined?true:this.props.closed,
        writeReview : this.props.handleWrite
      })
    }
    handleWriteReview=()=>{
      this.state.writeReview(this.state.description,this.state.rating)
    }
    render(){
        return(
            <>
               
                    <Container fluid>
                        <Row>
                            <Col md={8}>
                                <Row>
                                <h3>{this.state.jobname}</h3>
                                </Row>
                                <Row>
                                {this.state.mode==="client"?"Freelancer":"Client"} : {this.state.targetName}
                                </Row>
                                <Row>
                                <Rating name="half-rating" value={this.state.rating} onChange={this.handleRating} precision={1} readOnly={this.state.closed} />
                                </Row>
                                <Row className="txtinput">
                                <div className="title">detail </div>
                                <Form.Group controlId="reviewtext" >
                                    <Form.Control
                                    disabled={this.state.closed}
                                    plaintext={this.state.closed}
                                    value={this.state.description}
                                    className="reviewarea"
                                    as="textarea"
                                    onChange={e => {
                                        this.setState({ description: e.target.value });
                                    }}
                                    />
                                </Form.Group>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <Row>
                                price : {this.state.price}
                                </Row>
                                <Row>
                                duration : {this.handleShowDuration()}
                                </Row>
                                <Row className="button-container">
                                <button type="button" className="btn btn-warning" hidden={this.state.closed} onClick={this.handleWriteReview}>
                                    Submit
                                </button>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                
                
            </>
        )
    }
}

// DEFAULT COMPONENT -----------------------------------------------------------------------------

export default ReviewFreelancer