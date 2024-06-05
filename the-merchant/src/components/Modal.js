
import React from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export default function UserReg(props) {

    return (
        <>
           <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <small>{props.message}</small>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
            </Modal>
        </>
                    )

}