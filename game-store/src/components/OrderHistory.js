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


            orderHistory_jsx=(<React.Fragment>
                <h1>Order History</h1>
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






