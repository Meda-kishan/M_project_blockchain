// import React from 'react';

// class SignUpSignInComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             company_name: '',
//             location: '',
//             pan_number: '',
//             no_of_entity: '',
//             govt: 'Z',
//             gst_num: '',
//             signInVisible: true,
//             signUpVisible: false
//         };
//     }

//     handleInputChange = (event) => {
//         this.setState({
//             [event.target.id]: event.target.value
//         });
//     }

//     handleSignUpButtonClick = () => {
//         this.setState({
//             signInVisible: false,
//             signUpVisible: true
//         });
//     }

//     handleSignInButtonClick = () => {
//         this.setState({
//             signInVisible: true,
//             signUpVisible: false
//         });
//     }

//     validateGST = (gst_i) => {
//         const umap = new Map();
//         let count = 0;

//         for (let i = 0; i < 10; i++) {
//             umap.set(String(i), count++);
//         }

//         for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
//             umap.set(String.fromCharCode(i), count++);
//         }

//         if (gst_i.length !== 15 || gst_i[5] !== 'C') {
//             console.log("Invalid Number");
//             return false;
//         }

//         const multipler = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
//         let hash_sum = 0;

//         for (let i = 0; i < 14; i++) {
//             const weight = umap.get(gst_i[i]);
//             const product = weight * multipler[i];
//             const remainder = product % 36;
//             const quo = Math.floor(product / 36);
//             hash_sum += remainder + quo;
//         }

//         hash_sum %= 36;
//         hash_sum = 36 - hash_sum;

//         let fifteenth_char = '';

//         for (const [key, value] of umap.entries()) {
//             if (value === hash_sum) {
//                 fifteenth_char = key;
//                 break;
//             }
//         }

//         if (!fifteenth_char) {
//             console.log("Unable to determine fifteenth character.");
//             console.log(fifteenth_char)
//             return false;
//         }

//         var gst=gst_i;
//         gst=gst_i.slice(0, 13);

//         gst = gst_i ;
//         gst[14]=fifteenth_char;

//         console.log("Hash_sum: " + hash_sum);
//         console.log("The fifteenth character is: " + fifteenth_char);
//         console.log("GST: " + gst);
//         console.log("User GST",gst_i)
//         console.log("Original GST",gst)
//         return gst_i === gst;
//     }

//     validatePAN = (pan) => {
//         return pan.length === 10 && pan[3] === 'C';
//     }

//     handleSignUpSubmit = (event) => {
//         event.preventDefault();
//         const { company_name, location, pan_number, no_of_entity, govt, gst_num } = this.state;

//         if (!this.validatePAN(pan_number)) {
//             alert('Enter valid PAN details');
//             return;
//         }

//         const generated_gst = location + pan_number + no_of_entity + govt;
//         const isValidGST = this.validateGST(generated_gst);

//         if (isValidGST && gst_num.substring(0, 14) === generated_gst) {
//             // Handle sign-up logic here
//             alert('Details are verified and successfully registered');
//             this.setState({
//                 company_name: '',
//                 location: '',
//                 pan_number: '',
//                 no_of_entity: '',
//                 govt: 'Z',
//                 gst_num: ''
//             });
//         } else {
//             alert('Failed to Register: Incorrect Details');
//         }
//     }

//     handleSignInSubmit = (event) => {
//         event.preventDefault();
//         // Handle sign-in logic here
//     }

//     render() {
//         return (
//             <div id="container">
//                 <div id="buttons">
//                     <button id="sign_in_button" onClick={this.handleSignInButtonClick}>
//                         Sign-in
//                     </button>
//                     <button id="sign_up_button" onClick={this.handleSignUpButtonClick}>
//                         Sign-Up
//                     </button>
//                 </div>
//                 <div id="sign-up" style={{ display: this.state.signUpVisible ? 'block' : 'none' }}>
//                     <form id="register_details" onSubmit={this.handleSignUpSubmit}>
//                         <h2 id="sign_up_head">SIGN-UP</h2>
//                         <label htmlFor="company_name">Company Name</label>
//                         <input type="text" id="company_name" placeholder="Company Name" required onChange={this.handleInputChange} value={this.state.company_name} />

//                         <label htmlFor="location">State Location</label>
//                         <select id="location" required onChange={this.handleInputChange} value={this.state.location}>
                            


//                             <option value="" selected disabled>Select a state/UT</option>
//                             <option value="37">Andhra Pradesh (New)</option>
//                             <option value="28">Andhra Pradesh (Old)</option>
//                             <option value="35">Andaman & Nicobar Islands</option>
//                             <option value="12">Arunachal Pradesh</option>
//                             <option value="18">Assam</option>
//                             <option value="13">Bihar</option>
//                             <option value="04">Chandigarh</option>
//                             <option value="22">Chhattisgarh</option>
//                             <option value="01">Jammu & Kashmir</option>
//                             <option value="20">Jharkhand</option>
//                             <option value="29">Karnataka</option>
//                             <option value="32">Kerala</option>
//                             <option value="17">Meghalaya</option>
//                             <option value="23">Madhya Pradesh</option>
//                             <option value="27">Maharashtra</option>
//                             <option value="14">Manipur</option>
//                             <option value="15">Mizoram</option>
//                             <option value="07">Delhi</option>
//                             <option value="25">Daman & Diu</option>
//                             <option value="26">Dadra & Nagar Haveli</option>
//                             <option value="31">Lakshadweep</option>
//                             <option value="30">Goa</option>
//                             <option value="24">Gujarat</option>
//                             <option value="06">Haryana</option>
//                             <option value="20">Himachal Pradesh</option>
//                             <option value="09">Uttar Pradesh</option>
//                             <option value="03">Punjab</option>
//                             <option value="16">Tripura</option>
//                             <option value="33">Tamil Nadu</option>
//                             <option value="34">Puducherry</option>
//                             <option value="19">West Bengal</option>
//                             <option value="05">Uttarakhand</option>
//                             <option value="11">Sikkim</option>
//                             <option value="10">Bihar</option>
//                             <option value="21">Orissa</option>
//                             <option value="36">Telengana</option>
//                             <option value="02">Himachal Pradesh</option>
//                             <option value="08">Rajasthan</option>
//                             <option value="02">West Bengal</option>
//                             <option value="08">Daman & Diu</option>
//                             <option value="09">Dadra & Nagar Haveli</option>
//                             <option value="37">Andhra Pradesh (New)</option>
                                
//                         </select>

//                         <label htmlFor="pan_number">PAN Number</label>
//                         <input type="text" id="pan_number" placeholder="PAN Number" required onChange={this.handleInputChange} value={this.state.pan_number} />

//                         <label htmlFor="no_of_entity">Number of Entity of same PAN number</label>
//                         <input type="text" id="no_of_entity" placeholder="NO of org with same PAN Number" required onChange={this.handleInputChange} value={this.state.no_of_entity} />

//                         <label htmlFor="govt">Does your org. belongs to GOVT. bodies</label>
//                         <select id="govt" onChange={this.handleInputChange} value={this.state.govt}>
//                             <option value="Z">No</option>
//                             <option value="">Yes</option>
//                         </select>

//                         <label htmlFor="gst_num">GST Number</label>
//                         <input type="text" id="gst_num" placeholder="GST Number" required onChange={this.handleInputChange} value={this.state.gst_num} />
                        
//                         <input type="submit" value="Register" />
//                     </form>
//                 </div>
//                 <div id="sign-in" style={{ display: this.state.signInVisible ? 'block' : 'none' }}>
//                     <form id="log_in" onSubmit={this.handleSignInSubmit}>
//                         <h2 id="sign_in">SIGN-IN</h2>
//                         <label htmlFor="username">Username</label>
//                         <input type="text" id="username" placeholder="Username" required />

//                         <label htmlFor="password">Password</label>
//                         <input type="password" id="password" placeholder="Password" required />

//                         <input type="submit" value="Log-in" />
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }

// export default SignUpSignInComponent

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './app.css';

const GstValidate = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

    const navigate=useNavigate()


    const handleSubmit =(e) =>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{username,password})
    .then(result =>{
        console.log(result)
        if(result.data  === "success"){
            navigate('/createcontract')
        }
        else {
          // Handle authentication failure
          alert("Authentication failed. Please check your username and password.");
      }
    })
        .catch(err=>console.log(err))
    }
    
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div style={{ backgroundColor: "#ccc", padding: "20px", borderRadius: "8px", width: "300px" }}>
        <h2 style={{ textAlign: "center", color: "purple" }}>Login</h2>

        <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: "10px" }}>
                <label htmlFor="username" style={{ color: "black" }}>
                    <strong>Username:</strong>
                </label>
                <input
                    type="text"
                    placeholder="Enter username"
                    autoComplete="off"
                    name="username"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #aaa" }}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label htmlFor="password" style={{ color: "black" }}>
                    <strong>Password:</strong>
                </label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    autoComplete="off"
                    name="password"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #aaa" }}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                type="submit"
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "purple",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Login
            </button>

        </form>

      <p style={{ textAlign: "center", color: "purple" }}>Don't have an account register in below link </p>
       <Link to="/Signup2"className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none" >
        Register
       </Link>

       
       </div>
    </div>
  );
}

export default GstValidate;
