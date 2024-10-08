import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import CartContext from "../contexts/CartContext";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
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

            const cart = await cartContext.getCart()

            const retrieveGameInCart = cart.data.cart_games_list.filter((game)=>{
                    return game.game_id === game_id
            })


            if(retrieveGameInCart[0].quantity===1){

                setShowModal(true)
                setModalMessage({"title":"Attention", "message":"Quantity of item "+title+" is 1. Click on Remove to remove "+title+" from cart"})

            } else {

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
                setModalMessage({"title":"Attention", "message":"Please select at least one item in the Items list"})

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
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <Image src={cartItem.game.banner_image_thumbnail } thumbnail style={{width:"150px"}} />
                                        </Col>
                                        <Col className="d-flex flex-column justify-content-center"> 
                                            <Row>
                                                <Col className="d-flex flex-row justify-content-end">
                                                   
                                                    
                                                    <Button  style={{backgroundColor:"#887AFF", borderColor:"#887AFF"}} type="submit" size="lg" variant="dark" onClick={()=>{removeGame(cartItem.game.id, cartItem.game.title)}}>
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                                <Row>
                                    <Col lg={3}>
                                        <Card.Text><h3><strong className="text-label-color">{cartItem.game.title} X {cartItem.quantity}:</strong> ${cartItem.sub_total}</h3> <Button style={{backgroundColor:"#887AFF", borderColor:"#887AFF", marginRight:"10px",  width:"60px", fontSize:"25px"}} type="submit" size="sm" variant="dark" onClick={()=>{updateQuantityGame(cartItem.game.id, cartItem.game.title, "-")}}>-</Button><Button style={{backgroundColor:"#887AFF", borderColor:"#887AFF", width:"60px", fontSize:"25px"}} type="submit" size="sm" variant="dark" onClick={()=>{updateQuantityGame(cartItem.game.id, cartItem.game.title, "+")}}>+</Button></Card.Text>
                                    </Col>
                                    <Col lg={3}>
                                        <Card.Text>{cartItem.game.discount>0?<h3><strong className="text-label-color">Discount: </strong>{cartItem.game.discount}%</h3>:<div></div>}</Card.Text>
                                    </Col>

                                </Row>
                            </Stack>
                         </Card.Body>
                    </Card>)
            }

            cart_jsx=(<React.Fragment>
            <Stack gap={3}>  
                <Card bg="dark" text="white">
                    <Card.Body><h1 className="text-label-color">Cart</h1></Card.Body>
                </Card>
                {cart_item_jsx}
                <Card bg="dark" text="white">
                    <Card.Body>
                            <Row>
                                <Col>
                                    <h2><strong className="text-label-color">Total:</strong> ${total}</h2>
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
                    <Card.Body><h1 className="text-label-color">Cart is empty</h1></Card.Body>
                </Card>
            </React.Fragment>)

        }


    } 
    
    return (
        <React.Fragment>
            <Modal show={showModal} handleClose={() => {setShowModal(false)}} title={modalMessage.title} message={modalMessage.message}/>
            <Container fluid className="container-positioning container-width" >
                {cart_jsx}
            </Container>
        </React.Fragment> 
    )
}