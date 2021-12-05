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
                    "page_redirect":""
                })

            }

            
        }

        requestOrderHistory();
    }, [])


    let orderHistoryLatest_jsx

    console.log(orderHistoryLatest)
    
    if(orderHistoryLatest){

            orderHistoryLatest_jsx=(<React.Fragment>
                <h1>Order is successful!!!!</h1>
                <div>
                    {orderHistoryLatest.total}
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