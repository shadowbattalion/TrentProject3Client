import React, { useEffect} from "react"
import { useLocation } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';






export default function Checkout() {
    

    let get_location = useLocation()

    useEffect(() => {

      window.location.href = get_location.state.stripe_url
    
    }, []);
  
    return (

      <Container fluid className="container-positioning container-width" >
        <Card bg="dark" text="white">
          <Card.Body><h1>Stripe page incoming....</h1></Card.Body>
        </Card>
      </Container>
      
    );
  }
  
 
































