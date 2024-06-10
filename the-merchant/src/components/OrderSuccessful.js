import React, { useContext, useEffect, useState} from "react"
import { useHistory} from 'react-router-dom';
import CartContext from "../contexts/CartContext";
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

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
                <Card bg="dark" text="white" key={orderHistoryLatest.id}>
                    <Card.Body>
                        <h1 className="text-label-color">Order Successful!!</h1>
                        <div><strong className="text-label-color">Date/Time: </strong>{orderHistoryLatest.date}</div>
                        <div><strong className="text-label-color">Status: </strong>{orderHistoryLatest.status}</div>
                        <div><strong className="text-label-color">Payment method: </strong>{orderHistoryLatest.payment_method}</div>
                        <div>
                            <div><strong className="text-label-color">Items: </strong></div>
                            <div>{orderHistoryLatest.order_items.map(item=>{return <div>&emsp;{item.game.title} X {item.quantity} = ${item.sub_total}</div> })}</div>
                        </div>
                        <div><strong className="text-label-color">Total: </strong>${orderHistoryLatest.total}</div>
                    </Card.Body>
                </Card>
            </React.Fragment>)



    } else {
            
            orderHistoryLatest_jsx=(<React.Fragment>
                <Card bg="dark" text="white">
                    <Card.Body><h1 className="text-label-color">Couldn't fetch latest order. Please check order history to check latest transaction.</h1></Card.Body>
                </Card>
            </React.Fragment>)

    }

   
  
    return (
        <React.Fragment>
            <Container fluid className="container-positioning container-width" >
                {orderHistoryLatest_jsx}
            </Container>
        </React.Fragment> 
    )
}