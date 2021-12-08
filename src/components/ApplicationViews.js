import React from "react"
import { Route } from "react-router-dom"
import { FarmersList } from "./farmers/FarmersList";
// import { EmployeeList } from "./employees/EmployeesList";
// import { Employee } from "./employees/Employee";
// import { TicketList } from "./serviceTickets/TicketList";
// import { Ticket } from "./serviceTickets/Ticket";
// import { TicketForm } from "./serviceTickets/TicketForm";
// import { HireForm } from "./employees/HireEmployee";

export const ApplicationViews = () => {
    return (
        <>
        <h1>FarmAlicious</h1>
            {/* will render customer's list when customer link is clicked from the NavBar  */}
            
            <Route exact path="/farmers">  
                <FarmersList />
            </Route>

            {/* <Route path="/employee/create">
            <HireForm />
            </Route>

            <Route exact path="/employees">
                <EmployeeList />
            </Route>

            <Route exact path="/employees/:employeeId(\d+)">
                <Employee />
            </Route>

            <Route path="/ticket/create">
                <TicketForm />
            </Route>

            <Route exact path="/tickets">
                <TicketList />
            </Route>

            <Route exact path="/tickets/:ticketId(\d+)">
                <Ticket />
            </Route> */} 


        </>
    )
}