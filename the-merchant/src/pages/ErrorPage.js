import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';


export default function CartPage() {
  
    return (
        <React.Fragment>
            <Container fluid className="container-positioning container-width" >
                <Card bg="dark" text="white">
                    <Card.Body><h1 className="text-label-color">If you see this page, it means that something went wrong. Please contact the administrator.</h1></Card.Body>
                </Card>
            </Container>
        </React.Fragment> 
    )
}