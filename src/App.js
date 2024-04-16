import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



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
import config from './config.json';
import DeployContract from './components/DeployContract';


// const Home = () => <div>Home Page</div>;
// const About = () => <div>About Page</div>;
// const Contact = () => <div>Contact Page</div>;


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

      const central = new ethers.Contract("0xb8a1e33F164f3D7A608156c7Ef2901df6d7F7b8e", CentralABI, signer);

      setCentral(central);
    }catch(error){
      console.log(error);
      // showErrorMessage(error);
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


        <Route path="/GstValidate" element={<GstValidate />} />


      </Routes>
    </Router>
  );
}



export default App;






