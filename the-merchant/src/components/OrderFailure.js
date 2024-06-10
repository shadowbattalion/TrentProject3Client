import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'



export default function OrderFailure() {
  
    return (
        <React.Fragment>
            <Container fluid className="container-positioning container-width" >
                <Card bg="dark" text="white">
                    <Card.Body><h1 className="text-label-color">Order Failed. Please try again.</h1></Card.Body>
                </Card>
            </Container>
        </React.Fragment> 
    )
}