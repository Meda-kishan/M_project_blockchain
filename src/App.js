import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'



// Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import VerifyProduct from './components/VerifyProduct';
import AddProduct from './components/AddProduct';
import GetContract from './components/GetContract'
import GstValidate from './components/GstValidate';
import Signin from './components/Signin'
import Signup from './components/Signup';
import Signup2 from './components/Signup2'
import Manufacturer from './components/Manufacturer'




// ABIs
import CentralABI from './abis/Cental_ABI.json';

// Config
// import config from './config.json';
import DeployContract from './components/DeployContract';


function App() {
  const [provider, setProvider] = useState(null);
  const [central, setCentral] = useState(null);

  const [account, setAccount] = useState(null);

  function showErrorMessage(error) {
    alert(`An error occurred while connecting to MetaMask: ${error.message}  '\n'  'Check if you have metamask wallet installed'`);
  }

  const loadBlockchainData = async () => {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log("provider.provrder.app.js lin40", provider)
      const signer = await provider.getSigner();
      setProvider(provider);
      const network = await provider.getNetwork();

      // const central = new ethers.Contract(config[network.chainId].central.address, CentralABI, signer);

      const central = new ethers.Contract("0x8244f1780225a30804d6eC6959e9FA9EfB79B0f4", CentralABI, signer);

      setCentral(central);
    }catch(error){
      console.log(error);
      showErrorMessage(error);
    }

  }

  useEffect(() => {
    loadBlockchainData()
  },)

  return (
    <Router>
      <Navigation account={account} provider={provider} central={central} setAccount={setAccount} />
      <Routes>

        <Route path="/" element={ <Home/> } />
        <Route 
          path="/createcontract" 
          element = {<DeployContract  account={account} provider={provider} central={central} />}
        />

        <Route 
          path="/getcontract" 
          element = {<GetContract  account={account} provider={provider} central={central} />}
        />
        <Route 
          path="/addproduct"  
          element = {<AddProduct account={account} provider={provider} central={central} />}
        />

        <Route 
          path="/verify" 
          element = {<VerifyProduct  account={account} provider={provider} central={central} />}
        />

        <Route path="/gstvalidate" element={<GstValidate />} />

        <Route path="/Signin" element={<Signin />} />

        <Route path="/Signup" element={<Signup />} />

        <Route path="/Signup2" element={<Signup2 />} />

        <Route path="/Manufacturer" element={<Manufacturer />} />

        {/* <Route path="/Manufacturer" element={<QrScanner />} /> */}
        


        <Route path="/GstValidate" element={<GstValidate />} />



      </Routes>
    </Router>
  );
}



export default App;






