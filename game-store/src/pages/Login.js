import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Home() {

    const history = useHistory()


    function loginSubmit(){

        history.push('/login-submit')

    }



    return (
        <React.Fragment>
            <h1>Login</h1>
            <div>
                <div>
                    <label>Enter Display Name/Email Address:</label>
                    <input type="text" name="fullname"/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="text" name="email"/>
                </div>
                <input type="button" onClick={loginSubmit}>Submit</input>
            </div>
        </React.Fragment>

    )
}