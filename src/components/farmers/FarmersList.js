import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

export const FarmersList = () => {
    const [farmers, changeFarmer] = useState([])
    const [farmerPosts, updatePosts] = useState([])
    const [user, setUser]= useState(0)
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
                .then(setUser(localStorage.getItem("farmalicious_user")))
        },
        []
    )
        
    useEffect(
        () => {getAllPosts()
                
        },
        []
    )
            const deletePost = (id) => {
                return fetch(`http://localhost:8088/farmerPosts/${id}`, {
                method: "DELETE"
            }) .then(getAllPosts)
        }

        return (
        <>
            <div>
                <button onClick={() => history.push("/farmerPost/create")}>Post my Crop</button>
            </div> 
            {
                farmerPosts.map(
                    (farmerPost) => {
                        if(farmerPost.userId === parseInt(user)){  //checkes for cuttent user, if so will dispay card with delete button for their post only
                            return <div key={`farmerPost--${farmerPost.farmer?.id}`}>
                            <div>{farmerPost.user?.firstName} { farmerPost.user?.lastName}</div> 
                            <div>Item for sale: {farmerPost.product?.name}</div>
                            <div>Amount: {farmerPost.quantity} lbs.</div>
                             {/* <div>lbs of {farmerPost.product?.name}</div> */}
                             <div>Price is ${farmerPost.price} per lbs.</div>
                             <div>You can contact me at: <Link>{farmerPost.user?.email}</Link></div>
                             <button><Link to={`/farmerPosts/${farmerPost.id}`}> Edit</Link></button> 
                             <button type="submit" onClick={() => {deletePost(farmerPost.id)}}>Delete</button>
                            </div>
                        }
                        else{  //if not current user, will display post without delete button
                            return <div key={`farmerPost--${farmerPost.farmer?.id}`}>
                            <div>{farmerPost.user?.firstName} { farmerPost.user?.lastName}</div> 
                            <div>Item for sale: {farmerPost.product?.name}</div>
                            <div>Amount: {farmerPost.quantity} lbs.</div>
                            {/* <div>lbs of {farmerPost.product?.name}</div> */}
                            <div>Price is ${farmerPost.price} per lbs.</div>
                            <div>You can contact me at: <Link>{farmerPost.user?.email}</Link></div>
                            </div>
                        }
                        
                    }
                )
                
            }
                
            
        </>
    )
}



