import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import CartContext from "../contexts/CartContext";




export default function Cart() {
    
    const context = useContext(CartContext);

    console.log(context.test())
    return (
        <React.Fragment>
          <h1>trhttrhtrhtsrhh</h1>
        </React.Fragment> 
    )
}