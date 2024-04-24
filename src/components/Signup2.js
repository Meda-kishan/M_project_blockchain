// import React from 'react';
// import { Link, withRouter } from 'react-router-dom';


// class Signup2 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             company_name: '',
//             location: '',
//             pan_number: '',
//             no_of_entity: '',
//             govt: 'Z',
//             gst_num: '',
//             signInVisible: false,
//             signUpVisible: true,
//         };
//         // this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleSubmit = (event) => {
//         // Perform any necessary actions (e.g., form validation, data processing)
      
//         // Navigate to another page
//         window.location.href = 'another-page.html';
//     }
    
  

//     handleInputChange = (event) => {
//         this.setState({
//             [event.target.id]: event.target.value
//         });
//     }
      

//     // Function to create a manufacturer object
//     createManufacturer = () => {
//         const { company_name, location, pan_number, no_of_entity, govt, gst_num } = this.state;
//         return new Manufacturer(company_name, location, pan_number, no_of_entity, govt, gst_num);
//     }

//     // Function to validate PAN (assuming PAN validation logic remains the same)
//     validatePAN = (pan) => {
//         return pan.length === 10 && pan[3] === 'C';
//     }

//     // Function to validate GST (remains unchanged)
//     validateGST = (gst_i) => {
//         // ... (GST validation logic from original code)

//         const umap = new Map();
//     let count = 0;

//     for (let i = 0; i < 10; i++) {
//         umap.set(String(i), count++);
//     }

//     for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
//         umap.set(String.fromCharCode(i), count++);
//     }

//     if (gst_i.length !== 15 || gst_i[5] !== 'C') {
//         console.log("Invalid Number");
//         return false;
//     }

//     const multipler = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
//     let hash_sum = 0;

//     for (let i = 0; i < 14; i++) {
//         const weight = umap.get(gst_i[i]);
//         const product = weight * multipler[i];
//         const remainder = product % 36;
//         const quo = Math.floor(product / 36);
//         hash_sum += remainder + quo;
//     }

//     hash_sum %= 36;
//     hash_sum = 36 - hash_sum;

//     let fifteenth_char = '';

//     for (const [key, value] of umap.entries()) {
//         if (value === hash_sum) {
//             fifteenth_char = key;
//             break;
//         }
//     }

//     if (!fifteenth_char) {
//         console.log("Unable to determine fifteenth character.");
//         console.log(fifteenth_char)
//         return false;
//     }

//     var gst=gst_i;
//     gst=gst_i.slice(0, 13);

//     gst = gst_i ;
//     gst[14]=fifteenth_char;

//     console.log("Hash_sum: " + hash_sum);
//     console.log("The fifteenth character is: " + fifteenth_char);
//     console.log("GST: " + gst);
//     console.log("User GST",gst_i)
//     console.log("Original GST",gst)
//     return gst_i === gst;

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
//             const manufacturer = this.createManufacturer();
//             // Add the manufacturer object to an array (assuming you have one)
//             all_manufacturers.push(manufacturer);

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

//     // handleSubmit= (event) => {
//     //     // Perform any necessary actions (e.g., form validation, data processing)
      
//     //     // Navigate to another page
//     //     window.location.href = 'creaContract';
//     //   }


//     // handleSubmit = (event) => {
//     //     event.preventDefault();
//     //     // Perform any necessary actions (e.g., form validation, data processing)
      
//     //     // Navigate to another route
//     //     this.props.history.push('/createContract');
//     // }

//     // ... other methods (handleSignInSubmit, sign_up_btn_clicked, sign_in_btn_clicked)

//     render() {
//         return (
//             // ... JSX for the signup form (remains unchanged)

//             <div id="container">

//         <div id="sign-up" style={{ display: this.state.signUpVisible ? 'block' : 'none' }}>
//             {/* <form id="register_details" onSubmit={this.handleSignUpSubmit}> */}
//             <form id="register_details" onSubmit={this.handleSubmit}>
//                 <h2 id="sign_up_head">SIGN-UP</h2>
//                 <label htmlFor="company_name">Company Name</label>
//                 <input type="text" id="company_name" placeholder="Company Name" required onChange={this.handleInputChange} value={this.state.company_name} />

//                 <label htmlFor="location">State Location</label>
//                 <select id="location" required onChange={this.handleInputChange} value={this.state.location}>
//                     <option value="" disabled>Select a state/UT</option>
                   
//                     {/* Include rest of the options */}

//                     <option value="" selected disabled>Select a state/UT</option>
//             <option value="37">Andhra Pradesh (New)</option>
//             <option value="28">Andhra Pradesh (Old)</option>
//             <option value="35">Andaman & Nicobar Islands</option>
//             <option value="12">Arunachal Pradesh</option>
//             <option value="18">Assam</option>
//             <option value="13">Bihar</option>
//             <option value="04">Chandigarh</option>
//             <option value="22">Chhattisgarh</option>
//             <option value="01">Jammu & Kashmir</option>
//             <option value="20">Jharkhand</option>
//             <option value="29">Karnataka</option>
//             <option value="32">Kerala</option>
//             <option value="17">Meghalaya</option>
//             <option value="23">Madhya Pradesh</option>
//             <option value="27">Maharashtra</option>
//             <option value="14">Manipur</option>
//             <option value="15">Mizoram</option>
//             <option value="07">Delhi</option>
//             <option value="25">Daman & Diu</option>
//             <option value="26">Dadra & Nagar Haveli</option>
//             <option value="31">Lakshadweep</option>
//             <option value="30">Goa</option>
//             <option value="24">Gujarat</option>
//             <option value="06">Haryana</option>
//             <option value="20">Himachal Pradesh</option>
//             <option value="09">Uttar Pradesh</option>
//             <option value="03">Punjab</option>
//             <option value="16">Tripura</option>
//             <option value="33">Tamil Nadu</option>
//             <option value="34">Puducherry</option>
//             <option value="19">West Bengal</option>
//             <option value="05">Uttarakhand</option>
//             <option value="11">Sikkim</option>
//             <option value="10">Bihar</option>
//             <option value="21">Orissa</option>
//             <option value="36">Telengana</option>
//             <option value="02">Himachal Pradesh</option>
//             <option value="08">Rajasthan</option>
//             <option value="02">West Bengal</option>
//             <option value="08">Daman & Diu</option>
//             <option value="09">Dadra & Nagar Haveli</option>
//             <option value="37">Andhra Pradesh (New)</option>


//                 </select>

//                 <label htmlFor="pan_number">PAN Number</label>
//                 <input type="text" id="pan_number" placeholder="PAN Number" required onChange={this.handleInputChange} value={this.state.pan_number} />

//                 <label htmlFor="no_of_entity">Number of Entity of same PAN number</label>
//                 <input type="text" id="no_of_entity" placeholder="NO of org with same PAN Number" required onChange={this.handleInputChange} value={this.state.no_of_entity} />

//                 <label htmlFor="govt">Does your org. belongs to GOVT. bodies</label>
//                 <select id="govt" onChange={this.handleInputChange} value={this.state.govt}>
//                     <option value="Z">No</option>
//                     <option value="">Yes</option>
//                 </select>

//                 <label htmlFor="gst_num">GST Number</label>
//                 <input type="text" id="gst_num" placeholder="GST Number" required onChange={this.handleInputChange} value={this.state.gst_num} />
                
//                 {/* <input type="submit" value="Register" /> */}

//                 <label htmlFor="username">create Username</label>
//                 <input type="text" id="username" placeholder="Enter username" required />

//                 <label htmlFor="password">create Password</label>
//                 <input type="Password" id="username" placeholder="Enter password" required />

//                 <ul className='nav__list grid'>
//                     <li className='nav__item'>
//                         <Link className='nav__link' to="/">Register2</Link>
//                     </li>
//         </ul>

//         <input type="submit" value="Register" />
//             </form>

           
//         </div>
      
//     </div>
//         );
//     }
// }

// class Manufacturer {
//     constructor(company_name, location, pan_num, entity, govt_b, gst_num) {
//         this.company_name = company_name;
//         this.location = location;
//         this.pan_num = pan_num;
//         this.entity = entity;
//         this.govt_b = govt_b;
//         this.gst_num = gst_num;
//     }
// }

// // Assuming you have an array to store manufacturers
// let all_manufacturers = [];

// export default Signup2

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup2 = () => {

    const [companyName, setCompanyName] = useState('');
    const [stateLocation, setStateLocation] = useState('');
    const [panNumber, setPANNumber] = useState('');
    const [numOfEntity, setNumOfEntity] = useState('');
    const [govtBodies, setGovtBodies] = useState('');
    const [gstNumber, setGSTNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const navigate=useNavigate()

    const handleSubmit =(e) =>{
        e.preventDefault()
        axios.post('http://localhost:3001/register',{companyName,stateLocation,panNumber,numOfEntity,govtBodies,gstNumber,username,password})
    .then(result =>{console.log(result)
    navigate('/GstValidate')
    })
        .catch(err=>console.log(err))
    }
    
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%", margin : "40px"}} >
    <div style={{ backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "8px", width: "300px" }}>
        <h2 style={{ textAlign: "center", color: "black" }}>Register</h2>
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "10px" }}>
                <label htmlFor="companyName"><strong>Company Name</strong></label>
                <input 
                   
                    type="text"
                    placeholder="Enter Company Name"
                    autoComplete="off"
                    name="companyName"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", color:"#000", border: "1px solid #ccc" }}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
            </div>

  <div className="mb-3">
    <label htmlFor="stateLocation">
      <strong>State Location</strong>
    </label>
    <select 
      className="form-select rounded-0"
      onChange={(e) => setStateLocation(e.target.value)}
    >
      <option value="" >Select a state/UT</option>
      <option value="37">Andhra Pradesh (New)</option>
      <option value="28">Andhra Pradesh (Old)</option>
      <option value="35">Andaman & Nicobar Islands</option>
      <option value="12">Arunachal Pradesh</option>
      <option value="18">Assam</option>
      <option value="13">Bihar</option>
      <option value="04">Chandigarh</option>
      <option value="22">Chhattisgarh</option>
      <option value="01">Jammu & Kashmir</option>
      <option value="20">Jharkhand</option>
      <option value="29">Karnataka</option>
      <option value="32">Kerala</option>
      <option value="17">Meghalaya</option>
      <option value="23">Madhya Pradesh</option>
      <option value="27">Maharashtra</option>
      <option value="14">Manipur</option>
      <option value="15">Mizoram</option>
      <option value="07">Delhi</option>
      <option value="25">Daman & Diu</option>
      <option value="26">Dadra & Nagar Haveli</option>
      <option value="31">Lakshadweep</option>
      <option value="30">Goa</option>
      <option value="24">Gujarat</option>
      <option value="06">Haryana</option>
      <option value="20">Himachal Pradesh</option>
      <option value="09">Uttar Pradesh</option>
      <option value="03">Punjab</option>
      <option value="16">Tripura</option>
      <option value="33">Tamil Nadu</option>
      <option value="34">Puducherry</option>
      <option value="19">West Bengal</option>
      <option value="05">Uttarakhand</option>
      <option value="11">Sikkim</option>
      <option value="10">Bihar</option>
      <option value="21">Orissa</option>
      <option value="36">Telengana</option>
      <option value="02">Himachal Pradesh</option>
      <option value="08">Rajasthan</option>
      <option value="02">West Bengal</option>
      <option value="08">Daman & Diu</option>
      <option value="09">Dadra & Nagar Haveli</option>
      <option value="37">Andhra Pradesh (New)</option>
    </select>
  </div>

  <div className="mb-3">
    <label htmlFor="panNumber">
      <strong>PAN Number</strong>
    </label>
    <input 
      style={{ color :"#000" }}
      type="text"
      placeholder="Enter PAN Number"
      autoComplete="off"
      name="panNumber"
      className="form-control rounded-0"
      onChange={(e) => setPANNumber(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="numOfEntity">
      <strong>Number of Entities with Same PAN Number</strong>
    </label>
    <input 
      style={{ color :"#000" }}
      type="number"
      placeholder="Enter Number of Entities"
      autoComplete="off"
      name="numOfEntity"
      className="form-control rounded-0"
      onChange={(e) => setNumOfEntity(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="govtBodies">
      <strong>Does your organization belong to GOVT. bodies?</strong>
    </label>
    <select 
      className="form-select rounded-0"
      onChange={(e) => setGovtBodies(e.target.value)}
    >
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="mb-3">
    <label htmlFor="gstNumber">
      <strong>GST Number</strong>
    </label>
    <input 
      style={{ color :"#000" }}
      type="text"
      placeholder="Enter GST Number"
      autoComplete="off"
      name="gstNumber"
      className="form-control rounded-0"
      onChange={(e) => setGSTNumber(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="username">
      <strong>Create Username</strong>
    </label>
    <input 
      style={{ color :"#000" }}
      type="text"
      placeholder="Enter Username"
      autoComplete="off"
      name="username"
      className="form-control rounded-0"
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="password">
      <strong>Create Password</strong>
    </label>
    <input 
      style={{ color :"#000" }}
      type="password"
      placeholder="Enter Password"
      autoComplete="off"
      name="password"
      className="form-control rounded-0"
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
  {/* <button type="submit" className="signup2_register_btn">Register</button> */}


      <p>Already have an account</p>
       <Link to="/GstValidate"className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"  >
        Login
       </Link>
       </form>
       
       </div>
    </div>
  );
}

export default Signup2;