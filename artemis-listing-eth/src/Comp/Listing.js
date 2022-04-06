import { BigNumber, ethers } from "ethers";
import { useState } from "react";

import nftApprovalAbi from '../json/nftApprovalAbi.json'
import configJSON from '../json/config.json'

const Listing = ({contract, walletAddress}) => {
  const [listingTokenId, updateListingTokenId] = useState(0);
  const [listingTokenAddress, updateListingTokenAddress] = useState("");
  const [listingPrice, updateListingPrice] = useState('0.001');
  // const [nftApprovalContract, updateNFTApprovalContract ] = useState(null)

  const operatorAddress = configJSON.contract

  const handleListingTokenIdChange = (event) => {
    updateListingTokenId(event.target.value);
  };
  const handleListingTokenAddressChange = (event) => {
    updateListingTokenAddress(event.target.value);
  };
  const handleListingPriceChange = (event) => {
    // const weiBigNumber = ethers.utils.parseEther(event.target.value);
    // const wei = weiBigNumber.toString();
    // updateListingPrice(wei);
    updateListingPrice(event.target.value);
  };

  const handleListingSubmit = async (event) => {
    // alert('An essay was submitted: ' + this.state.value);
    // event.preventDefault();
    // console.log("listing submitted for contract:", contract );
    const tokenId = BigNumber.from(listingTokenId);
    const weiBigNumber = ethers.utils.parseEther(listingPrice);
    const wei = weiBigNumber.toString();
    // console.log('wei value: ',wei);
    const price = BigNumber.from(wei);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const nftApprovalContract1 = new ethers.Contract(listingTokenAddress, nftApprovalAbi, provider.getSigner())

    // updateNFTApprovalContract(nftApprovalContract1)
    
    const isApproved = await nftApprovalContract1.functions.isApprovedForAll(walletAddress,operatorAddress);

    // console.log('isApproved?: ', isApproved)

    if(isApproved.length>0 && isApproved[0] != true) {
      alert('Need to Approve Contract. Enter the token address and click Approve contract')
    }

    else if(isApproved.length>0 && isApproved[0] == true){
      const tx = await contract.functions.listTokenForETH(tokenId, listingTokenAddress, price)
      const receipt = await tx.wait();
	    // console.log("receipt", receipt);
    }
  };

  const handleContractApproval = async () =>{
    // console.log('Contract approval action fired!')

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const nftApprovalContract1 = new ethers.Contract(listingTokenAddress, nftApprovalAbi, provider.getSigner())

    const tx = await nftApprovalContract1.functions.setApprovalForAll(operatorAddress,true);

	  const receipt = await tx.wait();
	  // console.log("receipt", receipt);

  }

  return (
    <div className="form-container">
      <h1>Listing</h1>
          <div className='form'>
            <label>
              <strong>TokenID:</strong> 
              {/* {listingTokenId} */}
            </label>
              <textarea value={listingTokenId} onChange={handleListingTokenIdChange} className='input-box'/>
            <label>
              <strong>Token Address:</strong> 
              {/* {listingTokenAddress} */}
              </label>
              <textarea
                value={listingTokenAddress}
                onChange={handleListingTokenAddressChange}
                className='input-box'
              />
            <label>
              <strong>Price in $MATIC: </strong> {listingPrice}
              {/* {listingPrice} */}
            </label>
              <textarea value={listingPrice} onChange={handleListingPriceChange} className='input-box' />
              </div>
              <div>
            {/* <input type="submit" value="List" className='btn' /> */}
            <button onClick={handleListingSubmit}>List</button>
            <button onClick={handleContractApproval}>Approve Contract</button>
          </div>
    </div>
  );
};

export default Listing;
