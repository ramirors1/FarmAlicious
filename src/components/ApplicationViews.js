import React from "react"
import { Route } from "react-router-dom"
import { FarmersList } from "./farmers/FarmersList";
import { CustomersList } from "./customers/CustomersList";
import { FarmerForm } from "./farmers/FarmerForm";
import { CustomerForm } from "./customers/CustomerForm";
import { FarmerPost } from "./farmers/FarmerPost";
import { CustomerRequest } from "./customers/Customer";

export const ApplicationViews = () => {
    return (
        <>
        <h1 >FarmAlicious</h1>

            <Route exact path="/farmers">  
                <FarmersList />
            </Route>

            <Route exact path="/farmerPost/create">
                <FarmerForm />
            </Route>

            <Route exact path="/farmerPosts/:farmerPostId(\d+)">
                <FarmerPost />
            </Route>

            <Route exact path="/customers">
                <CustomersList />
            </Route>

            <Route path="/customerRequest/create">
                <CustomerForm />
            </Route>

            <Route exact path="/customerRequests/:customerRequestId(\d+)">
                <CustomerRequest />
            </Route>
 
        </>
    )
}