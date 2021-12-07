import React, { useContext, useEffect, useState} from "react"
import { Link } from "react-router-dom";
import CredentialsContext from "../contexts/CredentialsContext";
import Logout from "./Logout"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function Nav() {

   
   

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
        
             <nav>
              <ul>
                <li>
                    <Logout/>
                </li>
                <li>
                    <Link to ="/games">Games List</Link>
                </li>
                <li>
                    <Link to ="/cart">Cart</Link>
                </li>
                <li>
                    <Link to ="/order-history">Order History</Link>
                </li>
              </ul>
            </nav>
            <div>Welcome back, {creds.display_name}</div>
        </React.Fragment>)



    } else {

        nav_jsx=(<React.Fragment>
            <nav>
              <ul>
                <li>
                    <Link to ="/">Login</Link>
                </li>
                <li>
                    <Link to ="/user-reg">Sign Up</Link>
                </li>
               
              </ul>
            </nav>
        </React.Fragment>)

    }

   

    return (
        (<React.Fragment>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {nav_jsx}
        </React.Fragment>)
    )
}






