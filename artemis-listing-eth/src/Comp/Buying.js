import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";


const Buying = ({ contract }) => {

  const [buyingTokenId, updateBuyingTokenId] = useState("");
  const [buyingTokenAddress, updateBuyingTokenAddress] = useState("");
  const [buyingSellerAddress, updateBuyingSellerAddress] = useState("");

  const [buyingPrice, updatebuyingPrice] = useState("Not For Sale");
  const [displaybuyingPrice, updateDisplaybuyingPrice] =
    useState("Not For Sale");

  const handleBuyingTokenIdChange = (event) => {
    updateBuyingTokenId(event.target.value);
  };
  const handleBuyingTokenAddressChange = (event) => {
    updateBuyingTokenAddress(event.target.value);
  };
  const handleBuyingSellerAddressChange = (event) => {
    updateBuyingSellerAddress(event.target.value);
  };

  const checkPrice = async () => {
    const tokenId = BigNumber.from(buyingTokenId);
    const listingKey = ethers.utils.AbiCoder.prototype.encode(
      ["uint256", "address", "address"],
      [tokenId, buyingTokenAddress, buyingSellerAddress]
    );
    const tx = await contract.functions.listings(listingKey);
    const price = BigNumber.from(tx[1]._hex);
    updatebuyingPrice("" + price);
    updateDisplaybuyingPrice("" + ethers.utils.formatEther(price) + " Matic");
  };

  const handleBuying = async (event) => {
    event.preventDefault();
    const tokenId = BigNumber.from(buyingTokenId);
    const listingKey = ethers.utils.AbiCoder.prototype.encode(
      ["uint256", "address", "address"],
      [tokenId, buyingTokenAddress, buyingSellerAddress]
    );
    
    const tx = await contract.functions.buyListingWithETH(listingKey, {
      value: ethers.BigNumber.from(buyingPrice),
    });
    const receipt = await tx.wait();
  };
  return (
    <div className="form-container">
      <h1>Buying</h1>
      <div className="form">
        <label>
          <strong>TokenID:</strong>
          {buyingTokenId}
        </label>
        <textarea
          value={buyingTokenId}
          onChange={handleBuyingTokenIdChange}
          className="input-box"
        />
        <label>
          <strong>Token Address:</strong>
          {buyingTokenAddress}
        </label>
        <textarea
          value={buyingTokenAddress}
          onChange={handleBuyingTokenAddressChange}
          className="input-box"
        />
        <label>
          <strong>Seller Address:</strong>
          {buyingSellerAddress}
        </label>
        <textarea
          value={buyingSellerAddress}
          onChange={handleBuyingSellerAddressChange}
          className="input-box"
        />

        </div>
      
      <div className="buy-data-row">
        <strong>Price: </strong>
        {displaybuyingPrice}
      </div>
      <div>
        <button onClick={checkPrice} className='btn-checkPrice'>Check Price</button> 
        <button onClick={handleBuying}>Buy</button>
      </div>
    </div>
  );
};

export default Buying;
