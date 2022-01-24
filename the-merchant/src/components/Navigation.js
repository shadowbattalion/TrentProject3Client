import React, { useContext, useEffect, useState} from "react"
import { Link,  useLocation } from "react-router-dom";
import CredentialsContext from "../contexts/CredentialsContext";
import Logout from "./Logout"

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'



export default function Navigation() {

   
   

    const [ creds, setCreds ] = useState(null);
    const location = useLocation()
    const credentialsContext = useContext(CredentialsContext)

    useEffect(() => {



        const requestCredentials = async() =>{
            let creds = await credentialsContext.getProfile();
           
            
            if(creds){

                setCreds(creds)

            


            } else {

                setCreds(null)

            }

            
        }

        requestCredentials();
    }, [localStorage.getItem('access_token')])



    



    let nav_jsx

    
    
    if(creds){


        

        nav_jsx=(<React.Fragment>
            

            <Nav.Link href="/games">Games List</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/order-history">Order History</Nav.Link>

        
        </React.Fragment>)



    } else {

        nav_jsx=(<React.Fragment>
           
           <Nav.Link href="/">Login</Nav.Link>
           <Nav.Link href="/user-reg">Sign Up</Nav.Link>
            
        </React.Fragment>)

    }

   

    return (
        (<React.Fragment>

            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">The Merchant</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {nav_jsx}
                    </Nav>
                    </Navbar.Collapse>
                    <div class="d-flex">                        
                        <div>{ creds?(<div class="mx-3 pt-4">User: {creds.display_name}</div>):""}</div>
                        <div>{ creds?(<Logout/>):""}</div>
                    </div>
                </Container>
            </Navbar>

        </React.Fragment>)
    )
}






