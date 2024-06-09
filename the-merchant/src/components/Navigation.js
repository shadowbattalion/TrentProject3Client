import React, { useContext, useEffect, useState} from "react"
import { Link } from "react-router-dom";
import CredentialsContext from "../contexts/CredentialsContext";
import Logout from "./Logout"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import navLogo from'./4.png';


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
        
           
            <Nav.Link><Link to ="/games"><span className="a-nav">Games List</span></Link></Nav.Link>
            <Nav.Link><Link to ="/cart"><span className="a-nav">Cart</span></Link></Nav.Link>
            <Nav.Link><Link to ="/order-history"><span className="a-nav">Order History</span></Link></Nav.Link>



        </React.Fragment>)



    } else {

        nav_jsx=(<React.Fragment>
           
    
            <Nav.Link ><Link to ="/"><span className="a-nav">Login</span></Link></Nav.Link>
            <Nav.Link><Link to ="/user-reg"><span className="a-nav">Sign Up</span></Link></Nav.Link>
               
            
        </React.Fragment>)

    }

   

    return (
        (<React.Fragment>



            <Navbar fixed="top" expand="xxl" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#home"><img src={navLogo} alt="the merchant logo" className="navlogo"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {nav_jsx}
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <div>{ creds?(<div class="mx-lg-3 my-3" >User: {creds.display_name}</div>):""}</div>
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






