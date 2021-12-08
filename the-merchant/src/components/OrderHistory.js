import React, { useContext, useEffect, useState} from "react"
import { useHistory} from 'react-router-dom';
import CartContext from "../contexts/CartContext";

export default function GameDetails() {

    const history = useHistory()
    let [orderHistory, setOrderHistory] = useState()
    const cartContext = useContext(CartContext);

    useEffect(() => {


        const requestOrderHistory = async() =>{
            let orderHistory = await cartContext.orderHistory();
          
            if(orderHistory){

                setOrderHistory(orderHistory.data.user_orders)

            


            } else {

                history.push("/",{
                    "message":"Please Login to Access this Page",
                    "page_redirect":"order-history"
                })

            }

            
        }

        requestOrderHistory();
    }, [])





    let orderHistory_jsx

    console.log(orderHistory)
    if(orderHistory){
        if(orderHistory.length!=0){

            let order_jsx=[]

            for (let order of orderHistory){

                order_jsx.push(
                    <div class="card login-card cart-page mt-1">
                            <div class="card-body cart-items-container">
                                <div class="cart-items-flex-1">
                                    <div class="cart-tems" key={order.id}>    
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

            orderHistory_jsx=(<React.Fragment>
                <div class="card login-card cart-page my-3">
                    <div class="card-body">
                        <h1 class="card-title">Order History</h1>
                    </div>
                </div>
                {order_jsx}
                <div>
                    <ul>
                        {
                            orderHistory?orderHistory.map((order)=>{return <li key={order.id}>{order.total}</li>}):""
                        
                        }
                    </ul>
                </div>
            </React.Fragment>)



        } else {
            
            orderHistory_jsx=(<React.Fragment>
                <h1>There are no order currently</h1>
            </React.Fragment>)

        }

    }

    return (
        (<React.Fragment>
            {orderHistory_jsx}
        </React.Fragment>)
    )
}






