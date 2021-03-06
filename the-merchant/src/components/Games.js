import React, { useContext, useEffect, useState} from "react"
import { Link, useHistory } from 'react-router-dom';
import GamesContext from "../contexts/GamesContext";
import CartContext from "../contexts/CartContext";
import CredentialsContext from "../contexts/CredentialsContext";

export default function Games() {

    const history = useHistory()
    const [gameList, setGameList] = useState(null)
    const [user, setUser] = useState(null)
    let [message, setMessage]=useState({
        "message_content":"",
        "color":""
    })
    const [field, setField] = useState({
        "title":"",
        "company_name":""
    })
    let [trigger, setTrigger] = useState(0)
    const gamesContext = useContext(GamesContext)
    const cartContext = useContext(CartContext)

    useEffect(()=>{

        
        const requestGames =  async() =>{
            let gameList = await gamesContext.getGames(field.title, field.company_name)
            

            if(gameList){
                setUser(user)
                setGameList(gameList.data.games)

            } else {
                
                history.push("/",{
                    "message":"Please Login to Access this Page",
                    "page_redirect":"games"
                })

            }

            
        }

        requestGames()
        

    },[trigger])


    async function addGame(game_id, title){


        message = await cartContext.addGame(game_id)

        if(message){
            if(message.data.message==true){
                setMessage({
                    "message_content":title+" added to cart!",
                    "color":"green"
                })
            }else{
            
                setMessage({
                    "message_content":message.data.message,
                    "color":"red"
                })

             
            }
        
        } else {

            history.push("/error-page")

        }
        


    }


    function searchSubmit(){



        if (trigger==0){
            setTrigger(1)
        }else if(trigger==1){
            setTrigger(0)
        }


    }

    const updateState = (e) =>{

        setField({
            ...field,
            [e.target.name]:e.target.value
        })

    }


    let game_list_jsx


    if(gameList){ //always check if got null or not because useEffect will run later and change the state
        let games = gameList

        

        if(games.length!=0){
            let game_jsx=[]

            game_jsx.push(
                    <div class="card table-headers">
                            <div class="card-body">
                                <div class="items">    
                                    <h3 class="item-title mt-2">Title</h3>                                    
                                    <h3 class="item-company-name mt-2">Company</h3>
                                    <div class="price-details item-price">
                                        <div class="mt-2 game-details-size">Price</div> 
                                        <div class="mt-2 game-details-size">Discount</div> 
                                        <div class="mt-2 game-details-size">Action</div>
                                    </div>
                                </div>
                            </div>
                        </div>            
            )



            for (let game of games){
                game_jsx.push(
                        <div class="card login-card mt-1">
                            <div class="card-body">
                                <div class="items" key={game.id}>    
                                    <img src={game.banner_image_thumbnail} class="img-fluid item-thumb" alt="game banner image"/> 
                                    <h3 class="item-title mt-2" style={{textOverflow:"ellipsis"}}><strong class="game-list-bold">Title: </strong><Link to={"/game-details/" + game.id}>{game.title}</Link></h3>                                    
                                    <h3 class="item-company-name mt-2" style={{textOverflow:"ellipsis"}}><strong class="game-list-bold">Company: </strong>{game.company_name}</h3>
                                    <div class="price-details item-price">
                                        <div class="mt-2 game-details-size">${game.cost}</div> 
                                        <div class="mt-2 game-details-size">{game.discount}%</div> 
                                        <div><a href="#" class="btn btn-primary btn-custom-primary btn-lg" onClick={()=>{addGame(game.id, game.title)}}>Add to Cart</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>)

            }

            game_list_jsx=(<React.Fragment>
                    <div class="game-list-page mt-3">
                        {game_jsx}
                    </div>
            </React.Fragment>)
        } else {

            game_list_jsx=(<React.Fragment>
                <div class="game-list-page mt-3">   
                    <div class="card login-card">
                        <div class="card-body">
                            <h1 class="card-title">Loading Game List</h1>
                        </div>
                    </div>         
                </div>
            </React.Fragment>)

        }


    }
    
    
    let search = (
        <React.Fragment>
            <div class="game-list-page">   
                <div class="card login-card">
                    <div class="card-body">
                        <h1 class="card-title">Search For Games</h1>
                        <small style={{color:"black"}}>Inputs are case sensitive.</small><br/>
                        <div class="search-bar mt-3">
                            <div>
                                <label>Title: </label>
                                <input type="text" name="title" value={field.title} onChange={updateState}/>
                            </div>
                            <div>
                                <label>Company Name: </label>
                                <input type="text" name="company_name" value={field.company_name} onChange={updateState}/>
                            </div>
                        </div>
                        <a href="#" class="btn btn-primary btn-custom-primary mt-3" onClick={searchSubmit}>Search</a>
                    </div>
                </div>         
            </div>
            <div class="game-list-page mt-3">   
                <div class="card login-card">
                    <div class="card-body">
                        <h1 class="card-title">Game List</h1>
                        <small style={{color:"black"}}>Click on the game Title name to check out the cool features!</small><br/>
                        <small style={{color:message.color}}>{message.message_content}</small>
                    </div>
                </div>         
            </div>
        </React.Fragment>)
  
  

    return (
        (<React.Fragment>
            {search}
            {game_list_jsx}
        </React.Fragment>)
    )
}






