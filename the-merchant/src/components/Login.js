import React, { useContext, useEffect, useState} from "react"
import Container from "react-bootstrap/Container";
import { useHistory, useLocation } from 'react-router-dom';
import CredentialsContext from "../contexts/CredentialsContext"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from './Modal';
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {

    const history = useHistory()
    const location = useLocation()
    const credsContext = useContext(CredentialsContext)
    const [field, setField] = useState({
        "display_name_email":"",
        "password":""
    })

    const [validated, setValidated] = useState(false);// react bootstrap form

    const [show, setShow] = useState(false); //modal
    const [modalMessage, setModalMessage] = useState({"title":"", "message":""});//modal

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
            setShow(true)
            setModalMessage({"title":location.state.page_redirect, "message":location.state.message}) //page_redirect is just the name of the page that user is attempting to access
        }
    },[])

    
    
            

    const handleSubmit = async (event) => {
       
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        
        if (form.checkValidity()) {
            
            setShowLoading(false)
            setShow(true)
            setModalMessage({"title":"Please Wait", "message":<span id="disclaimer">You may need to wait around 1 minute for the backend to start up as I am currently using the free account of Render.</span> })
            
            let login_outcome = await credsContext.login(field.display_name_email, field.password)
            await credsContext.refresh()
            
            setShowLoading(true)
            setModalMessage({"title":"", "message":"" })


            
            if (login_outcome===true){
                    

                if (location.state!==undefined){
                    
                    history.push("/"+location.state.page_redirect) //redirect to the page in the case if user has direct link access. for example: /cart
                    
                }else{
                
                    history.push("/games")
                
                }
                    
            } else if(login_outcome===false) {

                
                setShow(true)
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

            {/* don't forget
            
            <p><span id="disclaimer">!! This is a demonstration website. <b>Do not</b> put real email and password.</span></p>
            <p><span id="disclaimer">You may need to wait around 1 minute for the backend to start up as I am currently using the free account of Render.</span></p> 
            
            */}

            
            
            <div class="landing-page"> 
                <div>
                    
                    <Modal show={show} handleClose={() => {setShow(false)}} title={modalMessage.title} message={modalMessage.message}/>

                    <Card border="warning" bg="dark" text="white" className="my-5">
                        <Card.Body>
                            <div class="logo">
                                <h1 class="title-font">The Merchant</h1>
                                <h2>Your One-Stop Online Gaming Shop!</h2>
                                <p><span id="disclaimer">!! This is a demonstration website. <b>Do not</b> put real email and password.</span></p>

                            </div>
                            <Form className="my-3 mx-2" noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="validationCustom01">
                                    <FloatingLabel controlId="floatingInput" label="Username/Email"  className="mb-3" data-bs-theme="dark">
                                        <Form.Control type="text" placeholder="name@example.com" onChange={updateState} name="display_name_email" required/>
                                        <Form.Control.Feedback type="invalid">
                                            Display Name or Email is missing
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                    
                                </Form.Group>
                                <Form.Group controlId="validationCustom02">
                                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" data-bs-theme="dark">
                                        <Form.Control type="password" placeholder="Password" onChange={updateState} name="password" required/>
                                        <Form.Control.Feedback type="invalid">
                                            Password is missing.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <div className="d-grid gap-3">
                                    <Button type="submit" size="lg" variant="light">
                                        <Spinner hidden={showLoading} as="span" animation="grow" size="sm" role="status" aria-hidden="true" className="mx-1"/>
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>   


                        
                    


                   
                </div>
            </div>
            
        </React.Fragment>

    )
}








