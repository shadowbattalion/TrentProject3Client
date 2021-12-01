import React, { useState, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import axios from 'axios'

export default function SubmittedForm(){

    const history = useHistory()
    const location = useLocation()
    let display_name_email = location.state.login.display_name_email
    let password = location.state.login.password

    const [activePost, setActivePost] = useState({})

    useEffect(() => {
        const fetchPost = async (display_name_email, password) =>{
            let response = await axios.post('https://mhu-game-store.herokuapp.com/api/users/user-login',{
                "display_name_email":display_name_email,
                "password":password
            })
            console.log(response.data) 
            setActivePost(response.data)
        }

        if(display_name_email || password){
            fetchPost(display_name_email, password)
        }

    }, [display_name_email, password])




    if(false){

        history.push('/games')

    } else {

        history.push('/login',{
            "message":"Email, display name or password is incorrect"
        })

    }



    return (
        <React.Fragment>
        <h1>TEST</h1>
        </React.Fragment>
    )
}

