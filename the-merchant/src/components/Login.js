import React, { useContext, useEffect, useState} from "react"
import { useHistory, useLocation } from 'react-router-dom';
import CredentialsContext from "../contexts/CredentialsContext"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from './Modal';
import Spinner from 'react-bootstrap/Spinner';
import OffCanvas from './OffCanvas';
// import logo from './6.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack'


export default function Login() {

    const history = useHistory()
    const location = useLocation()
    const credsContext = useContext(CredentialsContext)
    const [field, setField] = useState({
        "display_name_email":"",
        "password":""
    })

    const [validated, setValidated] = useState(false);// react bootstrap form

    const [showModal, setShowModal] = useState(false); //modal
    const [modalMessage, setModalMessage] = useState({"title":"", "message":""});//modal

    const [showSlide, setShowSlide] = useState(false); // OffCanvas


    const [showLoading, setShowLoading] = useState(true) //hidden


    

    useEffect(() => {


        const requestCredentials = async() =>{ // check if access_token is stale.
            let creds = await credsContext.getProfile();
           
            
            if(creds){

                history.push("/games")

            


            } 

            
        }

        if(localStorage.getItem('access_token')){ // check if access_token is not empty. Maybe not empty but the access_token is stale.
            requestCredentials();
        }

        
        }, [])


    useEffect(()=>{
        if (location.state!==undefined){ // after loading page, check if it was kicked from other pages that user is trying to access directly
            setShowModal(true)
            setModalMessage({"title":location.state.page_redirect, "message":location.state.message}) //page_redirect is just the name of the page that user is attempting to access
        }
    },[])

    
    
            

    const handleSubmit = async (event) => {
       
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        
        if (form.checkValidity()) {
            
            setShowLoading(false)
            setShowSlide(true)
            let login_outcome = await credsContext.login(field.display_name_email, field.password)
            await credsContext.refresh()
            setShowLoading(true)
            
           


            
            if (login_outcome===true){
                    

                if (location.state!==undefined){
                    
                    history.push("/"+location.state.page_redirect) //redirect to the page in the case if user has direct link access. for example: /cart
                    
                }else{
                
                    history.push("/games")
                
                }
                    
            } else if(login_outcome===false) {

                
                setShowModal(true)
                setModalMessage({"title":"Failed Login", "message":"Display Name, Email or Password is incorrect"}) 

                
                
            } else if(login_outcome===null){

                history.push("/error-page")// if server backend shuts down or cannot retrieve credentials.

            } 
          

        } else {
        
            setValidated(true);
        }
    

        
      };
      

   
   

    const updateState = (event) =>{

        const { name, value } = event.target;

        setField({
            ...field,
            [name]:value
        })

        

        

    }





    return (
        <React.Fragment>      

            

            
            <div> 
                    

                    <Modal show={showModal} handleClose={() => {setShowModal(false); setShowSlide(false)}} title={modalMessage.title} message={modalMessage.message}/>

                    <OffCanvas show={showSlide} handleClose={() => setShowSlide(false)} />
                    
                    <Container fluid className="login-page-container-positioning">
                        <Row>
                            <Col sm={12} lg={6} className="d-flex flex-column justify-content-center mb-3 mb-lg-0"> 
                                <Row>
                                    <Col className="d-flex flex-row justify-content-center justify-content-lg-start">
                                        <img style={{borderRadius:"8px"}} src="https://res.cloudinary.com/dl2qwodyu/image/upload/v1717954744/5_pdzo3u.png" alt="the merchant logo" className="laptop-pad-main-logo"/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={12} lg={6} className="d-flex flex-column justify-content-center"> 
                                <Row>
                                    <Col className="d-flex flex-row justify-content-center justify-content-lg-end">
                                        <Card bg="dark" text="white" className="landing-page-card" >
                                            <Card.Body>
                                                <Card.Title><h1 className="text-label-color">Log In</h1></Card.Title>
                                                <p><span id="disclaimer">!! This is a demonstration website. <b>Do not</b> put real email and password.</span></p>
                                                <small><span className="text-label-color">Bakcground Image by: </span><a href="https://commons.wikimedia.org/wiki/File:Royal_tank_museum_-_tank_show.jpg" target="_blank">AliAbuRas</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank">CC BY-SA 4.0</a>, via Wikimedia Commons</small>
                                                <Form className="my-3 mx-2" noValidate validated={validated} onSubmit={handleSubmit}>
                                                    <Stack gap={2}>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <FloatingLabel controlId="floatingInput" label="Username/Email"  className="mb-3 text-label" data-bs-theme="dark">
                                                                        <Form.Control type="text" placeholder="name@example.com"  className="text-input" onChange={updateState} name="display_name_email" required/>
                                                                        <Form.Control.Feedback type="invalid">
                                                                            Display Name or Email is missing
                                                                        </Form.Control.Feedback>
                                                                    </FloatingLabel>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col> 
                                                                <Form.Group controlId="validationCustom02">
                                                                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 text-label" data-bs-theme="dark">
                                                                        <Form.Control type="password" placeholder="Password" className="text-input" onChange={updateState} name="password" required/>
                                                                        <Form.Control.Feedback type="invalid">
                                                                            Password is missing.
                                                                        </Form.Control.Feedback>
                                                                    </FloatingLabel>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Button style={{backgroundColor:"#887AFF", borderColor:"#887AFF"}} type="submit" size="lg" variant="dark">
                                                            <Spinner hidden={showLoading} as="span" animation="grow" size="sm" role="status" aria-hidden="true" className="mx-1"/>
                                                            Login
                                                        </Button>
                                                    </Stack>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row> 
                            </Col>
                        </Row> 
                    </Container>   


                        
                    


                   
            </div>
            
        </React.Fragment>

    )
}








