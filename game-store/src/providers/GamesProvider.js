import React, {useState} from "react"
import StoreContext from "../StoreContext"
import axios from "axios"
import { useHistory } from 'react-router-dom'


export default function GamesProvider(props){


    
    const [games, setGames] = useState([])



    const context = {
        
        getGames: async () =>{
            try{
                console.log(localStorage.getItem('access_token'))
                let response = await axios.get('https://mhu-game-store.herokuapp.com/api/list-games',{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('access_token')}` }
                })

                return response

            } catch(e){
                
                
                return null
            
            }
            
            
        },
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
        <StoreContext.Provider value={context}>
            {props.children}
        </StoreContext.Provider>
    )

}