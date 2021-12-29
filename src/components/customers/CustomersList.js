import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./CustomerList.css"


export const CustomersList = () => {
    const [customer, changeCustomer] = useState([])
    const [customerRequests, updateRequests] = useState([])
    const [user, setUser]= useState(0)
    const history = useHistory()
    const getAllRequests = () => {  // declatred function to retrieve data from Json server 
        return fetch("http://localhost:8088/customerRequests?_expand=user&_expand=product")  //fetches data from json server expanded using dot notation and expanding into other arrays
        .then(res => res.json())  //allows for extra formatting of the JSON data for non-objects
        .then((data) => {
            updateRequests(data)
        })
       } 

    useEffect(
        () => {  // first parameter of the useEffect, will always be a function
            fetch("http://localhost:8088/customerRequests?_expand=user&_expand=product")  //fetches data from JSON database
                .then(res => res.json())
                .then((customersFromAPI) => {
                    changeCustomer(customersFromAPI)
                })
                .then(setUser(localStorage.getItem("farmalicious_user")))  //sets the current user that is logged in 
        },
        []  // second parameter of a useEffect will be an array, this one is empty
    )

    useEffect( //listens for changes when delete button is clicked
        () => {getAllRequests() //runs this function
                
        },
        []
    )
            const deleteRequest = (id) => {  //declares variable to for the ability to delete a post
                fetch(`http://localhost:8088/customerRequests/${id}`, {  //fetches id of request to be deleted
                method: "DELETE"  //method to remove object from database
            })
            .then(getAllRequests)  //once delete method has run, page will render updated list
        }

    return (
        <>
            <div>
                <button className="cPostbtn" onClick={() => history.push("/customerRequest/create")}>Looking for some Crop?</button>
            </div> 
            {  //Displays all Farmer Posts and controls what will be shown
                customerRequests.map(  //iterates through farmerPosts array
                    (customerRequest) => {  //this is how each post will look
                        if(customerRequest.userId === parseInt(user)){  //checkes for current user, if so will dispay card with delete and Edit buttons for their post only
                            return <div className="customerPost-container"> 
                            <div className="customerPost" key={customerRequest.id}>
                            {customerRequest.user?.firstName} { customerRequest.user?.lastName} is wanting to purchase: {customerRequest.product?.name}.  I can be reached at: <Link to={customerRequest.user?.email}>{customerRequest.user?.email}</Link>
                            {/* <div>{customerRequest.user?.firstName} { customerRequest.user?.lastName}</div>
                            <div>Wanting to purchase: {customerRequest.product?.name}</div>
                            <div>I can be reached at: {customerRequest.user?.email}</div> */}
                            <button className="btn"><Link to={`/customerRequests/${customerRequest.id}`}> Edit</Link></button> 
                            <div></div><button className="btn" onClick={() => {deleteRequest(customerRequest.id)}}>Delete</button>
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
                    
                        else{
                            return <div className="customerPost-container"> 
                            <div className="customerPost" key={customerRequest.id}>
                            {customerRequest.user?.firstName} { customerRequest.user?.lastName} is wanting to purchase: {customerRequest.product?.name}.  I can be reached at: <Link to={customerRequest.user?.email}>{customerRequest.user?.email}</Link>
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