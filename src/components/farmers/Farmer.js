import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Farmer = () => {
    const [farmer, set] = useState({})  // State variable for current ticket object
    const { farmerId } = useParams()  // Variable storing the route parameter

    useEffect(
        () => {
            fetch(`http://localhost:8088/farmers/${farmerId}`)
                .then(res => res.json())
                .then(set)
        },
        [ farmerId ]  // Above function runs when the value of employeeId changes
    )

    return (
        <>
            <section className="farmer">
                <h3 className="farmer__name">{farmer.name}</h3>
                {/* <div className="employee__name">{employee.name}</div> */}
                <div className="farmer__product">current has {farmer.productId} for sale.</div>
            </section>
        </>
    )
}