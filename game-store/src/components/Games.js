import React, { useContext, useEffect, useState} from "react"
import { Link, useHistory } from 'react-router-dom';
import StoreContext from "../StoreContext"

export default function Games() {

    const history = useHistory()
    const [gameList, setGameList] = useState(null)
    const context = useContext(StoreContext)

    useEffect(()=>{


        const requestGames =  async() =>{
            let gameList = await context.getGames()
            
            if(gameList){

                setGameList(gameList.data)

            } else {
                
                history.push("/",{
                    "message":"Please Login to Access this Page"
                })

            }

            
        }

        requestGames()
        

    },[localStorage.getItem('access_token')])


    let game_list_jsx


    if(gameList){
        let games = gameList.games
        if(games.length!=0){
            game_list_jsx=(<React.Fragment>
                <h1>Game List</h1>
                <div>
                    <ul>
                        {
                            games?games.map((game)=>{return <li key={game.id}>{game.title}<Link to={"/game-details/" + game.id}>More...</Link></li>}):""
                        
                        }
                    </ul>
                </div>
            </React.Fragment>)
        } else {

            game_list_jsx=(<React.Fragment>
                <h1>Loading Game List</h1>
            </React.Fragment>)

        }


    } 
    
  

    return (
        (<React.Fragment>
            {game_list_jsx}
        </React.Fragment>)
    )
}






