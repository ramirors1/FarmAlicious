import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

export const FarmerPost = () => {
    const [farmerPosts, updatePost] = useState({})  // State variable for current ticket object
    const [farmers, syncFarmers] = useState([])  // State variable for array of employees
    const { farmerPostId } = useParams()  // Variable storing the route parameter
    // const [farmerPost, updateFarmerPost] = useState({});
    const [products, setProducts] = useState([]);
    const history = useHistory()

    // Fetch the individual ticket when the parameter value changes
    useEffect(
        () => {
            return fetch(`http://localhost:8088/farmerPosts/${parseInt(farmerPostId)}?_expand=user&_expand=product`)
                .then(response => response.json())
                .then((data) => {
                    updatePost(data)
                })
        },
        [ farmerPostId ]  // Above function runs when the value of ticketId change
    )
    // Fetch all employees
    useEffect(
        () => {
            fetch(`http://localhost:8088/farmers`)
                .then(res => res.json())
                .then(syncFarmers)
        },
        []  // Empty dependency array only reacts to JSX initial rendering
    )
    // Function to invoke when a farmer is chosen from <select> element
    const updateFarmerPost = (changeEvent) => {
        changeEvent.preventDefault()
        // Construct a new object to replace the existing one in the API
        const updatedPost = {
            productId: farmerPosts.productId,
            quantity: farmerPosts.quantity,//(changeEvent.target.value), parseInt(farmerPosts.quantity),
            price: farmerPosts.price,//(changeEvent.targer.value), //(farmerPosts.price),
            userId: parseInt(localStorage.getItem("farmalicious_user"))
        }
        // Perform the PUT HTTP request to replace the resource
        fetch(`http://localhost:8088/farmerPosts/${farmerPostId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        })
            .then(() => {
                history.push("/farmers")
            })
    }

    return (
        <>
        <form className="farmerForm">
            <h2 className="farmerForm__title">New Crop to Post</h2>
            <fieldset>

                <div className="farmerFarm-group">
                    <label htmlFor="product">Product: </label>
                    {farmerPosts.product?.name}
                </div>
            </fieldset>
            <fieldset>
                <div className="farmerForm-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                    defaultValue={farmerPosts.quantity}
                    onChange={
                        (changeEvent) => {
                            const copy = {...farmerPosts}
                            copy.quantity = changeEvent.target.value
                            updatePost(copy)
                        }
                    }

                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Amount"
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="farmerForm-group">
                    <label htmlFor="price">Price:</label>
                    <input
                    defaultValue={farmerPosts.price}
                    onChange={
                        (changeEvent) => {
                            const copy = {...farmerPosts}
                            copy.price = changeEvent.target.value
                            updatePost(copy)
                        }
                    }

                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Price"
                        />
                </div>
            </fieldset>
            <button onClick={updateFarmerPost} className="btn btn-primary">
                Update Post
            </button>
        </form>
    </>
    )

}
