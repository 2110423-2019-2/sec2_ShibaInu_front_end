import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

class PageNotFound extends React.Component {

    render() {
        return (
            <div className="main-background">
                <Container id="adminHome-box">
                    <Row>
                        <Col  style={{ "align-item": "center" }}>
                            <Card
                                className={"text-center dashboard-box shadow small-box"} style={{ margin: "20px" }}
                            >
                                <Card.Header className="box-topic"><h5>Oops!</h5></Card.Header>
                                <Card.Body>
                                    We can't seem to find the page you are looking for. :(
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default PageNotFound;