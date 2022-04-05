import { BigNumber, ethers } from "ethers";
import { useState } from "react";

const Listing = ({contract}) => {
  const [listingTokenId, updateListingTokenId] = useState(0);
  const [listingTokenAddress, updateListingTokenAddress] = useState("");
  const [listingPrice, updateListingPrice] = useState('0.001');

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
    event.preventDefault();
    console.log("listing submitted for contract:", contract );
    const tokenId = BigNumber.from(listingTokenId);
    const weiBigNumber = ethers.utils.parseEther(listingPrice);
    const wei = weiBigNumber.toString();
    // console.log('wei value: ',wei);
    const price = BigNumber.from(wei);
    const tx = await contract.functions.listTokenForETH(tokenId, listingTokenAddress, price)
    // const tx = await contract.functions.listTokenForETH(BigNumber.from('15696979380589530268753251904588942079151696547717372651434342150111160696833'), '0x2953399124F0cBB46d2CbACD8A89cF0599974963', BigNumber.from('1000000000000000'))
    // const tx = await contract.functions.listTokenForETH(BigNumber.from('15696979380589530268753251904588942079151696547717372651434342150111160696833'), '0x2953399124F0cBB46d2CbACD8A89cF0599974963', BigNumber.from('1000000000000000'),{gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 1000000})
    const receipt = await tx.wait();
	  console.log("receipt", receipt);
    updateListingTokenId(0);
    updateListingTokenAddress('')
    updateListingPrice(0)
  };

  return (
    <div className="form-container">
      <h1>Listing</h1>
          <form onSubmit={handleListingSubmit} className='form'>
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
            <input type="submit" value="List" className='btn' />
          </form>
    </div>
  );
};

export default Listing;
