import React, { useContext, useEffect, useState} from "react"
import { Link, useHistory } from 'react-router-dom';
import StoreContext from "../StoreContext"

export default function LoginPage() {

    const history = useHistory()
    const [games, setGames] = useState([])
 
    const context = useContext(StoreContext)

    useEffect(()=>{


        const load_games =  async() =>{
            let gameList = await context.getGames()
            if(gameList){

                setGames(gameList.data.games)

            } else {

                history.push("/")

            }

            
        }

        load_games()
        





    },[localStorage.getItem('access_token')])


    let game_list_jsx
    console.log(games.length)
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
            <h1>Authentication Error</h1>
        </React.Fragment>)

    }

    return (
        (<React.Fragment>
            {game_list_jsx}
        </React.Fragment>)
    )
}






