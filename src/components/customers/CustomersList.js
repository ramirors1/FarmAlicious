import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

export const CustomersList = () => {
    const [customer, changeCustomer] = useState([])
    const [customerRequests, updateRequests] = useState([])
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
            getAllRequests()

        }

    return (
        <>
            <div>
                <button onClick={() => history.push("/customerRequest/create")}>Looking for some Crop?</button>
            </div> 
            <div>

            </div>
            {
                customerRequests.map(
                    (customerRequest) => {
                        return <div key={`customerRequest--${customerRequest.customer?.id}`}>
                            <Link to={`/customerRequests/${customerRequest.id}`}>{customerRequest.user?.firstName} { customerRequest.user?.lastName}</Link> 
                            <div>Wanting to purchase: {customerRequest.product?.name}</div>
                             {/* <div>lbs of {farmerPost.product?.name}</div> */}
                             {/* <div>Cost is ${farmerPost.price} per lbs.</div> */}
                             <div></div><button onClick={() => {deleteRequest(customerRequest.id)}}>Delete</button>
                            
                            </div>
                    }
                )
                
                    }
                
            
        </>
    )
}