import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import GamesContext from "../contexts/GamesContext";
import CartContext from "../contexts/CartContext";

export default function GameDetails() {

    const history = useHistory()
    const { gameId } = useParams();

    const [ game, setGame ] = useState(null);
    const gamesContext = useContext(GamesContext);
    const cartContext = useContext(CartContext);

    useEffect(() => {



        const requestGameDetail = async() =>{
            let selected_game = await gamesContext.getGameDetails(gameId);
           
            // !="No such games"
            if(selected_game){

                setGame(selected_game.data.message)

            


            } else {

                history.push("/",{
                    "message":"Please Login to Access this Page",
                    "page_redirect":"game-details/"+gameId
                })

            }

            
        }

        requestGameDetail();
    }, [gameId])





    let game_jsx

   
    if(game){
        if(game!="No such games"){

            game_jsx=(<React.Fragment>
                <div class="landing-page"> 
                    <div>                     
                        <div class="card login-card">
                            <div class="card-body">
                                <h1 class="card-title">{game.title}</h1>
                                <div class="d-flex justify-content-between">
                                    <div style={{fontSize:"20px"}}>Cost: {game.cost}</div> 
                                    <div style={{fontSize:"20px"}}>Discount: {game.discount}</div> 
                                    <div><a href="#" class="btn btn-primary btn-custom-primary">Cart</a></div>
                                </div>
                                <p>{game.description}</p>
                                <img src={game.banner_image} class="img-fluid" alt="game banner image"/> 
                                <p>Released Date: {game.released_date}</p>
                                <p>Category: {game.category.name}</p>
                                <p>Tags:
                                {game.content_tags.map(tag=>(<div>{tag.name}</div>))}</p>
                                <p>Platforms:
                                {game.platforms.map(platform=>(<div>{platform.name}</div>))}</p>      
                            </div>
                        </div> 
                    </div>
                </div>

                <div>
                    {game.images.map(image=>(<div class="content-images" style={{backgroundImage: `url(${image.url})`}}></div>))}
                </div>


                <div class="landing-page mt-3"> 
                    <div>                     
                        <div class="card login-card">
                            <div class="card-body">
                                <h1 class="card-title">Reviews</h1>
                                {game.reviews.length>0?game.reviews.map(review=>(<div style={{fontSize:"20px"}}>{review.review.split("|")[0]} says: "{review.review.split("|")[1]}"</div>)):""}    
                            </div>
                        </div> 
                    </div>
                </div>
                
            </React.Fragment>)



        } else {

            game_jsx=(<React.Fragment>
                <div class="landing-page"> 
                    <div>                     
                        <div class="card login-card">
                            <div class="card-body">
                                <h1 class="card-title">There is no such games</h1>      
                            </div>
                        </div> 
                    </div>
                </div>
            </React.Fragment>)

        }

    }

    return (
        (<React.Fragment>
            {game_jsx}
        </React.Fragment>)
    )
}






