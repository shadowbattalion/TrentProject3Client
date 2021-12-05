import React, { useContext, useState} from "react"
import { useHistory, useLocation } from 'react-router-dom';
import CredentialsContext from "../contexts/CredentialsContext"


export default function UserReg() {

    const history = useHistory()
    const location = useLocation()
    const [field, setField] = useState({
        "display_name":"",
        "email":"",
        "device_specs":"",
        "password":"",
        "confirm_password":""
    })
    const[validation, setValidation] = useState({
        "display_name_missing":"",
        "email_missing":"",
        "device_specs_missing":"",
        "password_missing":"",
        "confirm_password_missing":""
    })
    const [fail, setFail] = useState("")
 
    const credsContext = useContext(CredentialsContext)
    

    

    async function regSubmit (){

        if(field.display_name && field.email && field.email.includes("@") && field.password && (field.password.trim() == field.confirm_password.trim())){
            console.log(field.display_name, field.email, field.password)
            console.log("sign in successful")
         
            let reg_outcome = await credsContext.login(field.display_name_email, field.password)
           
            if(reg_outcome===null){

                history.push("/error-page")

            } else if (reg_outcome){
                setFail("")     
                setValidation({
                    "display_name_missing":"",
                    "email_missing":"",
                    "device_specs_missing":"",
                    "password_missing":"",
                    "confirm_password_missing":""
                })

        
                history.push("/")
            
                
            } else {
                setFail("Display Name, Email or Password is incorrect")
                setValidation({
                    "display_name_missing":"",
                    "email_missing":"",
                    "device_specs_missing":"",
                    "password_missing":"",
                    "confirm_password_missing":""
                })

            }
        }else{

            console.log("sign in fail")
            let match_password = (field.password.trim() == field.confirm_password.trim())
            
            setValidation({
                "display_name_missing":field.display_name?"":"Display Name is missing",
                "email_missing":!field.email?"Email is missing":(!/\w*@\w*(\.\w{2,3})+/.test(field.email)?"Invalid Email format":""),
                "device_specs_missing":!field.device_specs?"Device Specification is missing":(field.device_specs.length>600?"Word length limit reached":""),
                "password_missing":field.password?"":"Password is missing",
                "confirm_password_missing":match_password?"":"Password does not match",
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
                    <label>Enter Display Name:</label>
                    <p>{validation?.display_name_missing}</p>
                    <input type="text" name="display_name" value={field.display_name} onChange={updateState}/>
                </div>
                <div>
                    <label>Enter Email Address:</label>
                    <p>{validation?.email_missing}</p>
                    <input type="text" name="email" value={field.email} onChange={updateState}/>
                </div>
                <div>
                    <label>Device Specifications:</label>
                    <p>{validation?.device_specs_missing}</p>
                    <textarea name="device_specs" rows="4" cols="50" value={field.device_specs} onChange={updateState}/>
                </div>
                <div>
                    <label>Password:</label>
                    <p>{validation?.password_missing}</p>
                    <input type="password" name="password" value={field.password} onChange={updateState}/>
                </div>
                <div>
                    <label>Re-Enter Password:</label>
                    <p>{validation?.confirm_password_missing}</p>
                    <input type="password" name="confirm_password" value={field.confirm_password} onChange={updateState}/>
                </div>
                <input type="button" onClick={regSubmit} value="Submit"/>
            </div>
        </React.Fragment>

    )
}








