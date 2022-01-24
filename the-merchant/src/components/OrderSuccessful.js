import React, { useContext, useEffect, useState} from "react"
import { useHistory} from 'react-router-dom';
import CartContext from "../contexts/CartContext";

export default function OrderSuccessful() {
    
    const history = useHistory()
    let [orderHistoryLatest, setOrderHistoryLatest] = useState()
    const cartContext = useContext(CartContext);

    useEffect(() => {


        const requestOrderHistory = async() =>{
            let orderHistoryLatest = await cartContext.orderHistoryLatest();
          
            if(orderHistoryLatest){

                setOrderHistoryLatest(orderHistoryLatest.data.latest_user_order)

            


            } else {

                history.push("/",{
                    "message":"Please Login to Access this Page",
                    "page_redirect":"order-history"
                })

            }

            
        }

        requestOrderHistory();
    }, [])


    let orderHistoryLatest_jsx

   
    
    if(orderHistoryLatest){

            orderHistoryLatest_jsx=(<React.Fragment>
                <div class="card login-card cart-page mt-1">
                            <div class="card-body order-container">
                            <h1 class="card-title">Order Successful!!</h1>
                            <div  key={orderHistoryLatest.id}>
                                <div class="game-details-size"><strong>Date/Time: </strong>{orderHistoryLatest.date}</div>
                                <div class="game-details-size"><strong>Status: </strong>{orderHistoryLatest.status}</div>
                                <div class="game-details-size"><strong>Payment method: </strong>{orderHistoryLatest.payment_method}</div>
                                <div class="game-details-size">
                                    <div><strong>Items: </strong></div>
                                    <div>{orderHistoryLatest.order_items.map(item=>{return <div>&emsp;{item.game.title} X {item.quantity} = ${item.sub_total}</div> })}</div>
                                </div>
                                <div class="game-details-size"><strong>Total: </strong>${orderHistoryLatest.total}</div>
                            </div>
                         </div>
                    </div>
            </React.Fragment>)



    } else {
            
            orderHistoryLatest_jsx=(<React.Fragment>
                <h1>Couldn't fetch latest order. Please check order history to check latest transaction.</h1>
            </React.Fragment>)

    }

   
  
    return (
        <React.Fragment>
            {orderHistoryLatest_jsx}
        </React.Fragment> 
    )
}