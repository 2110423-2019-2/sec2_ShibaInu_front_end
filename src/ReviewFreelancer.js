import React from "react";
import {Card, Container, Row, Col, Form} from "react-bootstrap";
import Rating from "@material-ui/lab/Rating"
import "./ReviewFreelancer.css";
class ReviewFreelancer extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            jobname:"Build",
            freelancername:"ABC",
            price : "10000",
            duration : "100",
            description : "",
        }
    }
    render(){
        return(
            <>
                <ReviewBox topic={"Review freelancer"}
                component={
                    
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
                                <Rating name="half-rating" defaultValue={2.5} precision={1}  />
                                </Row>
                                <Row className="txtinput">
                                <div className="title">details </div>
                                <Form.Group controlId="reviewtext" >
                                    <Form.Control
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
                                <button type="button" className="btn btn-warning" onClick={""}>
                                    Submit
                                </button>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                }
                />
            </>
        )
    }
}

// DEFAULT COMPONENT -----------------------------------------------------------------------------

class ReviewBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        topic: this.props.topic || 'NO TOPIC',
        component: this.props.component || 'NO DATA',
        size: this.props.size || 'small-box',
      };
    }
  
    render() {
  
      return (
        <Card className={'review-box' } hidden={this.props.hidden}>
          <Card.Header as="h5" className='box-topic'>
            {this.state.topic}
          </Card.Header>
          <Card.Body className='box-body'>
            {this.state.component}
          </Card.Body>
        </Card>
      );
    }
  }
export default ReviewFreelancer