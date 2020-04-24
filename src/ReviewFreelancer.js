import React from "react";
import {Container, Row, Col, Form} from "react-bootstrap";
import Rating from "@material-ui/lab/Rating"
import "./ReviewFreelancer.css";
class ReviewFreelancer extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            jobname:"",
            freelancername:"",
            price : "",
            duration : "",
            description : "",
            closed : false,
        }
    }
    componentDidMount=()=>{
      this.setState({
        jobname : this.props.jobName,
        freelancername : this.props.freelancerName,
        price : this.props.price,
        duration : this.props.duration,
        description : this.props.description,
        closed : this.props.closed===undefined?true:this.props.closed
      })
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
                                Responsible : {this.state.freelancername}
                                </Row>
                                <Row>
                                <Rating name="half-rating" defaultValue={4} precision={1}  />
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
                                baht : {this.state.price}
                                </Row>
                                <Row>
                                duration : {this.state.duration}
                                </Row>
                                <Row className="button-container">
                                <button type="button" className="btn btn-warning" hidden={this.state.closed}>
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