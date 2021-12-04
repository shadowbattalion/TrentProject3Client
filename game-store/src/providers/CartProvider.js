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
        addGame:(user_id, game_id) => {

            // console.log(user_id,game_id)
            

            for (let item of cart){

                if(item.game_id == game_id){
                    console.log("1")
                    item.quantity=item.quantity+1

                }else{
                    console.log("2")
                    cart.push({
                        "id":"+",
                        "quantity": 1,
                        "user_id": user_id,
                        "game_id": game_id,

                    })

                }

                console.log(cart)

            }
            // console.log(new_product_name, cost)
            // let id = Math.floor(Math.random() * 10000 + 9999)
            // setProducts([...products,{
            //     "id":id,
            //     "product_name":new_product_name,
            //     "cost":cost
            // }])
        },
        // getProductById:(productID)=>{
        //     return products.filter(p=>p.id === parseInt(productID))[0]
        // }

    }

    
    return(
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    )

}