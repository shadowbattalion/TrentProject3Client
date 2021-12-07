import React, { useContext, useEffect, useState} from "react"
import { Link } from "react-router-dom";
import CredentialsContext from "../contexts/CredentialsContext";
import Logout from "./Logout"


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
        
            <li class="nav-item">
                <a class="nav-link active"href="#"><Link to ="/games">Games List</Link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link active"href="#"><Link to ="/cart">Cart</Link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link active"href="#"><Link to ="/order-history">Order History</Link></a>
            </li>


        </React.Fragment>)



    } else {

        nav_jsx=(<React.Fragment>
           
    
            <li class="nav-item">
                <a class="nav-link active"href="#"><Link to ="/">Login</Link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link active"href="#"><Link to ="/user-reg">Sign Up</Link></a>
            </li>
               
            
        </React.Fragment>)

    }

   

    return (
        (<React.Fragment>

            <nav class="navbar navbar-expand-lg navbar-property">
                <div class="container-fluid">

                    <div class="navbar-brand title-font" style={{"borderBottom": "5px solid black"}}>The Merchant</div><span class="title-divider navbar-brand title-font">|</span>

                    <div class="navbar-collapse" id="navbarSupportedContent">
                                
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 title-font">
                                            
                            {nav_jsx}
                                            
                        </ul>
                    </div>
                          
                </div>
                
            </nav>
            <div class="d-flex">
                <div>{ creds?(<div class="mx-3 py-2">User: {creds.display_name}</div>):""}</div>
                <div>{ creds?(<Logout/>):""}</div>
            </div>
        </React.Fragment>)
    )
}






