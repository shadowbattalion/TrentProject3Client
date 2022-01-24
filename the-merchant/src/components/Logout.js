import React, { useContext, useState} from "react"
import { useHistory} from 'react-router-dom';
import CredentialsContext from "../contexts/CredentialsContext"


export default function Login() {

    const history = useHistory()

    const [field, setField] = useState({
        "display_name_email":"",
        "password":""
    })
   
 
    const credsContext = useContext(CredentialsContext)
    

    

    async function logout (){


            
            let logout_outcome = await credsContext.logout()

         
        
           
            if(logout_outcome===null){

                history.push("/error-page")

     
            } else {
            
                history.push("/", undefined)
                
            
            }
              
    }
   

   



    return (
        <React.Fragment>
                <a class="btn btn-primary btn-custom-primary mt-3" onClick={logout}>Logout</a>
        </React.Fragment>

    )
}








