import React, {useState} from "react"
import CartContext from "../contexts/CartContext"
import axios from "axios"
import { useHistory } from 'react-router-dom'


export default function CartProvider(props){


    
    const [cart, setCart] = useState([])



    const context = {
        
        getCart: async () =>{
            try{
                let response = await axios.get('https://mhu-game-store.herokuapp.com/api/cart/',{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })
                
                let cartResponse = JSON.parse(JSON.stringify(response))
                let {cart_games_list, total} = cartResponse.data
                

                cart_games_list.map(cartItem=>{
                    delete cartItem.game
                    delete cartItem.sub_total    
                })

                
                
                setCart(cart_games_list)


      
            
                
                
                return response

            } catch(e){
                
                
                return null
            
            }
            
            
        },
        addGame:(game_id) => {

            console.log(game_id)
            

            
        },
    

    }

    
    return(
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    )

}