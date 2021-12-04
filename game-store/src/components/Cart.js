import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import CartContext from "../contexts/CartContext";





export default function Cart() {
    
    const context = useContext(CartContext);

    const history = useHistory()
    const [cartStatus, setCartStatus] = useState(null)
  

    useEffect(()=>{


        const requestCart =  async() =>{
            
            let cart = await context.getCart()
            
            if(cart){

                setCartStatus(cart.data)

            } else {
                
                history.push("/",{
                    "message":"Please Login to Access this Page"
                })

            }

            
        }

        requestCart()
        

    },[])


    let cart_jsx

    
    if(cartStatus){
        let cart = cartStatus.cart_games_list
        let total = cartStatus.total
        if(cart.length!=0){
            cart_jsx=(<React.Fragment>
                <h1>Game List</h1>
                <div>
                    <ul>
                        {
                            cart?cart.map((cartItem)=>{return <li key={cartItem.id}>{cartItem.game.title} X {cartItem.quantity}</li>}):""
                        
                        }
                    </ul>
                </div>
                <div>
                  <h2>Total: {total}</h2>
                </div>
            </React.Fragment>)
        } else {

            cart_jsx=(<React.Fragment>
                <h1>Cart is empty</h1>
            </React.Fragment>)

        }


    } 
    
    return (
        <React.Fragment>
          {cart_jsx}
        </React.Fragment> 
    )
}