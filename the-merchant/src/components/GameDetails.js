import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import GamesContext from "../contexts/GamesContext";
import CartContext from "../contexts/CartContext";
import CredentialsContext from "../contexts/CredentialsContext";

export default function GameDetails() {

    const history = useHistory()
    const { gameId } = useParams();

    const [ game, setGame ] = useState(null);
    const [profile, setProfile] = useState(null)
    let [message, setMessage]=useState("")
    const gamesContext = useContext(GamesContext);
    const cartContext = useContext(CartContext);
    const credsContext = useContext(CredentialsContext)
    

    useEffect(() => {



        const requestGameDetail = async() =>{
            let selected_game = await gamesContext.getGameDetails(gameId);
            let profile =  await credsContext.getProfile()

            if(profile){

                setProfile(profile.device_specs)

            


            } else {

                setProfile(null)

            }
           
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


    async function addGame(game_id, title){


        message = await cartContext.addGame(game_id)

        if(message){
            if(message.data.message==true){
                
                setMessage(title+" added to cart!")

            }else{

                setMessage(message.data.message)

            }
        
        } else {

            history.push("/error-page")

        }
        


    }


    let game_jsx

   
    if(game){
        if(game!="No such games"){

            game_jsx=(<React.Fragment>
                <div class="games-details-page"> 
                    <div>                     
                        <div class="card login-card">
                            <div class="card-body">
                                <h1 class="card-title">{game.title}</h1>
                                <small>{message}</small>
                                <div class="price-details">
                                    <div class="mt-2 game-details-size">Cost: ${game.cost}</div> 
                                    <div class="mt-2 game-details-size">Discount: {game.discount}%</div> 
                                    <div><a href="#" class="btn btn-primary btn-custom-primary btn-lg" onClick={()=>{addGame(game.id, game.title)}}>Cart</a></div>
                                </div>
                                <div class="game-details">
                                    <div class="game-details-2">
                                        <img src={game.banner_image} class="img-fluid" alt="game banner image"/> 
                                    </div>
                                    <div class="game-details-1">
                                        <p class="game-details-size">{game.description}</p>
                                    </div>   
                                    <div class="game-details-3">
                                        <p class="game-details-size">Released Date: {game.released_date}</p>
                                        <p class="game-details-size">Category: {game.category.name}</p>
                                        <p class="game-details-size">Tags:
                                        {game.content_tags.map(tag=>(<div>{tag.name}</div>))}</p>
                                        <p class="game-details-size">Platforms:
                                        {game.platforms.map(platform=>(<div>{platform.name}</div>))}</p>
                                    </div>
                                </div>      
                            </div>
                        </div> 
                    </div>
                </div>

                <div>
                    {game.images.map(image=>(<div 
                                style={{
                                backgroundImage: `url(${image.url})`, 
                                minHeight: "600px",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover", 
                                backgroundAttachment: "fixed", 
                                backgroundPosition: "center",
                                }}>

                                </div>))}
                </div>


                <div class="games-details-page mt-3"> 
                    <div>                     
                        <div class="card login-card">
                            <div class="card-body">
                                <h1 class="card-title">Reviews</h1>
                                {game.reviews.length>0?game.reviews.map(review=>(<div class="game-details-size reviews-font">{review.review.split("|")[0]} | &ldquo;{review.review.split("|")[1]}&rdquo;</div>)):""}    
                            </div>
                        </div> 
                    </div>
                </div>

                <div class="games-details-page mt-3"> 
                    <div>                     
                        <div class="card login-card">
                            <div class="card-body requirements">
                                <div class="requirements-1">
                                    <h3 class="card-title">Minimum Requirements:</h3>
                                    <div class="game-details-size requirement-contents">{game.minimum_requirement}</div>
                                </div>
                                <hr class="requirements-line"/>
                                <div class="requirements-2">
                                    <h3 class="card-title">Your Specifications:</h3>
                                    {profile?(<div class="game-details-size requirement-contents">{profile}</div>):""}
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>

                <div class="games-details-page mt-3"> 
                    <div>                     
                        <div class="card login-card">
                            <div class="card-body requirements">
                                <div class="requirements-1">
                                    <h3 class="card-title">Recommended Requirements:</h3>
                                    <div class="game-details-size requirement-contents">{game.recommended_requirement}</div>
                                </div>
                                <hr class="requirements-line"/>
                                <div class="requirements-2">
                                    <h3 class="card-title">Your Specifications:</h3>
                                    {profile?(<div class="game-details-size requirement-contents">{profile}</div>):""}
                                </div>
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






