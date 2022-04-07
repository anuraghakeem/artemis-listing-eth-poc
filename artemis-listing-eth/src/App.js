import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";

import Listing from "./Comp/Listing";
import Nav from "./Comp/Nav";
import Cancel from "./Comp/Cancel";
import "./App.css";
import Buying from "./Comp/Buying";
import Footer from "./Comp/Footer";
import transferABI from "./json/transferAbi.json";
import configJSON from "./json/config.json";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const contractAddress = configJSON.contract;
  const [contract, updateContract] = useState(null);

  async function requestAccount() {
    console.log("requesting Account");
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setWalletAddress(accounts[0]);

        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (chainId != 137) {
          alert("Switch to matic network");
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
      const contract1 = new ethers.Contract(
        contractAddress,
        transferABI,
        provider.getSigner()
      );
      updateContract(contract1);
    }
  }

  useEffect(() => {
    async function listenMMAccount() {
      window.ethereum.on("accountsChanged", async function () {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);
          const chainId = await window.ethereum.request({
            method: "eth_chainId",
          });
          if (chainId != 137) {
            alert("Switch to matic network");
          }
        } catch (error) {
          console.log("Error connecting...", error);
        }
      });

      window.ethereum.on("chainChanged", (chainId) => {
        if (chainId != 137) {
          alert("Switch to Matic network");
        }
      });
    }
    listenMMAccount();
  }, []);

  return (
    <div className="App">
      <Nav connectWallet={connectWallet} walletAddress={walletAddress} />
      <Listing contract={contract} walletAddress={walletAddress} />
      <Buying contract={contract} walletAddress={walletAddress} />
      <Cancel contract={contract} walletAddress={walletAddress} />
      <Footer />
    </div>
  );
}

export default App;
