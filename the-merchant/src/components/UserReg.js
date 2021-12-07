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

        if(field.display_name && field.email && /\w*@\w*(\.\w{2,3})+/.test(field.email) && field.password && (field.password.trim() == field.confirm_password.trim())){
            console.log(field.display_name, field.email, field.password)
            console.log("sign in successful")
         
            let reg_outcome = await credsContext.register(field.display_name, field.password, field.email, field.device_specs)
            
            console.log(reg_outcome.data.message)

            if(reg_outcome===null){

                history.push("/error-page")

            } else if (reg_outcome.data.message=="User registered"){
                setFail("")     
                setValidation({
                    "display_name_missing":"",
                    "email_missing":"",
                    "device_specs_missing":"",
                    "password_missing":"",
                    "confirm_password_missing":""
                })

        
                history.push("/",{
                    "message":"User registered. Please enter the following to login.",
                    "page_redirect":"games"
                })

            } else if(reg_outcome.data.message=="Display name or email already exists"){

                setFail(reg_outcome.data.message)
                setValidation({
                    "display_name_missing":"",
                    "email_missing":"",
                    "device_specs_missing":"",
                    "password_missing":"",
                    "confirm_password_missing":""
                })
                
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
             <div class="landing-page"> 
                <div>  
                    <div class="card login-card">
                        <div class="card-body">
                            <h1 class="card-title">Sign Up</h1>
                            <small>{location.state?.message}</small>
                            <small>{fail}</small>
                            <div>
                                <label>Enter Display Name:</label>
                                <div><input type="text" name="display_name" value={field.display_name} onChange={updateState}/></div>
                                <div><small>{validation?.display_name_missing}</small></div>
                            </div>
                            <div>
                                <label>Enter Email Address:</label>
                                <div><input type="text" name="email" value={field.email} onChange={updateState}/></div>
                                <div><small>{validation?.email_missing}</small></div>
                            </div>
                            <div>
                                <label>Device Specifications:</label>
                                <div><textarea name="device_specs" rows="4" cols="35" value={field.device_specs} onChange={updateState}/></div>
                                <div><small>{validation?.device_specs_missing}</small></div>
                            </div>
                            <div>
                                <label>Password:</label>
                                <div><input type="password" name="password" value={field.password} onChange={updateState}/></div>
                                <div><small>{validation?.password_missing}</small></div>
                            </div>
                            <div>
                                <label>Re-Enter Password:</label>
                                <div><input type="password" name="confirm_password" value={field.confirm_password} onChange={updateState}/></div>
                                <div><small>{validation?.confirm_password_missing}</small></div>
                            </div>
                            <a href="#" class="btn btn-primary btn-custom-primary mt-3" onClick={regSubmit}>Submit</a>
                        </div>
                    </div>
                </div>
            </div>





            
            
                
                
        </React.Fragment>

    )
}








