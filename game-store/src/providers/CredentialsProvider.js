import React, {useState} from "react"
import StoreContext from "../StoreContext"
import axios from "axios"


export default function CredentialsProvider(props){



    const [products, setProducts] = useState([
        {
          display_name: "",
          email: ""
        }
    ])



    const context = {
        
        login: async (display_name_email, password) =>{
            return await axios.post('https://mhu-game-store.herokuapp.com/api/users/user-login',{
                "display_name_email":display_name_email,
                "password":password
            })
            
        },
        // addProduct:(new_product_name, cost) => {
        //     console.log(new_product_name, cost)
        //     let id = Math.floor(Math.random() * 10000 + 9999)
        //     setProducts([...products,{
        //         "id":id,
        //         "product_name":new_product_name,
        //         "cost":cost
        //     }])
        // },
        // getProductById:(productID)=>{
        //     return products.filter(p=>p.id === parseInt(productID))[0]
        // }

    }

    
    return(
        <StoreContext.Provider value={context}>
            {props.children}
        </StoreContext.Provider>
    )

}