import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";

import data from "../Data";
import nftPreview from '../Img/nftPreview.gif'

const Buying = ({ contract }) => {
  const {tokenId:buyingTokenId, tokenAddress:buyingTokenAddress, sellerAddress:buyingSellerAddress, onSale} = data.buyingData;
  const [buyingPrice, updatebuyingPrice] = useState("Not For Sale");
  const [displaybuyingPrice, updateDisplaybuyingPrice] = useState("Not For Sale");

  const checkPrice = async () => {
    const tokenId = BigNumber.from(buyingTokenId);
    const listingKey = ethers.utils.AbiCoder.prototype.encode(
      ["uint256", "address", "address"],
      [tokenId, buyingTokenAddress, buyingSellerAddress]
    );
    const tx = await contract.functions.listings(listingKey);
    console.log("receipt", tx);
    const price = parseInt(tx[1]._hex);
    console.log(price);
    updatebuyingPrice("" + price);
    updateDisplaybuyingPrice("" + ethers.utils.formatEther(price) + " Matic");
  };

  const handleBuying = async (event) => {
    // alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
    console.log("buying submitted!");
    const tokenId = BigNumber.from(buyingTokenId);
    const listingKey = ethers.utils.AbiCoder.prototype.encode(
      ["uint256", "address", "address"],
      [tokenId, buyingTokenAddress, buyingSellerAddress]
    );
    
    const tx = await contract.functions.buyListingWithETH(listingKey, {
      value: ethers.BigNumber.from(buyingPrice),
    });
    const receipt = await tx.wait();
    console.log("receipt", receipt);
  };

  useEffect(()=>{
    if(onSale){
      checkPrice()
      console.log('price updated')
    }
  },[buyingTokenId,buyingTokenAddress, buyingSellerAddress])

  return (
    <div className="form-container">
      <h1>Buying</h1>
      <div className='buy-data-row'>
        <img src ={nftPreview} />
      </div>
      <div className='buy-data-row'>
        <strong>Token Id: </strong>
        {buyingTokenId}
      </div>
      <div className='buy-data-row'>
        <strong>Token Address: </strong>
        {buyingTokenAddress}
      </div>
      <div className='buy-data-row'>
        <strong>Price: </strong>
        {displaybuyingPrice}
      </div>
      <div>
        <button onClick={handleBuying}>Buy</button>
      </div>
    </div>
  );
};

export default Buying;
