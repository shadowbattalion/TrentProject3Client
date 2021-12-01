import React, {useState} from 'react'
import { useLocation, useHistory } from 'react-router-dom'

export default function Home() {

    const history = useHistory()
    const location = useLocation()
    let message
    let validation
    if(location.state){

        message = location.state.message?location.state.message:""
        validation = location.state.validation?location.state.validation:""

    }


    function loginSubmit(){

        if(login.display_name_email && login.password){
            history.push('/login-submit',{
                "login":login
            })
        } else {

            let validation = {
                "missing_name_email":!login.display_name_email?"Please enter Display Name or Email":"",
                "missing_password":!login.password?"Please enter Password":"",
            }

            history.push('/login',{
                "validation":validation
            })

        }

    }

    const [login, setLogin] = useState({
        "display_name_email":"",
        "password":""

    })

    const updateState = (e) =>{

        setLogin({
            ...login,
            [e.target.name]:e.target.value
        })

    }

    return (
        <React.Fragment>
            <h1>Login</h1>
            <h2>{message}</h2>
            <div>
                <div>
                    <label>Enter Display Name/Email Address:</label>
                    <p>{validation?.missing_name_email}</p>
                    <input type="text" name="display_name_email" value={login.display_name_email} onChange={updateState}/>
                </div>
                <div>
                    <label>Password:</label>
                    <p>{validation?.missing_password}</p>
                    <input type="text" name="password" value={login.password} onChange={updateState}/>
                </div>
                <input type="button" onClick={loginSubmit} value="Submit"/>
            </div>
        </React.Fragment>

    )
}