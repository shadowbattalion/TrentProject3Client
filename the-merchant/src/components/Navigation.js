import React, { useContext, useEffect, useState} from "react"
import { Link } from "react-router-dom";
import CredentialsContext from "../contexts/CredentialsContext";
import Logout from "./Logout"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function Navigation() {

   
   

    const [ creds, setCreds ] = useState(null);
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
        
           
            <Nav.Link><Link to ="/games">Games List</Link></Nav.Link>
            <Nav.Link><Link to ="/cart">Cart</Link></Nav.Link>
            <Nav.Link><Link to ="/order-history">Order History</Link></Nav.Link>



        </React.Fragment>)



    } else {

        nav_jsx=(<React.Fragment>
           
    
            <Nav.Link><Link to ="/">Login</Link></Nav.Link>
            <Nav.Link><Link to ="/user-reg">Sign Up</Link></Nav.Link>
               
            
        </React.Fragment>)

    }

   

    return (
        (<React.Fragment>



            <Navbar expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">The Merchant</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {nav_jsx}
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <div>{ creds?(<div class="mx-3 pt-4" >User: {creds.display_name}</div>):""}</div>
                        </Navbar.Text>
                        <Navbar.Text>
                            <div>{ creds?(<Logout/>):""}</div> 
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </React.Fragment>)
    )
}






