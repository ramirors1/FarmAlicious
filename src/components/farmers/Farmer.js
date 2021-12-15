// import React, { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"

// export const FarmerPost = () => {
//     const [farmer, set] = useState({})  // State variable for current ticket object
//     const { farmerId } = useParams()  // Variable storing the route parameter

//     useEffect(
//         () => {
//             fetch(`http://localhost:8088/farmers/${farmerId}`)
//                 .then(res => res.json())
//                 .then(set)
//         },
//         [ farmerId ]  // Above function runs when the value of employeeId changes
//     )

//     return (
//         <>
//             <section className="farmer">
//                 <h3 className="farmer__name">{farmer.name}</h3>
//                 {/* <div className="employee__name">{employee.name}</div> */}
//                 <div className="farmer__product">current has {farmer.productId} for sale.</div>
//             </section>
//         </>
//     )
// }

import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

export const FarmerPost = () => {
    const [farmerPost, updatedFarmerPost] = useState({})  // State variable for current post object
    const [farmers, syncFarmers] = useState([])  // State variable for array of farmers
    const { farmerPostId } = useParams()  // Variable storing the route parameter
    const history = useHistory()


    // Fetch the individual post when the parameter value changes
    useEffect(
        () => {
            return fetch(`http://localhost:8088/farmerPosts?_expand=product&_expand=user`)  //${farmerPostId}
                .then(response => response.json())
                .then((data) => {
                    updatedFarmerPost(data)
                })

        },
        [ farmerPostId ]  // Above function runs when the value of postId changes
    )

    // Fetch all farmers
    useEffect(
        () => {
            fetch(`http://localhost:8088/farmers`)
                .then(res => res.json())
                .then(syncFarmers)
        },
        []  // Empty dependency array only reacts to JSX initial rendering
    )

    // Function to invoke when an farmer is chosen from <select> element
    const assignFarmer = (evt) => {

        // Construct a new object to replace the existing one in the API
        const updatedFarmerPost = {
            productId: farmerPost.productId,
            quantity: parseInt(farmerPost.quantity),
            price: parseInt(farmerPost.price),
            userId: parseInt(localStorage.getItem("farmalicious_user"))
        }

        // Perform the PUT HTTP request to replace the resource
        fetch(`http://localhost:8088/farmerPosts${farmerPostId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFarmerPost)
        })
            .then(() => {
                history.push("/farmerPosts")
            })
    }

    return (
        <>
            <section className="post">
                <h3 className="post__product">{farmerPost.product?.name}</h3>
                <div className="post__quantity">Amount: {farmerPost.quantity}</div>
                <div className="post__price">Price:  {farmerPost.price}</div>
                <div className="post__price">Assigned to
                    <select
                        value={ farmerPost.farmerId }
                        onChange={ updatedFarmerPost }>
                        {
                            farmers.map(fp => <option key={`farmer--${fp.id}`} value={fp.id}>{fp.name}</option>)
                        }
                    </select>
                </div>
            </section>
        </>
    )
}