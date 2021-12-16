import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

export const CustomersList = () => {
    const [customer, changeCustomer] = useState([])
    const [customerRequests, updateRequests] = useState([])
    const [user, setUser]= useState(0)
    const history = useHistory()
    const getAllRequests = () => {
        return fetch("http://localhost:8088/customerRequests?_expand=user&_expand=product")
        .then(res => res.json())
        .then((data) => {
            updateRequests(data)
        })
       } 

    useEffect(
        () => {
            fetch("http://localhost:8088/customerRequests?_expand=user&_expand=product")
                .then(res => res.json())
                .then((customersFromAPI) => {
                    changeCustomer(customersFromAPI)
                })
                .then(setUser(localStorage.getItem("farmalicious_user")))
        },
        []
    )

    useEffect(
        () => {getAllRequests()
                
        },
        []
    )
            const deleteRequest = (id) => {
                fetch(`http://localhost:8088/customerRequests/${id}`, {
                method: "DELETE"
            })
            .then(getAllRequests)
        }

    return (
        <>
            <div>
                <button onClick={() => history.push("/customerRequest/create")}>Looking for some Crop?</button>
            </div> 
            {
                customerRequests.map(
                    (customerRequest) => {
                        if(customerRequest.userId === parseInt(user)){  //checkes for current user, if so will dispay card with delete button for their post only
                            return <div key={`customerRequest--${customerRequest.customer?.id}`}>
                            <div>{customerRequest.user?.firstName} { customerRequest.user?.lastName}</div>
                            <div>Wanting to purchase: {customerRequest.product?.name}</div>
                            <div>I can be reached at: {customerRequest.user?.email}</div>
                            <div></div><button onClick={() => {deleteRequest(customerRequest.id)}}>Delete</button>
                            </div>
                        }    
                    
                        else{
                            return <div key={`customerRequest--${customerRequest.customer?.id}`}>
                            <div>{customerRequest.user?.firstName} { customerRequest.user?.lastName}</div>
                            <div>Wanting to purchase: {customerRequest.product?.name}</div>
                            <div>I can be reached at: <Link>{customerRequest.user?.email}</Link></div>
                            </div>
                        }    

                    }  
                )      
                
            }
                
        </>
    )
}