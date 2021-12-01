import React, {useState} from 'react'
import { useLocation, useHistory } from 'react-router-dom'

export default function Home() {

    const history = useHistory()
    const location = useLocation()
    let message
    if(location.state){
        message = location.state.message
    }


    function loginSubmit(){

        history.push('/login-submit',{
            "login":login
        })

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
                    <input type="text" name="display_name_email" value={login.display_name_email} onChange={updateState}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="text" name="password" value={login.password} onChange={updateState}/>
                </div>
                <input type="button" onClick={loginSubmit} value="Submit"/>
            </div>
        </React.Fragment>

    )
}