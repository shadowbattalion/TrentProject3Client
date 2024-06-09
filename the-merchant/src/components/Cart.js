import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import CartContext from "../contexts/CartContext";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Modal from './Modal';



 


export default function Cart() {
    
    const cartContext = useContext(CartContext);

    const history = useHistory()
    let [trigger, setTrigger] = useState(0)
    const [cartStatus, setCartStatus] = useState(null)

    const [showModal, setShowModal] = useState(false); //modal
    const [modalMessage, setModalMessage] = useState({"title":"", "message":""});//modal
  

    useEffect(()=>{


        const requestCart =  async() =>{
            
            let cart = await cartContext.getCart()
            console.log(cart.data)
            
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

            const message = await cartContext.increaseQuantity(game_id)
            

            if(message){
                if(message.data.message==true){
                    

                    setShowModal(true)
                    setModalMessage({"title":"Attention", "message":"Quantity of item "+title+" increased"})
                    
        
                }else{
        

                    setShowModal(true)
                    setModalMessage({"title":"Attention", "message":message.data.message})
                    
        
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

            const message = await cartContext.decreaseQuantity(game_id)

            
            if(message){
                if(message.data.message==true){
                    

                    setShowModal(true)
                    setModalMessage({"title":"Attention", "message":"Quantity of item "+title+" reduced"})

                    
        
                }else{

                    setShowModal(true)
                    setModalMessage({"title":"Attention", "message":message.data.message})
        
        
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


            const message = await cartContext.removeGame(game_id)

            if(message){
                if(message.data.message==true){
                    

                    setShowModal(true)
                    setModalMessage({"title":"Attention", "message":title+" has been removed"})
        
                }else{
        
                    setShowModal(true)
                    setModalMessage({"title":"Attention", "message":message.data.message})
                    
                    
        
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
        alert("This is just a stripe test module. Enter '4242 4242 4242 4242' for the card info. Expiry Date and CVC number can be anything. Email and Name can be anything also. Then click pay.")
        const message = await cartContext.checkout()

        if(message){

            if(message.data.message==true){

            
                
                
                
                history.push("/checkout", {"stripe_url":message.data.stripe_url})

       
        


            }else if(message.data.message==false){
                        
                setShowModal(true)
                setModalMessage({"title":"Attention", "message":"Please select at least one item in the game list"})

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
                    <Card bg="dark" text="white" key={cartItem.id}>
                        <Card.Body>
                            <Stack gap={3}>
                                <Row>
                                    <Col>
                                        <Image src={cartItem.game.banner_image_thumbnail } thumbnail style={{width:"120px"}} />
                                    </Col>
                                    <Col className="d-flex flex-row justify-content-end"> 
                                        {/* <Button style={{backgroundColor:"#887AFF", borderColor:"#887AFF"}} type="submit" size="lg" variant="dark" onClick={()=>{updateQuantityGame(cartItem.game.id, cartItem.game.title, "-")}}>
                                            - Quantity
                                        </Button>
                                        <Button style={{backgroundColor:"#887AFF", borderColor:"#887AFF"}} type="submit" size="lg" variant="dark" onClick={()=>{updateQuantityGame(cartItem.game.id, cartItem.game.title, "+")}}>
                                            + Quantity
                                        </Button> */}
                                        <Button  style={{backgroundColor:"#887AFF", borderColor:"#887AFF"}} type="submit" size="lg" variant="dark" onClick={()=>{removeGame(cartItem.game.id, cartItem.game.title)}}>
                                            Remove
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Text><h3>{cartItem.game.title} = ${cartItem.sub_total}</h3></Card.Text>
                                    </Col>
                                </Row>
                            </Stack>
                         </Card.Body>
                    </Card>)
            }

            cart_jsx=(<React.Fragment>
            
                    {/* <div class="card-body">
                        <h1 class="card-title">Cart</h1>
                        <small style={{color:message.color}}>{message.message_content}</small>
                    </div> */}
            <Stack gap={3}>  
                <Card bg="dark" text="white">
                    <Card.Body><h1>Cart</h1></Card.Body>
                </Card>
                {cart_item_jsx}
                <Card bg="dark" text="white">
                    <Card.Body>
                            <Row>
                                <Col>
                                    <h2>Total: ${total}</h2>
                                </Col>
                                <Col className="d-flex flex-row justify-content-end">
                                    <Button style={{backgroundColor:"#887AFF", borderColor:"#887AFF"}} type="submit" size="lg" variant="dark" onClick={()=>{checkout()}}>
                                        Checkout
                                    </Button>
                                </Col>
                            </Row>
                    </Card.Body>
                </Card>
            </Stack>
            </React.Fragment>)
        } else {

            cart_jsx=(<React.Fragment>
                <Card bg="dark" text="white">
                    <Card.Body><h1>Cart is empty</h1></Card.Body>
                </Card>
            </React.Fragment>)

        }


    } 
    
    return (
        <React.Fragment>
            <Modal show={showModal} handleClose={() => {setShowModal(false)}} title={modalMessage.title} message={modalMessage.message}/>
            <Container fluid className="cart-container-positioning cart-container-width" >
                {cart_jsx}
            </Container>
        </React.Fragment> 
    )
}