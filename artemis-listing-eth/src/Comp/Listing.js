import { BigNumber, ethers } from "ethers";
import { useState } from "react";

import nftApprovalAbi from '../json/nftApprovalAbi.json'
import configJSON from '../json/config.json'

const Listing = ({contract, walletAddress}) => {
  const [listingTokenId, updateListingTokenId] = useState(0);
  const [listingTokenAddress, updateListingTokenAddress] = useState("");
  const [listingPrice, updateListingPrice] = useState('0.001');

  const operatorAddress = configJSON.contract

  const handleListingTokenIdChange = (event) => {
    updateListingTokenId(event.target.value);
  };
  const handleListingTokenAddressChange = (event) => {
    updateListingTokenAddress(event.target.value);
  };
  const handleListingPriceChange = (event) => {
    updateListingPrice(event.target.value);
  };

  const handleListingSubmit = async (event) => {
   
    const tokenId = BigNumber.from(listingTokenId);
    const weiBigNumber = ethers.utils.parseEther(listingPrice);
    const wei = weiBigNumber.toString();
    const price = BigNumber.from(wei);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const nftApprovalContract1 = new ethers.Contract(listingTokenAddress, nftApprovalAbi, provider.getSigner())

    
    const isApproved = await nftApprovalContract1.functions.isApprovedForAll(walletAddress,operatorAddress);


    if(isApproved.length>0 && isApproved[0] != true) {
      alert('Need to Approve Contract. Enter the token address and click Approve contract')
    }

    else if(isApproved.length>0 && isApproved[0] == true){
      const tx = await contract.functions.listTokenForETH(tokenId, listingTokenAddress, price)
      const receipt = await tx.wait();
    }
  };

  const handleContractApproval = async () =>{

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const nftApprovalContract1 = new ethers.Contract(listingTokenAddress, nftApprovalAbi, provider.getSigner())

    const tx = await nftApprovalContract1.functions.setApprovalForAll(operatorAddress,true);

	  const receipt = await tx.wait();

  }

  return (
    <div className="form-container">
      <h1>Listing</h1>
          <div className='form'>
            <label>
              <strong>TokenID:</strong> 
            </label>
              <textarea value={listingTokenId} onChange={handleListingTokenIdChange} className='input-box'/>
            <label>
              <strong>Token Address:</strong> 
              </label>
              <textarea
                value={listingTokenAddress}
                onChange={handleListingTokenAddressChange}
                className='input-box'
              />
            <label>
              <strong>Price in $MATIC: </strong> {listingPrice}
            </label>
              <textarea value={listingPrice} onChange={handleListingPriceChange} className='input-box' />
              </div>
              <div>
            <button onClick={handleListingSubmit}>List</button>
            <button onClick={handleContractApproval}>Approve Contract</button>
          </div>
    </div>
  );
};

export default Listing;
