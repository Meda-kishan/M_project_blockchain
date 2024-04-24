// // SignIn.js
// import React from 'react';

// class SignIn extends React.Component {
//     render() {
//         return (
//             <div id="sign-in">
//                 <form id="log_in" onSubmit={this.props.onSubmit}>
//                     <h2 id="sign_in">SIGN-IN</h2>
//                     <label htmlFor="username">Username</label>
//                     <input type="text" id="username" placeholder="username" />

//                     <label htmlFor="password">Password</label>
//                     <input type="password" id="password" placeholder="password" />

//                     <input type="submit" value="Log-in" style={{ marginTop: '5px', marginBottom: '5px' }} />
//                 </form>
//             </div>
//         );
//     }
// }

// export default SignIn;

import React, { useState } from "react";
import axios from "axios";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [manufactureData, setManufactureData] = useState(null);
    const [productsData, setProductsData] = useState(null);
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/Signin", {
                username: username,
                password: password,
            });
            const data = response.data;
            if (data.success) {
                setManufactureData(data.manufacture);
                setProductsData(data.products);
                setMessage("");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setMessage("Internal server error");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form onSubmit={handleLogin} style={{ width: "300px", backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "8px" }}>
                <h2 style={{ textAlign: "center", color:"purple"}}>Manufacture Login</h2>
                <div>
                    <label>Username:</label>
                    <input style={{color : "#000"}}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        style={{color : "#000"}}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button 
                    type="submit" 
                    style={{  
                        color: "black", 
                        backgroundColor: "#ccc", 
                        padding: "10px 20px", 
                        borderRadius: "5px", 
                        border: "none", 
                        cursor: "pointer" 
                    }}
                >
                    Login
                </button>
                

                {message && <p>{message}</p>}
                {manufactureData && (
                    <div>
                        <h3 style={{ textAlign: "center", color:"purple"}}>Manufacture Details:</h3>
                        <p style={{ color:"black"}}>Company Name: {manufactureData.companyName}</p>
                        <p style={{ color:"black"}}>State Location: {manufactureData.stateLocation}</p>
                        <p style={{ color: "black" }}>Company Name: {manufactureData.companyName}</p>
                        <p style={{ color: "black" }}>State Location: {manufactureData.stateLocation}</p>
                        <p style={{ color: "black" }}>Pan Number: {manufactureData.panNumber}</p>
                        <p style={{ color: "black" }}>Number of Entities: {manufactureData.numOfEntity}</p>
                        <p style={{ color: "black" }}>Government Bodies: {manufactureData.govtBodies}</p>
                        <p style={{ color: "black" }}>GST Number: {manufactureData.gstNumber}</p>


                    </div>
                )}
                {productsData && (
                    <div>
                        <h3 style={{ textAlign: "center", color:"purple", margin:"40px"}}>Products:</h3>
                        <ul>
                            {productsData.map((product) => (
                                <li key={product._id} style={{ color: "black" }}>
                                Product ID: {product.productId}<br />
                                Manufacture ID: {product.manufactureId}<br />
                                Product Name: {product.productName}<br />
                                Product Brand: {product.productBrand}<br />
                            </li>
                            
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Signin;
