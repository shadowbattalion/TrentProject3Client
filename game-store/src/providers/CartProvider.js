import React, {useState} from "react"
import CartContext from "../contexts/CartContext"
import axios from "axios"
import { useHistory } from 'react-router-dom'


export default function CartProvider(props){


    
    const [cart, setCart] = useState(["test"])



    const context = {
        
        getCart: async () =>{
            try{
                let response = await axios.get('https://mhu-game-store.herokuapp.com/api/list-games',{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })
                
                // setGames(response.data)

                
                return response

            } catch(e){
                
                
                return null
            
            }
            
            
        },
        test: () =>{return cart}
        // addProduct:(new_product_name, cost) => {
        //     console.log(new_product_name, cost)
        //     let id = Math.floor(Math.random() * 10000 + 9999)
        //     setProducts([...products,{
        //         "id":id,
        //         "product_name":new_product_name,
        //         "cost":cost
        //     }])
        // },
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