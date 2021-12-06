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
            {nav_jsx}
        </React.Fragment>)
    )
}






