import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

export const FarmerForm = () => {

    const [farmerPost, updateFarmerPost] = useState({});
    const [products, setProducts] = useState([]);

    const history = useHistory()
    const saveFarmerPost = (event) => {
        event.preventDefault()
        const newFarmerPost = {
            productId: farmerPost.productId,
            quantity: parseInt(farmerPost.quantity),
            price: parseInt(farmerPost.price),
            userId: parseInt(localStorage.getItem("farmalicious_user"))
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFarmerPost)
        }
    return fetch("http://localhost:8088/farmerPosts", fetchOption)
        .then(() => {
          history.push("/farmers")  
        })    
    }    

    useEffect(
        () => {
        return fetch("http://localhost:8088/products")
        .then(res => res.json())
        .then((productsFromAPI) => {
            setProducts(productsFromAPI)
})},
        []
    )

    return (
        <>
        <form className="farmerForm">
            <h2 className="farmerForm__title">New Crop to Post</h2>
            <fieldset>

                <div className="farmerFarm-group">
                    <label htmlFor="product">Product:</label>
                    <select
                    onChange={
                        (evt) => {
                            const copy = {...farmerPost}
                            copy.productId = evt.target.value
                            updateFarmerPost(copy)
                        }
  
                    }>
                    <option key="product" value={0}>Choose a product</option>
  
                    {
                    products.map(
                        (product) => {
                                
                               return <option key="product" value={product.id}>
                                {product.name}
                                </option>
                        }
                    )
                    }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="farmerForm-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                    onChange={
                        (evt) => {
                            const copy = {...farmerPost}
                            copy.quantity = evt.target.value
                            updateFarmerPost(copy)
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
                    onChange={
                        (evt) => {
                            const copy = {...farmerPost}
                            copy.price = evt.target.value
                            updateFarmerPost(copy)
                        }
                    }

                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Price"
                        />
                </div>
            </fieldset>
            <button onClick={saveFarmerPost} className="btn btn-primary">
                Submit Post
            </button>
        </form>
    </>
    )

}     


