import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import GamesContext from "../contexts/GamesContext";
import CartContext from "../contexts/CartContext";

export default function GameDetails() {

    const history = useHistory()
    const { gameId } = useParams();
    // console.log(gameId)
    const [ game, setGame ] = useState(null);
    const gamesContext = useContext(GamesContext);
    const cartContext = useContext(CartContext);

    useEffect(() => {



        const requestGameDetail = async() =>{
            let selected_game = await gamesContext.getGameDetails(gameId);
            await cartContext.getCart()
            // !="No such games"
            if(selected_game){

                setGame(selected_game.data.message)

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

   
    if(game){
        if(game!="No such games"){

            game_jsx=(<React.Fragment>
                <h1>{game.title}</h1>
                <div>
                    <h2>Cost: {game.cost}</h2>
                </div>
            </React.Fragment>)



        } else {

            game_jsx=(<React.Fragment>
                <h1>There is no such games</h1>
            </React.Fragment>)

        }

    }

    return (
        (<React.Fragment>
            {game_jsx}
        </React.Fragment>)
    )
}






