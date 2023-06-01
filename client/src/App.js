import abi from "../src/contract/Chai.json"
import './App.css';
import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import chai from "./chai (2).png";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
function App() {
  const [state ,setState] = useState({
    provider:null,
    signer:null,
    contract:null
  });
  const [account, setAccount] = useState("None");
  useEffect(()=>{
    const connectWallet = async ()=>{
      const contractAddress = "0x9F30dE592FC0a0d5A04dCA8FFd5d8bE9672676b3";
      const contractABI = abi.abi;

      try{
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
           
          });
          setAccount(accounts);
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({provider,signer,contract})
        
        console.log(contract)
      }catch(err){
          console.log(err)
      }
    }
    connectWallet();
  })
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
