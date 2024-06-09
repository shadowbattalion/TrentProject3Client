import React from 'react'
import Card from 'react-bootstrap/Card';


export default function CartPage() {
  
    return (
        <React.Fragment>
            <Card bg="dark" text="white">
                <Card.Body><h1 className="text-label-color">If you see this page, it means that something went wrong. Please contact the administrator.</h1></Card.Body>
            </Card>
        </React.Fragment> 
    )
}