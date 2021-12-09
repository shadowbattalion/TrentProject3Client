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


    async function checkout(){

        message = await cartContext.checkout()

        console.log(message)
        if(message){

            if(message.data.message==true){

            
                
                
                
                history.push("/checkout", {"stripe_url":message.data.stripe_url})

       
        


            }else if(message.data.message==false){
                        
                setMessage("Please select at least one item in the cart")

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

            let cart_item_jsx=[]

            for (let cartItem of cart){

                cart_item_jsx.push(
                    <div class="card login-card cart-page mt-1">
                            <div class="card-body cart-items-container">
                                <div class="cart-tems" key={cartItem.id}>  
                                <div class="cart-items-flex-1">      
                                    <div class="mt-2 game-details-size">{cartItem.game.title} X {cartItem.quantity} = ${cartItem.sub_total}</div>
                                </div>
                                <div class="cart-items-flex-2 mt-3">
                                    <div><a href="#" class="btn btn-primary btn-custom-primary btn-md" onClick={()=>{updateQuantityGame(cartItem.game.id, cartItem.game.title, "-")}}>- Quantity</a></div> 
                                    <div><a href="#" class="btn btn-primary btn-custom-primary btn-md" onClick={()=>{updateQuantityGame(cartItem.game.id, cartItem.game.title, "+")}}>+ Quantity</a></div>
                                    <div><a href="#" class="btn btn-primary btn-custom-primary btn-md" onClick={()=>{removeGame(cartItem.game.id, cartItem.game.title)}} >Remove</a></div>
                                </div>
                            </div>
                         </div>
                    </div>)
            }

            cart_jsx=(<React.Fragment>
                <div class="card login-card cart-page my-3">
                    <div class="card-body">
                        <h1 class="card-title">Cart</h1>
                        <small>{message}</small>
                    </div>
                </div>
                {cart_item_jsx}
                <div class="card login-card cart-page my-3">
                    <div class="card-body">
                        <h2 class="card-title">Total: ${total}</h2>
                        <div><a href="#" class="btn btn-primary btn-custom-primary btn-md" onClick={()=>{checkout()}}>Checkout</a></div>
                    </div>
                </div>
            </React.Fragment>)
        } else {

            cart_jsx=(<React.Fragment>
                <div class="card login-card cart-page mt-1">
                    <div class="card-body order-container">
                        <h1 class="card-title">Cart is empty</h1>
                    </div>
                </div>
            </React.Fragment>)

        }


    } 
    
    return (
        <React.Fragment>
          {cart_jsx}
        </React.Fragment> 
    )
}