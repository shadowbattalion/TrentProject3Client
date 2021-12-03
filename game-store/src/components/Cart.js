import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import StoreContext from "../StoreContext"




export default function Cart() {
    
    const context = useContext(StoreContext);

    context.test()
    return (
        <React.Fragment>
          <h1>trhttrhtrhtsrhh</h1>
        </React.Fragment> 
    )
}