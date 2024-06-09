import React, { useContext, useEffect, useState} from "react"
import { useHistory} from 'react-router-dom';
import CartContext from "../contexts/CartContext";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";


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
                    <Card bg="dark" text="white" key={order.id}>
                        <Card.Body>
                            <div><strong className="text-label-color">Date/Time: </strong>{order.date}</div>
                            <div><strong className="text-label-color">Status: </strong>{order.status}</div>
                            <div><strong className="text-label-color">Payment method: </strong>{order.payment_method}</div>
                            <div>
                                <div><strong className="text-label-color">Items: </strong></div>
                                <div>{order.order_items.map(item=>{return <div>&emsp;{item.game.title} = ${item.sub_total}</div> })}</div>
                            </div>
                            <div><strong className="text-label-color">Total: </strong>${order.total}</div>
                            </Card.Body>
                        </Card>
                        )
            }

            orderHistory_jsx=(<React.Fragment>
                <Stack gap={3}>
                    <Card bg="dark" text="white">
                        <Card.Body><h1 className="text-label-color">Order History</h1></Card.Body>
                    </Card>
                    {order_jsx}
                </Stack>
            </React.Fragment>)



        } else {
            
            orderHistory_jsx=(<React.Fragment>
                <Card bg="dark" text="white">
                    <Card.Body><h1 className="text-label-color">There are no orders currently.</h1></Card.Body>
                </Card>
            </React.Fragment>)

        }

    }

    return (
        (<React.Fragment>
            <Container fluid className="container-positioning container-width" >
                {orderHistory_jsx}
            </Container>
        </React.Fragment>)
    )
}






 