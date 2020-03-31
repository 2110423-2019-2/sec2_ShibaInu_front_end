import React from 'react';
import {Card} from 'react-bootstrap';
class Contract extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isModifying : false,
            
        }
    }
    render(){
        return (
            <>
                <Card>
                    <Card.Header>Contract</Card.Header>
                    <Card.Body>
                        
                    </Card.Body>
                    <Card.Footer>last date modified</Card.Footer>
                </Card>
            </>
        );
    }
}
export default Contract;