import React, { useContext, useState} from "react"
import { useHistory, useLocation } from 'react-router-dom';
import CredentialsContext from "../contexts/CredentialsContext"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from './Modal';
import Spinner from 'react-bootstrap/Spinner';
import OffCanvas from './OffCanvas';
import mainLogo from'./1.png';


export default function UserReg() {

    const history = useHistory()
    const [field, setField] = useState({
        "display_name":"",
        "email":"",
        "device_specs":"",
        "password":"",
        "confirm_password":""
    })
    
    const credsContext = useContext(CredentialsContext)

    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false); //modal
    const [modalMessage, setModalMessage] = useState({"title":"", "message":""});//modal
    const [showSlide, setShowSlide] = useState(false); // OffCanvas


    const [showLoading, setShowLoading] = useState(true) //hidden
    


   
    const handleSubmit = async (event) => {
       
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        
        if (form.checkValidity()) {
            
            setShowLoading(false)
            setShowSlide(true)
            let reg_outcome = await credsContext.register(field.display_name, field.password, field.email, field.device_specs)
            setShowLoading(true)
            

            
            if(reg_outcome===null){

                history.push("/error-page")
            
            } else if (reg_outcome.data.message=="User registered"){
                    
                history.push("/",{
                    "message":"User registered. Please enter the following to login.",
                    "page_redirect":"games"
                    })
            
            } else if(reg_outcome.data.message=="Display name or email already exists"){
                console.log("TESTING")
                setShowModal(true)
                setModalMessage({"title":"Failed Login", "message":"Display name or email already exists"})           
                            
            } else {
                setShowModal(true)
                setModalMessage({"title":"Failed Login", "message":"Weird Error"}) 
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
           
             <div class="landing-page"> 
                <div> 

                    <Modal show={showModal} handleClose={() => {setShowModal(false); setShowSlide(false)}} title={modalMessage.title} message={modalMessage.message}/>

                    <OffCanvas show={showSlide} handleClose={() => setShowSlide(false)} />


                    <Card bg="dark" text="white" className="my-5 landing-page-card">
                        <Card.Body>
                            <Card.Img variant="top" src={mainLogo} />
                            <p><span id="disclaimer">!! This is a demonstration website. <b>Do not</b> put real email and password.</span></p>
                            <Form className="my-3 mx-2" noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="validationCustom01">
                                    <FloatingLabel controlId="floatingInput" label="Enter Display Name"  className="mb-3" data-bs-theme="dark">
                                        <Form.Control type="text" placeholder="" onChange={updateState} name="display_name" required/>
                                        <Form.Control.Feedback type="invalid">
                                            Display Name is missing
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                    
                                </Form.Group>
                                <Form.Group controlId="validationCustom02">
                                    <FloatingLabel controlId="floatingPassword" label="Enter Email Address" className="mb-3" data-bs-theme="dark">
                                        <Form.Control type="email" placeholder="" onChange={updateState} name="email" required pattern="\w*@\w*(\.\w{2,3})+"
                                            isInvalid={
                                                validated &&
                                                !/\w*@\w*(\.\w{2,3})+/.test(field.email)
                                            }/>
                                        <Form.Control.Feedback type="invalid">
                                            {!field.email?"Email is missing":(!/\w*@\w*(\.\w{2,3})+/.test(field.email)?"Invalid Email format":"")}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="validationCustom03">
                                    <FloatingLabel controlId="floatingPassword" label="Device Specifications" className="mb-3" data-bs-theme="dark">
                                        <Form.Control type="textarea" placeholder="" onChange={updateState} name="device_specs"/>
                                        <Form.Control.Feedback type="invalid">
                                            Device Specification is missing
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="validationCustom04">
                                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" data-bs-theme="dark">
                                        <Form.Control type="password" placeholder="Password" onChange={updateState} name="password" required/>
                                        <Form.Control.Feedback type="invalid">
                                            Password is missing.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="validationCustom05">
                                    <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-3" data-bs-theme="dark">
                                        <Form.Control type="password" placeholder="Password" onChange={updateState} name="confirm_password" required pattern={field.password}
                                            isInvalid={
                                                validated &&
                                                field.confirm_password !== field.password
                                            }/>
                                        <Form.Control.Feedback type="invalid">
                                            {!field.confirm_password?"Password confirmation is missing":"Password does not match."}   
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <div className="d-grid gap-3">
                                    <Button style={{backgroundColor:"#887AFF", borderColor:"#887AFF"}} type="submit" size="lg" variant="dark">
                                        <Spinner hidden={showLoading} as="span" animation="grow" size="sm" role="status" aria-hidden="true" className="mx-1"/>
                                        Submit
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








