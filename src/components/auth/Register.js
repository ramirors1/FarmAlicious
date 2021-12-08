// import React, { useState } from "react"
// import { useHistory } from "react-router-dom";
// // import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
// import "./Login.css"

// export const Register = () => {
//     const [credentials, syncAuth] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         farmer: false
//     })
//     // const { register } = useSimpleAuth()
//     const register = useHistory()
//     const history = useHistory()

//     const handleRegister = (e) => {
//         e.preventDefault()

//         const newUser = {
//             name: `${credentials.firstName} ${credentials.lastName}`,
//             email: credentials.email,
//             farmer: credentials.farmer
//         }

//         register(newUser).then(() => {
//             history.push("/")
//         })
//     }

//     const handleUserInput = (event) => {
//         const copy = {...credentials}
//         copy[event.target.id] = event.target.value
//         syncAuth(copy)
//     }


//     return (
//         <main style={{ textAlign: "center" }}>
//             <form className="form--login" onSubmit={handleRegister}>
//                 <h1 className="h3 mb-3 font-weight-normal">Please Register for FarmAlicious</h1>
//                 <fieldset>
//                     <label htmlFor="firstName"> First Name </label>
//                     <input type="text" onChange={handleUserInput}
//                         id="firstName"
//                         className="form-control"
//                         placeholder="First name"
//                         required autoFocus />
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="lastName"> Last Name </label>
//                     <input type="text" onChange={handleUserInput}
//                         id="lastName"
//                         className="form-control"
//                         placeholder="Last name"
//                         required />
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="inputEmail"> Email address </label>
//                     <input type="email" onChange={handleUserInput}
//                         id="email"
//                         className="form-control"
//                         placeholder="Email address"
//                         required />
//                 </fieldset>
//                 <fieldset>
//                     <input
//                         onChange={
//                             (event) => {
//                                 const copy = { ...credentials }
//                                 if (event.target.value === "on") {
//                                     copy.farmer = true
//                                 }
//                                 else {
//                                     copy.farmer = false
//                                 }
//                                 syncAuth(copy)
//                             }
//                         }
//                         defaultChecked={credentials.farmer}
//                         type="checkbox" name="farmer" id="farmer" />
//                     <label htmlFor="farmer"> Farmer account? </label>
//                 </fieldset>

//                 <fieldset>
//                     <button type="submit">
//                         Sign in
//                     </button>
//                 </fieldset>
//             </form>
//         </main>
//     )
// }


import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()
        const [credentials, syncAuth] = useState({
        firstName: "",
        lastName: "",
        email: "",
        farmer: false
    })


    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("farmalicious_user", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for FarmAlicious</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateUser}
                           type="text" id="firstName" className="form-control"
                           placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateUser} 
                           type="text" id="lastName" className="form-control" 
                           placeholder="Last name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>

                <fieldset>
                    <input
                        onChange={
                        (event) => {
                const copy = { ...credentials }
                    if (event.target.value === "on") {
                        copy.farmer = true
                        }
                    else {
                        copy.farmer = false
                    }
                syncAuth(copy)
                        }
                    }
                        defaultChecked={credentials.farmer}
                        type="checkbox" name="farmer" id="farmer" />
                    <label htmlFor="farmer"> Farmer account? </label>
                </fieldset>

                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}


