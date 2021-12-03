import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import StoreContext from "../StoreContext"

export default function GameDetails() {

    const history = useHistory()
    const { gameId } = useParams();
    // console.log(gameId)
    const [ game, setGame ] = useState(null);
    const context = useContext(StoreContext);

    useEffect(() => {



        const requestGameDetail = async() =>{
            let selected_game = context.getGameDetails(gameId);
            // console.log(selected_game.data)
            if(selected_game){

                setGame(selected_game.data)

            // } else if(selected_game?.message){


            } else {

                history.push("/",{
                    "message":"Please Login to Access this Page"
                })

            }

            
        }

        requestGameDetail();
    }, [gameId])





    let game_jsx

    // console.log(game)

    if(game){

        game_jsx=(<React.Fragment>
            <h1>Game List</h1>
            <div>
                <h1>Product Name: {game.title}</h1>
                <h2>Cost: {game.cost}</h2>
            </div>
        </React.Fragment>)



    } 

    return (
        (<React.Fragment>
            {game_jsx}
        </React.Fragment>)
    )
}






