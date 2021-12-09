import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

export const FarmersList = () => {
    const [farmers, changeFarmer] = useState([])
    const [farmerPosts, updatePosts] = useState([])
    const history = useHistory()
    const getAllPosts = () => {
        return fetch("http://localhost:8088/farmerPosts?_expand=user&_expand=product")
        .then(res => res.json())
        .then((data) => {
            updatePosts(data)
        })
       } 

    useEffect(
        () => {
            fetch("http://localhost:8088/farmerPosts?_expand=user&_expand=product")
                .then(res => res.json())
                .then((farmersFromAPI) => {
                    changeFarmer(farmersFromAPI)
                })
        },
        []
    )

    useEffect(
        () => {getAllPosts()
                
        },
        []
    )
            const deletePost = (id) => {
                fetch(`http://localhost:8088/farmersPosts/${id}`, {
                method: "DELETE"
            })
            getAllPosts()

        }

    return (
        <>
            <div>
                <button onClick={() => history.push("/farmerPost/create")}>Post my Crop</button>
            </div> 
            <div>

            </div>
            {
                farmerPosts.map(
                    (farmerPost) => {
                        return <div key={`farmerPost--${farmerPost.farmer?.id}`}>
                            <Link to={`/farmerPosts/${farmerPost.id}`}>{farmerPost.user?.firstName} { farmerPost.user?.lastName}</Link> 
                            <div>Item for sale: {farmerPost.product?.name}</div>
                            <div>Quantity: {farmerPost.quantity}</div>
                             <div>lbs of {farmerPost.product?.name}</div>
                             <div>Cost is ${farmerPost.price} per lbs.</div>
                             <div></div><button onClick={() => {deletePost(farmerPost.id)}}>Delete</button>
                            
                            </div>
                    }
                )
                
                    }
                
            
        </>
    )
}



