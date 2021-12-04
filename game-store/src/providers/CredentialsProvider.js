import React, {useState} from "react"
import CredentialsContext from "../contexts/CredentialsContext"
import axios from "axios"
import { useHistory } from 'react-router-dom'


export default function CredentialsProvider(props){



    
    const [credentials, setCredentials] = useState({})



    const context = {
        
        login: async (display_name_email, password) =>{
            let response = await axios.post('https://mhu-game-store.herokuapp.com/api/users/user-login',{
                "display_name_email":display_name_email,
                "password":password
            })

            if (response.data?.access_token){
                console.log(response.data)
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);

                
                
                

                return true

            } else {
               
                return false
               
            }
            
        },
        setProfile: async () =>{

            try{

                
                let response = await axios.get('https://mhu-game-store.herokuapp.com/api/users/user-profile',{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })

               

                setCredentials(response.data.user)
                
                

                return true

            } catch(e) {
               
                return null
               
            }
            
        },
        getProfile: () =>{
            return credentials
        }


    }

    
    return(
        <CredentialsContext.Provider value={context}>
            {props.children}
        </CredentialsContext.Provider>
    )

}