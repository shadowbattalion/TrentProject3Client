import React, { useContext, useEffect, useState} from "react"
import { Link, useHistory } from 'react-router-dom';
import GamesContext from "../contexts/GamesContext";
import CartContext from "../contexts/CartContext";
import CredentialsContext from "../contexts/CredentialsContext";
import Modal from './Modal';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";





export default function Games() {

    const history = useHistory()
    const [gameList, setGameList] = useState(null)
    const [user, setUser] = useState(null)
   

    const [showModal, setShowModal] = useState(false); //modal
    const [modalMessage, setModalMessage] = useState({"title":"", "message":""});//modal
    

    const [field, setField] = useState({
        "title":"",
        "company_name":""
    })
    let [trigger, setTrigger] = useState(0)
    const gamesContext = useContext(GamesContext)
    const cartContext = useContext(CartContext)

    useEffect(()=>{

        console.log(trigger)
        const requestGames =  async() =>{
            let gameList = await gamesContext.getGames(field.title, field.company_name)
           

            if(gameList){
                setUser(user)
                if(gameList.data.games.length>0){
                    setGameList(gameList.data.games)
                }else{
                    setShowModal(true)
                    setModalMessage({"title":"Attention", "message":"No such games"})
                }

            } else {
                
                history.push("/",{
                    "message":"Please Login to Access this Page",
                    "page_redirect":"games"
                })

            }

            
        }

        requestGames()
        

    },[trigger])


    async function addGame(game_id, title){


        const message = await cartContext.addGame(game_id)

        if(message){
            if(message.data.message==true){

                setShowModal(true)
                setModalMessage({"title":"Attention", "message":title+" added to cart!"})

            }else{
                
                setShowModal(true)
                setModalMessage({"title":"Attention", "message":message.data.message})
                
            }
            
        } else {

            history.push("/error-page")

        }
        


    }


    function searchSubmit(){


        if (trigger==0){
            setTrigger(1)
        }else if(trigger==1){
            setTrigger(0)
        }


    }

    const updateState = (event) =>{
        
        const { name, value } = event.target;
        console.log(name, value)
        setField({
            ...field,
            [name]:value
        })

    }


    let game_list_jsx


    if(gameList){ //always check if got null or not because useEffect will run later and change the state
        let games = gameList

        

        if(games.length!=0){
            let game_jsx=[]

            for (let game of games){
                game_jsx.push(

                    <Card bg="dark" text="white" key={game.id}>
                        <Card.Body>
                        <Container fluid>
                            <Row>
                                    <Col md={2} className="mb-3">
                                    <Link to={"/game-details/" + game.id}><Image src={game.banner_image_thumbnail} thumbnail style={{width:"150px"}} /></Link>
                                    </Col>
                                    <Col md={3} className="mb-3">
                                        <h3 style={{textOverflow:"ellipsis"}}><strong className="text-label-color"></strong><Link to={"/game-details/" + game.id}>{game.title}</Link></h3>                                    
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <h3 style={{textOverflow:"ellipsis"}}><strong className="text-label-color"></strong>{game.company_name}</h3>
                                    </Col>
                                    <Col md={2} className="mb-3">
                                        <div>
                                            <div><strong className="text-label-color">Price: </strong>${game.cost}</div> 
                                            {game.discount>0?<div><strong className="text-label-color">Discount: </strong>{game.discount}%</div>:<div></div>}
                                        </div>
                                    </Col>
                                    <Col md={1} className="d-flex flex-column justify-content-center">
                                        <Row>
                                            <Col className="d-flex flex-row justify-content-end">
                                                <Button  style={{backgroundColor:"#887AFF", borderColor:"#887AFF"}} type="submit" size="lg" variant="dark" onClick={()=>{addGame(game.id, game.title)}}>Cart</Button> 
                                            </Col>
                                        </Row>
                                    </Col>
                            </Row>
                        </Container>
                        </Card.Body>
                    </Card>)
            }

            game_list_jsx=(<React.Fragment>
                        {game_jsx}
            </React.Fragment>)
        } else {

            game_list_jsx=(<React.Fragment>
                <Card bg="dark" text="white">
                    <Card.Body><h1 className="text-label-color">Loading Game List</h1></Card.Body>
                </Card>
            </React.Fragment>)

        }


    }
    
    
    let search = (
        <React.Fragment>
            <Card bg="dark" text="white">
                <Card.Body>
                        <Stack gap={2}>
                            <Form.Text muted data-bs-theme="dark">
                                Inputs are case sensitive.
                            </Form.Text>
                            <FloatingLabel controlId="floatingInput" className="text-label" label="Search Title" data-bs-theme="dark">
                                <Form.Control name="title" type="text" placeholder="" className="text-input" onChange={updateState}/>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" className="text-label" label="Search Company" data-bs-theme="dark">
                                <Form.Control name="company_name" type="text" placeholder="" className="text-input" onChange={updateState}/>
                            </FloatingLabel>
                            <Button style={{backgroundColor:"#887AFF", borderColor:"#887AFF"}} type="submit" size="md" variant="dark" onClick={searchSubmit}>Search</Button>
                        </Stack>
                </Card.Body>
            </Card>
        </React.Fragment>)
  
    let title = (
        <React.Fragment>
            <Card bg="dark" text="white">
                <Card.Body><h1 className="text-label-color">Game List</h1></Card.Body>
            </Card>
        </React.Fragment>)

    return (
        (<React.Fragment>
            <Modal show={showModal} handleClose={() => {setShowModal(false)}} title={modalMessage.title} message={modalMessage.message}/>
            <Container fluid className="container-positioning container-width" >
                <Stack gap={3}>
                    {title}
                    {search}
                    {game_list_jsx}
                </Stack>
            </Container>
        </React.Fragment>)
    )
}






