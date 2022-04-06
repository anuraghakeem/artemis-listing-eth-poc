import  {ethers,  BigNumber } from "ethers";
import { useState } from "react";

const Cancel = ({contract, walletAddress}) => {
  const [cancelTokenId, updateCancelTokenId] = useState(0);
  const [cancelTokenAddress, updateCancelTokenAddress] = useState("");
  // const [cancelSellerAddress, updateCancelSellerAddress] = useState(walletAddress);
  // const [cancelPrice, updateCancelPrice] = useState(0);

  const handleCancelTokenIdChange = (event) => {
    updateCancelTokenId(event.target.value);
  };
  const handleCancelTokenAddressChange = (event) => {
    updateCancelTokenAddress(event.target.value);
  };
  // const handleCancelSellerAddressChange = (event) => {
  //   updateCancelSellerAddress(event.target.value);
  // };
  // const handleCancelPriceChange = (event) => {
  //   updateCancelPrice(event.target.value);
  // };
  // console.log('address1: ',walletAddress)
  // console.log('address2: ',cancelSellerAddress)
  const handleCancelSubmit = async (event) => {
    // alert('An essay was submitted: ' + this.state.value);
    // event.preventDefault();
    // console.log("Cancel submitted!");
    const tokenId = BigNumber.from(cancelTokenId);
    const listingKey = ethers.utils.AbiCoder.prototype.encode(['uint256', 'address', 'address'], [tokenId, cancelTokenAddress, walletAddress])
    // const tx = await contract.functions.cancelListing(listingKey, {gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 100000});
    const tx = await contract.functions.cancelListing(listingKey);
    const receipt = await tx.wait();
    // console.log("receipt", receipt);
  };

  return (
    <div className="form-container">
      <h1>Cancelling</h1>
      {/* <form onSubmit={handleCancelSubmit} className="form"> */}
      <div className="form">
        <label>
          <strong>TokenID:</strong>
          {/* {cancelTokenId} */}
        </label>
        <textarea
          value={cancelTokenId}
          onChange={handleCancelTokenIdChange}
          className="input-box"
        />
        <label>
          <strong>
          Token Address:
          </strong>
        {/* {cancelTokenAddress} */}
        </label>
        <textarea
          value={cancelTokenAddress}
          onChange={handleCancelTokenAddressChange}
          className="input-box"
        />
        {/* <label>
          <strong>Seller Address:</strong>
          {cancelSellerAddress}
        </label>
        <textarea
          value={cancelSellerAddress}
          onChange={handleCancelSellerAddressChange}
          className="input-box"
        /> */}
        {/* <label>
          <strong>Price:</strong>
          {cancelPrice}
        </label> */}
        {/* <textarea
          value={cancelPrice}
          onChange={handleCancelPriceChange}
          className="input-box"
        /> */}
        <div>
        <button onClick={handleCancelSubmit} value="Cancel" className="btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
