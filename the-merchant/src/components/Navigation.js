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

            {/* <li class="card login-card nav-item">
                <a class="nav-link active"href="#"><Link to ="/games">Games List</Link></a>
            </li>
            <li class="card login-card nav-item">
                <a class="nav-link active"href="#"><Link to ="/cart">Cart</Link></a>
            </li>
            <li class="card login-card nav-item">
                <a class="nav-link active"href="#"><Link to ="/order-history">Order History</Link></a>
            </li> */}


        </React.Fragment>)



    } else {

        nav_jsx=(<React.Fragment>
           
           <Nav.Link href="/">Login</Nav.Link>
           <Nav.Link href="/user-reg">Sign Up</Nav.Link>

            {/* <li class="card login-card nav-item">
                <a class="nav-link active"href="#"><Link to ="/">Login</Link></a>
            </li>
            <li class="card login-card nav-item">
                <a class="nav-link active"href="#"><Link to ="/user-reg">Sign Up</Link></a>
            </li>
                */}
            
        </React.Fragment>)

    }

   

    return (
        (<React.Fragment>

            <Navbar bg="dark" expand="lg" style={{opacity:"0.5"}}>
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
        </React.Fragment>)
    )
}






