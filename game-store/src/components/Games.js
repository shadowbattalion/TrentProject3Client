import React, { useContext, useEffect, useState} from "react"
import { Link, useHistory } from 'react-router-dom';
import GamesContext from "../contexts/GamesContext";
import CartContext from "../contexts/CartContext";
import CredentialsContext from "../contexts/CredentialsContext";

export default function Games() {

    const history = useHistory()
    const [gameList, setGameList] = useState(null)
    const [user, setUser] = useState(null)
    let [message, setMessage]=useState("")
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
                
                setMessage(title+" added to cart!")

            }else{

                setMessage(message.data.message)

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
            game_list_jsx=(<React.Fragment>
                <h2>{message}</h2>
                <div>
                    <ul>
                        {
                            games?games.map((game)=>{return <li key={game.id}>{game.title}<Link to={"/game-details/" + game.id}>More...</Link>  <input type="button" onClick={()=>{addGame(game.id, game.title)}} value="Add To Cart"/> </li>}):""
                        
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
    
    
    let search = (
        <React.Fragment>
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={field.title} onChange={updateState}/>
            </div>
            <div>
                <label>Company Name:</label>
                <input type="text" name="company_name" value={field.company_name} onChange={updateState}/>
            </div>
            <input type="button" onClick={searchSubmit} value="Submit"/>
        </React.Fragment>)
  
  

    return (
        (<React.Fragment>
            {search}
            <h1>Game List</h1>
            {game_list_jsx}
        </React.Fragment>)
    )
}






