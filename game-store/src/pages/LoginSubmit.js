import React, { useState, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import axios from 'axios'

export default function SubmittedForm(){

    const history = useHistory()
    const location = useLocation()
    let display_name_email = location.state.login.display_name_email
    let password = location.state.login.password


    useEffect(
        
        ()=>{
        const fetchPost = async (postId) => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + postId);
          
          setActivePost(response.data)
        }
  
        fetchPost(activePostId)


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
            
        </React.Fragment>
    )
}

