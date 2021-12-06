import React, {useState} from "react"
import CredentialsContext from "../contexts/CredentialsContext"
import axios from "axios"
import { useHistory } from 'react-router-dom'


export default function CredentialsProvider(props){



    
    // const [log, setLog] = useState(0)



    const context = {
        register: async (display_name,password,email,device_specs) =>{
            try{

                console.log(display_name,password,email,device_specs)

                let response = await axios.post('https://mhu-game-store.herokuapp.com/api/users/user-reg',{
                    display_name,
                    password,
                    email,
                    device_specs
                })

                
                return response

            }catch(e){

                return false


            }
        },
        login: async (display_name_email, password) =>{

            try{
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
            } catch(e){

                return null


            }
            
        },
        refresh: async () =>{

            setInterval(async function () {
                
                if (localStorage.getItem('refresh_token')) {
                    
                    let response_refresh = await axios.post('https://mhu-game-store.herokuapp.com/api/users/user-refresh', {
                      'refresh_token': localStorage.getItem('refresh_token')
                    });
                    
                    localStorage.setItem('access_token', response_refresh.data.access_token);
                
                  }

            },10000)


        },
        getProfile: async () =>{

            try{

                
                let response = await axios.get('https://mhu-game-store.herokuapp.com/api/users/user-profile',{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })

               

             
                
                

                return response.data.user

            } catch(e) {
               
                return null
               
            }
            
        },
        logout: async()=>{

            try{
                if (localStorage.getItem('refresh_token')){
                    
                    let response = await axios.post("https://mhu-game-store.herokuapp.com/api/users/user-logout", {
                        'refresh_token': localStorage.getItem('refresh_token')
                    });
                
                    console.log(response.data);
                
                
                    localStorage.setItem('access_token','')
                    localStorage.setItem('refresh_token','')
                }

                return true
            } catch(e) {
                
                return null
            
            }

        }
    

    }

    
    return(
        <CredentialsContext.Provider value={context}>
            {props.children}
        </CredentialsContext.Provider>
    )

}