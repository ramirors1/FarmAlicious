import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

export const CustomerForm = () => {

    const [customerRequest, updateCustomerRequest] = useState({});
    const [products, setProducts] = useState([]);

    const history = useHistory()
    const saveCustomerRequest = (event) => {
        event.preventDefault()
        const newCustomerRequest = {
            productId: customerRequest.productId,
            userId: parseInt(localStorage.getItem("farmalicious_user"))
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCustomerRequest)
        }
    return fetch("http://localhost:8088/customerRequests", fetchOption)
        .then(() => {
          history.push("/customers")  
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
        <form className="customerForm">
            <h2 className="customerForm__title">Crop i'm looking for</h2>
            <fieldset>

                <div className="customerForm-group">
                    <label htmlFor="product">Product:</label>
                    <select
                    onChange={
                        (evt) => {
                            const copy = {...customerRequest}
                            copy.productId = evt.target.value
                            updateCustomerRequest(copy)
                        }
  
                    }>
                    <option key="product" value={0}>Crop in Need</option>
  
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
            <button onClick={saveCustomerRequest} className="btn btn-primary">
                Submit Request
            </button>
        </form>
    </>
    )

}    