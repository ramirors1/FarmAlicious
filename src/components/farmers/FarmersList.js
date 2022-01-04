import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./FarmersList.css"


export const FarmersList = () => {
    const [farmers, changeFarmer] = useState([])
    const [farmerPosts, updatePosts] = useState([])
    const [user, setUser]= useState(0)
    const history = useHistory()
    const getAllPosts = () => {  // declatred function to retrieve data from Json server 
        return fetch("http://localhost:8088/farmerPosts?_expand=user&_expand=product")  //fetches data from json server expanded using dot notation and expanding into other arrays
        .then(res => res.json())  //allows for extra formatting of the JSON data for non-objects
        .then((data) => {
            updatePosts(data)
        })
       } 

    useEffect(
        () => {  // first parameter of the useEffect, will always be a function
            fetch("http://localhost:8088/farmerPosts?_expand=user&_expand=product")  //fetches data from JSON database
                .then(res => res.json())
                .then((farmersFromAPI) => {
                    changeFarmer(farmersFromAPI)
                })
                .then(setUser(localStorage.getItem("farmalicious_user")))  //sets the current user that is logged in 
        },
        []  // second parameter of a useEffect will be an array, this one is empty
    )
        
    useEffect(  //listens for changes when delete button is clicked
        () => {getAllPosts() //runs this function
                
        },
        []
    )
            const deletePost = (id) => {  //declares variable to for the ability to delete a post
                return fetch(`http://localhost:8088/farmerPosts/${id}`, {  //fetches id of post to be deleted
                method: "DELETE"  //method to remove object from database
            }) .then(getAllPosts)  //once delete method has run, page will render updated list
        }

        return (  //below will be displayed when page is rendered
        <>
            <div>  
                <button className="fPostbtn" onClick={() => history.push("/farmerPost/create")}>Post my Crop</button>  
            </div> 
            {  //Displays all Farmer Posts and controls what will be shown
                farmerPosts.map(  //iterates through farmerPosts array
                    (farmerPost) => {  //this is how each post will look
                        if(farmerPost.userId === parseInt(user)){  //checkes for cuttent user, if so will dispay card with delete and edit buttons for their posts only
                            return <div className="farmerPost-container">
                            <div className="farmerPost" key={farmerPost.id}>
                            {farmerPost.user?.firstName} { farmerPost.user?.lastName } has {farmerPost.quantity} lbs. of {farmerPost.product?.name} for ${farmerPost.price} per lb.
                            You can contact me at: <Link to={farmerPost.user?.email}>{farmerPost.user?.email}</Link>
                             <button className="btn"><Link to={`/farmerPosts/${farmerPost.id}`}> Edit</Link></button> 
                             <button className="btn" type="submit" onClick={() => {deletePost(farmerPost.id)}}>Delete</button>
                             <div className="layers">
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>   
                            </div>
                            </div>
                            </div>
                        }
                        else{  //if not current user, will display post without delete/edit buttons
                            return <div className="farmerPost-container"> 
                            <div className="farmerPost" key={farmerPost.id}>
                            {farmerPost.user?.firstName} { farmerPost.user?.lastName } has {farmerPost.quantity} lbs. of {farmerPost.product?.name} for ${farmerPost.price} per lb.
                            You can contact me at: <Link to={farmerPost.user?.email}>{farmerPost.user?.email}</Link>
                            <div className="layers">
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>   
                            </div>
                            </div>
                            </div>
                        }
                        
                    }
                )
                
            }
                
            
        </>
    )
}



