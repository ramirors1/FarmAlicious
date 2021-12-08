import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const FarmerPost = () => {

    const [post, updatePost] = useState();
    const history = useHistory()
    const savePost = (event) => {
        event.preventDefault()
        const newPost = {
            productId: post.productId,
            quantity: 0,
            price: "",
            // farmerId: parseInt(localStorage.getItem("farmalicious_farmer")),
            farmerId: 1,
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTicket)
        }
    return fetch("http://localhost:8088/farmerPosts", fetchOption)
        .then(() => {
          history.push("/posts")  
        })    
    }    

    return (
        <>
        <form className="farmerForm">
            <h2 className="farmerForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                    onChange={
                        (evt) => {
                            const copy = {...ticket}
                            copy.description = evt.target.value
                            updateTicket(copy)
                        }
                    }

                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                                        onChange={
                                            (evt) => {
                                                const copy = {...post}
                                                copy.emergency = evt.target.value
                                                updateTicket(copy)
                                            }
                                        }
                    
                        />
                </div>
            </fieldset>
            <button onClick={savePost} className="btn btn-primary">
                Submit Post
            </button>
        </form>
        </>
    )

}    