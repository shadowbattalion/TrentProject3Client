import React, { useContext, useEffect, useState} from "react"
import { useHistory, useLocation } from 'react-router-dom';
import StoreContext from "../StoreContext"

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
 
    const context = useContext(StoreContext)


    

    async function loginSubmit (){

        if(field.display_name_email && field.password){
            //set current cart to CartProvider state
            let login_outcome = await context.login(field.display_name_email, field.password)
            if (login_outcome){
                setFail("")     
                setValidation({
                    "display_name_email_missing":"",
                    "password_missing":"",
                })
                history.push("/games")
            } else {
                setFail("Display Name, Email or Password is incorrect")
                setValidation({
                    "display_name_email_missing":"",
                    "password_missing":"",
                })

            }
        }else{
            
            setValidation({
                "display_name_email_missing":field.display_name_email?"":"Email is missing",
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
                    <input type="text" name="password" value={field.password} onChange={updateState}/>
                </div>
                <input type="button" onClick={loginSubmit} value="Submit"/>
            </div>
        </React.Fragment>

    )
}






