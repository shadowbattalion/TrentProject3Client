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
        addGame: async(game_id) => {

            try{
                let response = await axios.post('https://mhu-game-store.herokuapp.com/api/cart/'+game_id+'/add',"",{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })
                    
                                    
                
                    
                    
                return response

            } catch(e){
                    
                    
                return null
            
            }
            
        },
        increaseQuantity: async(game_id)=>{

            
            try{
                let response = await axios.put('https://mhu-game-store.herokuapp.com/api/cart/'+game_id+'/quantity/add',"",{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })


                return response
            } catch(e){
                    
                    
                return null
            
            }

        },
        decreaseQuantity: async(game_id)=>{

            try{
                let response = await axios.put('https://mhu-game-store.herokuapp.com/api/cart/'+game_id+'/quantity/subtract',"",{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })

                return response
            } catch(e){
                    
                    
                return null
            
            }

        },
        removeGame: async(game_id)=>{

            try{
                let response = await axios.post('https://mhu-game-store.herokuapp.com/api/cart/'+game_id+'/delete',"",{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })


                return response
            } catch(e){
                    
                    
                return null
            
            }

        },
        checkout: async()=>{

            try{
                let response = await axios.get('https://mhu-game-store.herokuapp.com/api/checkout/',{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })


                return response
            } catch(e){
                    
                    
                return null
            
            }

        },
        orderHistory:async()=>{

            try{
                let response = await axios.get('https://mhu-game-store.herokuapp.com/api/order/user-orders',{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })


                return response
            } catch(e){
                    
                    
                return null
            
            }

        },
        orderHistoryLatest:async()=>{

            try{
                let response = await axios.get('https://mhu-game-store.herokuapp.com/api/order/user-orders-latest',{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })

                console.log(response.data.latest_user_order)
                return response
            } catch(e){
                    
                    
                return null
            
            }

        },
    

    }

    
    return(
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    )

}