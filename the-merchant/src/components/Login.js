import React, { useContext, useEffect, useState} from "react"
import Container from "react-bootstrap/Container";
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
    
    useEffect(()=>{
        alert("This is a demonstration site. If you don't see a login page, give it about 20 seconds for the backend to start up. After that, hit the refresh button. I am currently using the free version of Render which need some time to startup at the first run.")
        console.log(location.state)
        if(localStorage.getItem('access_token') && location.state==undefined){

            history.push("/games")


        }

    },[])

            

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

            
            <div class="landing-page"> 
                <div class="logo me-4">
                    <h1 class="title-font mt-5" style={{"borderBottom": "5px solid black"}}>The Merchant</h1>
                    <h2>Your One-Stop Online Gaming Shop!</h2>
                </div>
                <div>   
                   
                    <div class="card login-card">
                        <div class="card-body">
                            <h1 class="card-title">Login</h1>  
                            <small>{location.state?.message}</small>
                            <small>{fail}</small>
                            <p><span id="disclaimer">!! This is a demonstration website. <b>Do not</b> put real email and password.</span></p>
                            <div>
                                <label>Enter Display Name/Email Address: </label>
                                <div><input type="text" name="display_name_email" value={field.display_name_email} onChange={updateState}/></div>
                                <div><small>{validation?.display_name_email_missing}</small></div>
                            </div>
                            <div>
                                <label>Password: </label>
                                <div><input type="password" name="password" value={field.password} onChange={updateState}/></div>
                                <div><small>{validation?.password_missing}</small></div>
                            </div>
                            <a href="#" class="btn btn-primary btn-custom-primary mt-3" onClick={loginSubmit}>Submit</a>
                        </div>
                    </div>


                   
                </div>
            </div>
            
        </React.Fragment>

    )
}








