import  {ethers,  BigNumber } from "ethers";
import { useState } from "react";

const Cancel = ({contract, walletAddress}) => {
  const [cancelTokenId, updateCancelTokenId] = useState(0);
  const [cancelTokenAddress, updateCancelTokenAddress] = useState("");

  const handleCancelTokenIdChange = (event) => {
    updateCancelTokenId(event.target.value);
  };
  const handleCancelTokenAddressChange = (event) => {
    updateCancelTokenAddress(event.target.value);
  };
  const handleCancelSubmit = async (event) => {
    const tokenId = BigNumber.from(cancelTokenId);
    const listingKey = ethers.utils.AbiCoder.prototype.encode(['uint256', 'address', 'address'], [tokenId, cancelTokenAddress, walletAddress])
    const tx = await contract.functions.cancelListing(listingKey);
    const receipt = await tx.wait();
  };

  return (
    <div className="form-container">
      <h1>Cancelling</h1>
      <div className="form">
        <label>
          <strong>TokenID:</strong>
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
        </label>
        <textarea
          value={cancelTokenAddress}
          onChange={handleCancelTokenAddressChange}
          className="input-box"
        />
        <div>
        <button onClick={handleCancelSubmit} value="Cancel" className="btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
