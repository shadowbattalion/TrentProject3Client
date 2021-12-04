import React, {useState} from "react"
import GamesContext from "../contexts/GamesContext"
import axios from "axios"
import { useHistory } from 'react-router-dom'


export default function GamesProvider(props){


    
    const [games, setGames] = useState([])



    const context = {
        
        getGames: async () =>{
            try{
                let response = await axios.get('https://mhu-game-store.herokuapp.com/api/list-games',{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })
                
                setGames(response.data)//check what it saved

                
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