import React, { useContext, useState} from "react"
import { useHistory, useLocation } from 'react-router-dom';
import CredentialsContext from "../contexts/CredentialsContext"


export default function Login() {

    const history = useHistory()
    const location = useLocation()
    const [field, setField] = useState({
        "display_name_email":"",
        "password":""
    })
    const[validation, setValidation] = useState({
        "display_name_email_missing":"",
        "password_missing":""
    })
    const [fail, setFail] = useState("")
 
    const credsContext = useContext(CredentialsContext)
    

    

    async function loginSubmit (){

        if(field.display_name_email && field.password){
            
            let login_outcome = await credsContext.login(field.display_name_email, field.password)
            await credsContext.refresh()
           
            if(login_outcome===null){

                history.push("/error-page")

            } else if (login_outcome){
                setFail("")     
                setValidation({
                    "display_name_email_missing":"",
                    "password_missing":"",
                })

                console.log(location)
                if (location.state!==undefined){

                    history.push("/"+location.state.page_redirect)
            
                }else{
            
                    history.push("/games")
            
                }
                
            } else {
                setFail("Display Name, Email or Password is incorrect")
                setValidation({
                    "display_name_email_missing":"",
                    "password_missing":"",
                })

            }
        }else{
            
            setValidation({
                "display_name_email_missing":field.display_name_email?"":"Display Name or Email is missing",
                "password_missing":field.password?"":"Password is missing",
            })
            
           
        }
              
    }
   

    const updateState = (e) =>{

        setField({
            ...field,
            [e.target.name]:e.target.value
        })

    }



    return (
        <React.Fragment>
            <h1>Login</h1>
            <h2>{location.state?.message}</h2>
            <h2>{fail}</h2>
            <div>
                <div>
                    <label>Enter Display Name/Email Address:</label>
                    <p>{validation?.display_name_email_missing}</p>
                    <input type="text" name="display_name_email" value={field.display_name_email} onChange={updateState}/>
                </div>
                <div>
                    <label>Password:</label>
                    <p>{validation?.password_missing}</p>
                    <input type="password" name="password" value={field.password} onChange={updateState}/>
                </div>
                <input type="button" onClick={loginSubmit} value="Submit"/>
            </div>
        </React.Fragment>

    )
}







