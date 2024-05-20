import React, { useEffect} from "react"
import { useLocation } from 'react-router-dom';






export default function Checkout() {
    

    let get_location = useLocation()

    useEffect(() => {
      alert("4242 4242 4242 4242")
      window.location.href = get_location.state.stripe_url
    
    }, []);
  
    return (
      <div>
        <h2>Checkouting</h2>
      </div>
    );
  }
  
 
































