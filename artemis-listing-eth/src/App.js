import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";

import Listing from './Comp/Listing';
import Nav from './Comp/Nav'
import Cancel from './Comp/Cancel'
import './App.css';
import Buying from "./Comp/Buying";
import Footer from "./Comp/Footer";
import transferABI from './json/transferAbi.json'
import configJSON from './json/config.json'


// require('dotenv').config()

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  // const contractAddress = '0x23398f90001c0c137e24f83bEbd5a63Dd4A0a194'
  const contractAddress = configJSON.contract
  const [contract,updateContract] = useState(null)
  // const [wallet,updateWallet] = useState(null)

  // console.log('private key: ', process.env.REACT_APP_PRIVATE_KEY)


  async function requestAccount() {
    console.log("requesting Account");
    // X Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setWalletAddress(accounts[0]);

        const chainId = await window.ethereum.request({ method: 'eth_chainId'});
        // const chainIdConverted = parseInt(chainId)
        if(chainId != 137){
          alert('Switch to matic network')
        }
      } catch (error) {
        console.log("Error connecting...", error);
      }
    } else {
      console.log("metamask not detected. Please install metamask.");
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/");
      // const wallet1 = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider)
      // updateWallet(wallet1)
      // const contract1 = new ethers.Contract(contractAddress, transferABI, wallet1)
      const contract1 = new ethers.Contract(contractAddress, transferABI, provider.getSigner())
      updateContract(contract1)
    }
  }

  // useEffect(() => {
  //   if(window.ethereum) {
  //     window.ethereum.on('chainChanged', () => {
  //       window.location.reload();
  //     })
  //     window.ethereum.on('accountsChanged', () => {
  //       window.location.reload();
  //     })
  //   }
  // })

  useEffect(() => {
    async function listenMMAccount() {
      window.ethereum.on("accountsChanged", async function() {
        // Time to reload your interface with accounts[0]!
        // accounts = await web3.eth.getAccounts();
        // accounts = await web3.eth.getAccounts();
        // console.log(accounts);
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          // console.log(accounts);
          setWalletAddress(accounts[0]);
          const chainId = await window.ethereum.request({ method: 'eth_chainId'});
        // const chainIdConverted = parseInt(chainId)
        if(chainId != 137){
          alert('Switch to matic network')
        }
        } catch (error) {
          console.log("Error connecting...", error);
        }    
      });

      window.ethereum.on('chainChanged', (chainId)=>{
        // const chainIdConverted = parseInt(chainId)
        if(chainId!=137){
          alert("Switch to Matic network")
        }
      })
    }
    listenMMAccount();
  },[]);
  
  return (
    <div className="App">
      <Nav connectWallet = {connectWallet} walletAddress={walletAddress}  />
      <Listing contract={contract} walletAddress={walletAddress} />
      <Buying contract={contract} walletAddress={walletAddress} />
      <Cancel contract={contract} walletAddress={walletAddress} />
      <Footer />
    </div>
  );
}

export default App;
