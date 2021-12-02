import React, { useState, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import axios from 'axios'

export default function SubmittedForm(){

    const history = useHistory()
    const location = useLocation()
    let display_name_email = location.state.login.display_name_email
    let password = location.state.login.password

   

    useEffect(() => {
        const fetchPost = async (display_name_email, password) =>{
            let response = await axios.post('https://mhu-game-store.herokuapp.com/api/users/user-login',{
                "display_name_email":display_name_email,
                "password":password
            })
            console.log(response.data) 

            setInterval(async function () {
                
                if (localStorage.getItem('refresh_token')) {
                    console.log(localStorage.getItem('refresh_token'))
                    let response_refresh = await axios.post('https://mhu-game-store.herokuapp.com/api/users/user-refresh', {
                      'refresh_token': localStorage.getItem('refresh_token')
                    });
                    console.log(response_refresh.data) 
                    localStorage.setItem('access_token', response_refresh.data.access_token);
                
                  }

            },10000)


            
            
            if (response.data?.access_token){
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                history.push('/games')
            } else {

                history.push('/login',{
                        "message":response.data.error
                })

            }
        }

        if(display_name_email || password){
            fetchPost(display_name_email, password)
        }

    }, [display_name_email, password])




   



    return (
        <React.Fragment>
       
        </React.Fragment>
    )
}

