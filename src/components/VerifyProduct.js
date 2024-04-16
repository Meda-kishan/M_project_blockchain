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

    // const details=["Manufacturer ID","Product  Name","Producy Brand"];
    //const [scannedData, setScannedData] = useState(null);

    // const handleScan = (data) => {
    //     setScannedData(data);
    // }

    function showErrorMessage(error) {
        alert(`An error occurred while connecting to MetaMask: ${error.message}`);
    }

    const handleInput1Change = (e) => {
        setCompanyContractAddress(e.target.value);
      };
    
      const handleInput2Change = (e) => {
        setProductId(e.target.value);
      };
    


    const checkProduct = async () => {
        try{
            debugger
            const result = await central.checkProduct(companyContractAddress, parseInt(productId));
            console.log("result",result)
            debugger
            setProductStatus(result);
            // if(result==="Counterfeit")
            //     setShowPopup(true)

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
    
    const closePopup = () => {
        setShowPopup(false); // Close the popup
        setShowPopup2(false);
        resetForm();
    };


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

    // const showCounterfeitPopup = () => {
    //     alert('The scanned product is counterfeit.');
    // };


    

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
                            <button className='close-button' onClick={closePopup}>
                                <span>Close</span>
                            </button>
                        </div>
                            </div>
                     </div>
                )}
                    {/* {scannedData ? <p>Scanned data: {scannedData}</p> : <QRScanner onScan={handleScan} />} */}
                </div>

                {showPopup && <div className="overlay"></div>}


                <button className='button__toggle form__button' onClick={checkProduct}>Verify</button>
                {productStatus && <p>Result: {productStatus}</p>}


            </div>

            

        </div>
    )
}

//Extra

// class QrContainer extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             result: 'Hold QR Code Steady and Clear to scan',
//         }
//         this.handleScan = this.handleScan.bind(this)
//     }
//     handleScan(result){
//         this.setState({
//             result: "data"
//         })
//     }
//     handleError(err){
//         console.error(err)
//     }
//     render(){
//         const previewStyle = {
//             height: 200,
//             width: 200,
//             display: 'flex',
//             "justify-content": "center"
//         }
//         const camStyle = {
//             display: 'flex',
//             justifyContent: "center",
//             marginTop: '-50px'
//         }

//         const textStyle = {
//             fontSize: '30px',
//             "text-align": 'center',
//             marginTop: '-50px'
//         }

//         return(
//             <React.Fragment>
//                 <div style={camStyle}>
//                     <QrReader
//                         delay={100}
//                         style={previewStyle}
//                         onError={this.handleError}
//                         onScan={this.handleScan}
//                         />
//                 </div>
//                 <p style={textStyle}>
//                     {this.state.result}
//                 </p>
//             </React.Fragment>
//         )
//     }
// }

export default VerifyProduct;

