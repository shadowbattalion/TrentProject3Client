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

            {/* <nav class="navbar navbar-expand-lg navbar-property">
                <div class="container-fluid">

                    <div class="navbar-brand title-font" style={{"borderBottom": "5px solid black"}}>The Merchant</div><span class="title-divider navbar-brand title-font">|</span>

                    <div class="navbar-collapse" id="navbarSupportedContent">
                                
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 title-font">
                                            
                            {nav_jsx}
                                            
                        </ul>
                    </div>
                          
                </div>
                
            </nav>
            <div class="d-flex ms-3 mb-3">
                <div>{ creds?(<Logout/>):""}</div>
                <div>{ creds?(<div class="mx-3 pt-4">User: {creds.display_name}</div>):""}</div>
            </div> */}


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






