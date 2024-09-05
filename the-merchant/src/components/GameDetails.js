import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import GamesContext from "../contexts/GamesContext";
import CartContext from "../contexts/CartContext";
import CredentialsContext from "../contexts/CredentialsContext";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from './Modal';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Carousel from 'react-bootstrap/Carousel';
import Badge from 'react-bootstrap/Badge'

export default function GameDetails() {

    const history = useHistory()
    const { gameId } = useParams();

    const [ game, setGame ] = useState(null);
    const [profile, setProfile] = useState(null)

    const [showModal, setShowModal] = useState(false); //modal
    const [modalMessage, setModalMessage] = useState({"title":"", "message":""});//modal

    const gamesContext = useContext(GamesContext);
    const cartContext = useContext(CartContext);
    const credsContext = useContext(CredentialsContext)
    

    useEffect(() => {



        const requestGameDetail = async() =>{
            let selected_game = await gamesContext.getGameDetails(gameId);
            let profile =  await credsContext.getProfile()

            if(profile){

                setProfile(profile.device_specs)

            


            } else {

                setProfile(null)

            }
           
            // !="No such games"
            if(selected_game){

                setGame(selected_game.data.message)

            


            } else {

                history.push("/",{
                    "message":"Please Login to Access this Page",
                    "page_redirect":"game-details/"+gameId
                })

            }

            
        }

        requestGameDetail();
    }, [gameId])


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


    let game_jsx

    const carousel= (images) => {

        const panels = []

        images.map((image)=>{

            const panel= <Carousel.Item><Image className="d-block w-100" src={image.url} alt="First slide"/></Carousel.Item>


            panels.push(panel)
        })

        return (
          <Carousel>
            {panels}
          </Carousel>
        );
      }
      

   
    if(game){
        console.log(game.minimum_requirement.split("|").map((imageSourceString)=>{return <div>{imageSourceString}</div>}))
        if(game!="No such games"){

            const tagPills = (tags) =>{
                console.log(tags)

                const tagsPanel = []

                tags.map((tag)=>{

                    tagsPanel.push(<Badge pill bg="primary mx-1">{tag.content_name}</Badge>)
                })

                return (<Container fluid>
                            <Row>
                                <Col>
                                {tagsPanel}
                                </Col>
                            </Row>
                        </Container>)
                
            }

            game_jsx=(<React.Fragment>
                <Card bg="dark" text="white">
                    <Card.Body>
                        <Stack gap={3}>
                            <Row>
                                <Col>
                                    <h1 className="text-label-color">{game.title}</h1>
                                    <div><span className="text-label-color">Cost:</span> ${game.cost}</div> 
                                    <div><span className="text-label-color">Discount:</span> {game.discount}%</div> 
                                </Col>
                                <Col className="d-flex flex-row justify-content-end">
                                    <Row>
                                        <Col className="d-flex flex-column justify-content-md-center">
                                            <Button style={{backgroundColor:"#887AFF", borderColor:"#887AFF"}} type="submit" size="lg" variant="dark" onClick={()=>{addGame(game.id, game.title)}}>Cart</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Image src={game.banner_image} rounded alt="game banner image"/> 
                            </Row>
                            <Row>
                                <p>{game.description}</p>
                            </Row>
                            <Row>   
                                <p><span className="text-label-color">Operationally Ready Date: </span>{game.released_date}</p>
                                <p><span className="text-label-color">Category: </span>{game.category.name}</p>
                                <p><span className="text-label-color">In Service: </span>{game.platforms.map(platform=>(" "+platform.platform_name)).toString()}</p>
                                <p><span className="text-label-color">Tags: </span>{tagPills(game.content_tags)}</p>
                            </Row>
                        </Stack>             
                    </Card.Body>        
                </Card>    

                <div>
                    {carousel(game.images)}
                </div>

                {/* <Card bg="dark" text="white">
                    <Card.Body>
                        <Stack gap={2}>
                            <h1 className="text-label-color">Reviews</h1>
                            {game.reviews.length>0?game.reviews.map(review=>(<h2>&ldquo;{review.review.split("|")[0]}&rdquo; - {review.review.split("|")[1]}</h2>)):""}    
                        </Stack>
                    </Card.Body>        
                </Card> */}

                <Card bg="dark" text="white">
                    <Card.Body>
                        <Stack gap={2}>
                            <Row>
                                <Col>
                                    <h1 className="text-label-color">Image sources:</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3 className="text-label-color">Image:</h3>
                                    <div>{game.recommended_requirement}</div>
                                </Col>
                                {/* <Col>
                                    <h3 className="text-label-color">Your Specifications:</h3>
                                    {profile?(<div>{profile}</div>):<div>No specifications found in profile</div>}
                                
                                </Col> */}
                            </Row>       
                            <Row className="mt-5">
                                <Col>
                                    <h3 className="text-label-color">Carousel Image:</h3>
                                    <div>{game.minimum_requirement.split("|").map((imageSourceString)=>{return <div>{imageSourceString}</div>})}</div>
                                </Col>
                                {/* <Col>
                                    <h3 className="text-label-color">Your Specifications:</h3>
                                    {profile?(<div>{profile}</div>):<div>No specifications found in profile</div>}
                                
                                </Col>      */}
                            </Row>
                        </Stack>
                    </Card.Body>        
                </Card>
            </React.Fragment>)



        } else {

            game_jsx=(<React.Fragment>
                <Card bg="dark" text="white">
                    <Card.Body><h1 className="text-label-color">There is no such games</h1></Card.Body>
                </Card>
            </React.Fragment>)

        }

    }

    return (
        (<React.Fragment>
            <Modal show={showModal} handleClose={() => {setShowModal(false)}} title={modalMessage.title} message={modalMessage.message}/>
            <Container fluid className="container-positioning container-width" >
                <Stack gap={3}>
                    {game_jsx}
                </Stack>
            </Container>
        </React.Fragment>)
    )
}






