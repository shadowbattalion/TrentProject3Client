import React from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';



export default function UserReg(props) {

    return (
        <>
           <Offcanvas show={props.show} onHide={props.handleClose} placement={"bottom"} scroll={true} backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Please Wait</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    You may need to wait around 1 minute for the backend to start up as I am currently using the free account of Render.
                </Offcanvas.Body>
            </Offcanvas>
        </>
                    )

}






