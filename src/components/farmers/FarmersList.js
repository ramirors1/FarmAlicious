import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

export const FarmersList = () => {
    const [farmers, changeFarmer] = useState([])
    const [product, setProduct] = useState("")
    const [posts, updatePosts] = useState([])
    const history = useHistory()
    const getAllPosts = () => {
        return fetch("http://localhost:8088/farmersPosts?_expand=employee&_expand=customer")
        .then(res => res.json())
        .then((data) => {
            updatePosts(data)
        })
       } 

    useEffect(
        () => {
            fetch("http://localhost:8088/farmerPosts?_expand=user&_expand=product")
                .then(res => res.json())
                .then((farmersFromAPI) => {
                    changeFarmer(farmersFromAPI)
                })
        },
        []
    )

    useEffect(() => {
        const justProducts = farmers.map(farmer => farmer.product)
        setProduct(justProducts.join(", "))
    }, [farmers])

    useEffect(
        () => {getAllPosts()
                
        },
        []
    )
            const deletePost = (id) => {
                fetch(`http://localhost:8088/farmersPosts/${id}`, {
                method: "DELETE"
            })
            getAllPosts()

        }

    return (
        <>
            <div>
                <button onClick={() => history.push("/farmerPost/create")}>Post my Crop</button>
            </div> 
            {
                farmers.map(
                    (farmer) => {
                        return <div key={`farmer--${farmer.id}`}>
                            {/* //ternary statement, if farmer is emergency then className is emergency, else className is ticket */}
                            {/* <p className={farmer.emergency ? "emergency farmer" : "farmer"}>   */}
                            <p>
                            {/* {farmer.user.name ? "🚑" : ""}  */}
                            <Link to={`/farmers/${farmer.id}`}>{farmer.user.firstName} { farmer.user.lastName}</Link> submitted by {farmer.user.fistName} and worked on by {farmer.name}
                             <button onClick={() => {deletePost(farmer.id)}}>Delete</button>
                            </p>
                            {/* <p>{ticket.description} submitted by {ticket.customer.name}
                            and worked on by {ticket.employee.name}</p> */}
                            </div>
                    }
                )
                
                    }
                
            
        </>
    )
}



    // return (
    //     <>
    //      <div>
    //             <button onClick={() => history.push("/farmer/create")}>Post my Crop</button>
    //         </div> 
    //         {
    //             farmers.map(
    //                 (farmer) => {
    //                     return <p key={`farmer--${farmer.id}`}>
    //                         <Link to={`/farmers/${farmer.id}`}>{farmer.user.firstName} {farmer.user.lastName}</Link>
    //                      has {product.name}</p>
    //                 }
    //             )
    //         }
    //     </>
    // )
// }