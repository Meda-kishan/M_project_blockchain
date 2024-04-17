import React, {useState, useRef} from 'react'
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import { useEffect } from 'react';
// import QRCode from "qrcode";
import QrScanner from 'qr-scanner';

// import QrReader from 'react-qr-reader';

// import  { Component } from 'react';



const VerifyProduct = ({ provider, central }) => {

    const [companyContractAddress, setCompanyContractAddress] = useState('');
    const [productId, setProductId] = useState('');

    const [productStatus, setProductStatus] = useState(null);


    const [showPopup, setShowPopup] = useState(false);
    const [showpopup2,setShowPopup2]= useState(false);
    const [showpopup3,setshowpopup3]=useState(false);
    const [details_popup,set_details_popup]=useState(false);


    //Fake product location
    const [company, setcompany]=useState('');
    const [product, setproduct]=useState('');
    const [state, setstate]=useState('');
    const [location, setlocation]=useState('');

    function showErrorMessage(error) {
        alert(`An error occurred while connecting to MetaMask: ${error.message}`);
    }


    const handleInput1Change = (e) => {
        setCompanyContractAddress(e.target.value);
      };
    
      const handleInput2Change = (e) => {
        setProductId(e.target.value);
      };
    
      const handlecompany = (e) => {
        setcompany(e.target.value);
      }

      const handleproduct = (e) => {
        setproduct(e.target.value);
      }

      const handlelocation = (e) => {
        setlocation(e.target.value);
      }



    const checkProduct = async () => {
        try{
            debugger
            const result = await central.checkProduct(companyContractAddress, parseInt(productId));
            console.log("result",result)
            debugger
            setProductStatus(result);
    
            if(result.length===1)
                setShowPopup(true)
            else
            {

                setShowPopup2(true);
                setData(result);
                console.log(result);
                debugger
        }
        }catch(error){
            console.log(error);
            showErrorMessage(error);
        }
        
    }

    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const fileRef =useRef();


    const resetForm = () => {
        setCompanyContractAddress('');
        setProductId('');
        setFile(null);
        setData(null);
        setProductStatus(null);
        fileRef.current.value = null;
    };

    const reset_details_form = () =>{
        setcompany('');
        setproduct('');
        setstate('');
        setlocation('');
    }
    
    const closePopup = () => {
        setShowPopup(false);
        // setshowpopup3(true);
        set_details_popup(true)
        resetForm();
    };

    const close_success_popup = () => {
        setShowPopup2(false);
        resetForm();
    }

    const close_conf_popup = () =>{
        setshowpopup3(false);
    }

    const close_details_popup=() =>{
        set_details_popup(false);
        reset_details_form();
    }

 


    const handleClick = () => {
        fileRef.current.click();
    };

    const handleChange = async (e) => {
        debugger
        try
        {
            const file = e.target.files[0];
            console.log("file",file)
            debugger
            setFile(file);
            const result = await QrScanner.scanImage(file);
            console.log(result);
            debugger
            if(result.length!==42)
            {
                setData("Fake ! Didn't match with any smart contract")
                
                setShowPopup(true);
            
                debugger
            }
            else
            {
                setData(result);
            }

        }
        catch
        {
            setShowPopup(true);
        }
    };

    return (
        <div className='VerifyProduct'>
            <h3 className='Component__title'>Verify Product</h3>
            <div className='Component__form'>
                <div className='form__content'>
                    <label className='form__label'>Enter Company contract address</label>
                    <input type="text" className='form__input' value={companyContractAddress} onChange={handleInput1Change} />
                </div>
                <div className='form__content'>
                    <label className='form__label'>Enter Product id</label>
                    <input type="text"  className='form__input' value={productId} onChange={handleInput2Change} />
                </div>
                
          
                <div className='form__content'>
                    <h2 className='text-center mb-4'> Scan Your QR Code</h2>
                    <div className='card border-0'>
                        <div className="card-body">
                            <button type='button' onClick={handleClick} className='btn btn-success'>
                                Scan QRCode
                            </button>
                            <input type="file"
                                ref = {fileRef}
                                onChange={handleChange}
                                accept=".png, .jpg, .jpeg" 
                                className='d-none' />
                            <div className='mt-4'>
                                {file && <img src={URL.createObjectURL(file)} alt="QR Code" />}
                            
                                {data && <p className="small mt-5">Contact address : {data}</p>}
                            </div>
                        </div>
                    </div>

                    {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <h4>counterfeit</h4>
                            <div className='counter_image'>
                            <img height="100px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHhW3tPzJxZIElzv8BJjo3a3n-yqZfHwtR23IrM9UiHg&s" alt="Counterfeit QR Code" />
                            </div>
                            <p className='Para_text'>QR Code Didn't match with any smart contract Addresss and details!</p>
                            
                           
                            <div className='close-button-2'>
                            <button className='close-button' onClick={closePopup}>
                                <span>Close</span>
                            </button>
                            </div>
                            
                        </div>
                    </div>
                )}

                {showpopup2 && (
                    <div className='details_popup' >
                        <div className='details_popup-content'>
                            <h3 color='#000'>   Product details</h3>

                            <div className='counter_image' >
                                <img height="100px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSD1_Nv2HJveXuKKFJ6xAN-TE8aVY65TBT_n8_agaFOA&s" alt='success'/>
                            </div>
                            <div className="product_data" >

                                <h4 color='#000'> Manufacturer ID: {data[0]}</h4>
                                <h4 color='#000'>Product Name: {data[1]}</h4>
                                <h4 color='#000'> Product Brand: {data[2]}</h4> 
                            </div>         
                            <div className='close-button-2'>
                            <button className='close-button' onClick={close_success_popup}>
                                <span>Close</span>
                            </button>
                        </div>
                            </div>
                     </div>
                )}

                {/* Confirmation popup */}

                {showpopup3 && (
                    <div className='conf_popup'>
                        <div className='conf_popup_content'>
                           <div className='popup_heading'>
                                <h3 className='popup_head'>Are you sure?</h3>
                            </div>
                            <div className='x_img'>
                                <img height="100px" src="https://www.shutterstock.com/image-vector/exclamation-mark-flat-design-icon-260nw-538050328.jpg" alt='close'/>
                            </div>
                            <h4> Do you want to give the details of this Fake product ? </h4>
                            <div className='yes_no_btns'>
                                <button className='close-button' >
                                    <span>Yes</span>
                                </button>

                                <button className='close-button' onClick={close_conf_popup}>
                                     <span>No</span>
                                 </button>
                            </div>
                        </div>
                    </div>
                )}

                {details_popup && (
                    <div className='detail_popup'>
                        <div className='detail_popup_content'>
                           
                                <h2 className='popup_head'>Please provide the product details </h2>
                            

                        <div className='input_feilds' >
                            <label className='form__label_popup'>Company</label>
                            <input type="text" color='black' className='form__input_popup' value={company} onChange={handlecompany} />

                            <label className='form__label_popup'>Product </label>
                            <input type="text" className='form__input_popup' value={product} onChange={handleproduct} />

                            <label className='form__label_popup'>State</label>
                    
                            <select id='location'>
                                <option value="" selected disabled>Select a state/UT</option>
                                <option value="{state}">Andhra Pradesh (New)</option>
                                <option value="{state}">Andhra Pradesh (Old)</option>
                                <option value="{state}">Andaman & Nicobar Islands</option>
                                <option value="{state}">Arunachal Pradesh</option>
                                <option value="{state}">Assam</option>
                                <option value="{state}">Bihar</option>
                                <option value="{state}">Chandigarh</option>
                                <option value="{state}">Chhattisgarh</option>
                                <option value="{state}">Jammu & Kashmir</option>
                                <option value="{state}">Jharkhand</option>
                                <option value="{state}">Karnataka</option>
                                <option value="{state}">Kerala</option>
                                <option value="{state}">Meghalaya</option>
                                <option value="{state}">Madhya Pradesh</option>
                                <option value="{state}">Maharashtra</option>
                                <option value="{state}">Manipur</option>
                                <option value="{state}">Mizoram</option>
                                <option value="{state}">Delhi</option>
                                <option value="{state}">Daman & Diu</option>
                                <option value="{state}">Dadra & Nagar Haveli</option>
                                <option value="{state}">Lakshadweep</option>
                                <option value="{state}">Goa</option>
                                <option value="{state}">Gujarat</option>
                                <option value="{state}">Haryana</option>
                                <option value="{state}">Himachal Pradesh</option>
                                <option value="{state}">Uttar Pradesh</option>
                                <option value="{state}">Punjab</option>
                                <option value="{state}">Tripura</option>
                                <option value="{state}">Tamil Nadu</option>
                                <option value="{state}">Puducherry</option>
                                <option value="{state}">West Bengal</option>
                                <option value="{state}">Uttarakhand</option>
                                <option value="{state}">Sikkim</option>
                                <option value="{state}">Orissa</option>
                                <option value="{state}">Telengana</option>
                                <option value="{state}">Rajasthan</option>
                            </select>


                            <label className='form__label_popup'>Location</label>
                            <input type="text" className='form__input_popup' value={location} onChange={handlelocation} />
                        </div>
                            
                            <div className='yes_no_btns'>
                                <button className='close-button' >
                                    <span>Submit</span>
                                </button>

                                <button className='close-button' onClick={close_details_popup}>
                                     <span>Close</span>
                                 </button>
                            </div>
                        </div>
                    </div>
                )}

                </div>

                {showPopup && <div className="overlay"></div>}

                <button className='button__toggle form__button' onClick={checkProduct}>Verify</button>
                {productStatus && <p>Result: {productStatus}</p>}

            </div>

        </div>
    )
}


export default VerifyProduct;

