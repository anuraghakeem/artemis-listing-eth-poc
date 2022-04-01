import { useState } from "react";
import { ethers } from "ethers";

import Listing from './Comp/Listing';
import Nav from './Comp/Nav'
import './App.css';
import Buying from "./Comp/Buying";
import Footer from "./Comp/Footer";


function App() {
  const [walletAddress, setWalletAddress] = useState("");

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
    }
  }
  return (
    <div className="App">
      <Nav connectWallet = {connectWallet} walletAddress={walletAddress}  />
      < Listing />
      <Buying />
      <Footer />
    </div>
  );
}

export default App;
