import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

export const CustomerRequest = () => {
    const [customerRequests, updateRequest] = useState({})  // State variable for current ticket object
    const [custmoers, syncCustomers] = useState([])  // State variable for array of employees
    const { customerRequestId } = useParams()  // Variable storing the route parameter
    // const [farmerPost, updateFarmerPost] = useState({});
    const [products, setProducts] = useState([]);
    const history = useHistory()

    // Fetch the individual ticket when the parameter value changes
    useEffect(
        () => {
            return fetch(`http://localhost:8088/customerRequests/${parseInt(customerRequestId)}?_expand=product&_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    updateRequest(data)
                })
        },
        [ customerRequestId ]  // Above function runs when the value of ticketId change
    )

    useEffect(
        () => {
        return fetch("http://localhost:8088/products")
        .then(res => res.json())
        .then((productsFromAPI) => {
            setProducts(productsFromAPI)
})},
        []
    )


    // Fetch all farmers
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers`)
                .then(res => res.json())
                .then(syncCustomers)
        },
        []  // Empty dependency array only reacts to JSX initial rendering
    )
    // Function to invoke when a farmer is chosen from <select> element
    const updateCustomerRequest = (changeEvent) => {
        changeEvent.preventDefault()
        // Construct a new object to replace the existing one in the API
        const updatedRequest = {
            productId: customerRequests.productId,
            userId: parseInt(localStorage.getItem("farmalicious_user"))
        }
        // Perform the PUT HTTP request to replace the resource
        fetch(`http://localhost:8088/customerRequests/${customerRequestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedRequest)
        })
            .then(() => {
                history.push("/customers")
            })
    }

    return (
        <>
        <form className="customerForm">
            <h2 className="customerForm__title">Crop i'm looking for</h2>
            <fieldset>

            <div className="customerForm-group">
                    <label htmlFor="product">Product:</label>
                    <select
                    onChange={
                    (changeEvent) => {
                            const copy = {...customerRequests}
                            copy.productId = changeEvent.target.value
                            updateRequest(copy)
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
            <button onClick={updateCustomerRequest} className="btn btn-primary">
                Update Request
            </button>
        </form>
    </>
    )

}


