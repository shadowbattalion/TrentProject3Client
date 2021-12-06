import React, {useState} from "react"
import GamesContext from "../contexts/GamesContext"
import axios from "axios"
import { useHistory } from 'react-router-dom'


export default function GamesProvider(props){


    
    const [games, setGames] = useState([])



    const context = {
        
        getGames: async (title, company_name) =>{
            try{
                let response = await axios.get('https://mhu-game-store.herokuapp.com/api/list-games', { 
                    params: { title, company_name },
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` } 
                })
                
                setGames(response.data)

                
                return response

            } catch(e){
                
                
                return null
            
            }
            
            
        },
        getGameDetails: async (gameId)=>{
            try{
                
                let response = await axios.get('https://mhu-game-store.herokuapp.com/api/list-games/'+gameId+'/details',{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })
                
                
                
                return response

            } catch(e){
                
                
                return null
            
            }
        }
     
    }

    
    return(
        <GamesContext.Provider value={context}>
            {props.children}
        </GamesContext.Provider>
    )

}