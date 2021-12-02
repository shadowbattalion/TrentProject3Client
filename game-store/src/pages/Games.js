import React from 'react'
import { useLocation, useHistory } from "react-router-dom"

export default function Home() {
    const history = useHistory()
    console.log(history)
    return (
        <React.Fragment>
            <h1>Game Page</h1>
        </React.Fragment> 
    )
}