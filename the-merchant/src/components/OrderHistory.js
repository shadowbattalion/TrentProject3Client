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
                            <div class="card-body order-container">
                            <div  key={order.id}>
                                <div class="game-details-size"><strong>Date/Time: </strong>{order.date}</div>
                                <div class="game-details-size"><strong>Status: </strong>{order.status}</div>
                                <div class="game-details-size"><strong>Payment method: </strong>{order.payment_method}</div>
                                <div class="game-details-size">
                                    <div><strong>Items: </strong></div>
                                    <div>{order.order_items.map(item=>{return <div>&emsp;{item.game.title} X {item.quantity} = ${item.sub_total}</div> })}</div>
                                </div>
                                <div class="game-details-size"><strong>Total: </strong>${order.total}</div>
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
            </React.Fragment>)



        } else {
            
            orderHistory_jsx=(<React.Fragment>
                <div class="card login-card cart-page mt-1">
                    <div class="card-body order-container">
                        <h1 class="card-title">There are no orders currently</h1>
                    </div>
                </div>
            </React.Fragment>)

        }

    }

    return (
        (<React.Fragment>
            <h1>Order History</h1>
            {/* {orderHistory_jsx} */}
        </React.Fragment>)
    )
}






 