import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import CartContext from "../contexts/CartContext";





export default function Cart() {
    
    const cartContext = useContext(CartContext);

    const history = useHistory()
    let [message, setMessage] = useState("")
    let [trigger, setTrigger] = useState(0)
    const [cartStatus, setCartStatus] = useState(null)

  

    useEffect(()=>{


        const requestCart =  async() =>{
            
            let cart = await cartContext.getCart()
            
            if(cart){

                setCartStatus(cart.data)

            } else {
                
                history.push("/",{
                    "message":"Please Login to Access this Page",
                    "page_redirect":"cart"
                })

            }

            
        }

        requestCart()
        

    },[trigger])



    async function updateQuantityGame(game_id, title, operation){

        if (operation=="+"){

            message = await cartContext.increaseQuantity(game_id)

            if(message){
                if(message.data.message==true){
                    
                    setMessage("Quantity of item "+title+" increased")
        
                }else{
        
                    setMessage(message.data.message)
        
                }
            } else {

                history.push("/error-page")

            } 

            if (trigger==0){
                setTrigger(1)
            }else if(trigger==1){
                setTrigger(0)
            }

        } else if (operation=="-"){

            message = await cartContext.decreaseQuantity(game_id)

            console.log(message)
            if(message){
                if(message.data.message==true){
                    
                    setMessage("Quantity of item "+title+" reduced")
        
                }else{
        
                    setMessage(message.data.message)
        
                }
                
            } else {

                history.push("/error-page")

            }

            if (trigger==0){
                setTrigger(1)
            }else if(trigger==1){
                setTrigger(0)
            }

        }



    }


    async function removeGame(game_id, title){


            message = await cartContext.removeGame(game_id)

            if(message){
                if(message.data.message==true){
                    
                    setMessage(title+" has been removed")
        
                }else{
        
                    setMessage(message.data.message)
        
                } 
            } else {

                history.push("/error-page")

            }



            if (trigger==0){
                setTrigger(1)
            }else if(trigger==1){
                setTrigger(0)
            }

       

    }


    let cart_jsx

    
    if(cartStatus){
        let cart = cartStatus.cart_games_list
        let total = cartStatus.total
        if(cart.length!=0){
            cart_jsx=(<React.Fragment>
                <h1>Game List</h1>
                <h2>{message}</h2>
                <div>
                    <ul>
                        {
                            cart?cart.map((cartItem)=>{return <li key={cartItem.id}>{cartItem.game.title} X {cartItem.quantity} <input type="button" onClick={()=>{updateQuantityGame(cartItem.game.id, cartItem.game.title, "-")}} value="-"/> <input type="button" onClick={()=>{updateQuantityGame(cartItem.game.id, cartItem.game.title, "+")}} value="+"/> <input type="button" onClick={()=>{removeGame(cartItem.game.id, cartItem.game.title)}} value="Remove"/>  </li>}):""
                        
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