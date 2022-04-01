import { useState } from "react";

const Listing = () => {
  const [listingTokenId, updateListingTokenId] = useState(0);
  const [listingTokenAddress, updateListingTokenAddress] = useState("");
  const [listingPrice, updateListingPrice] = useState(0);

  const handleListingTokenIdChange = (event) => {
    updateListingTokenId(event.target.value);
  };
  const handleListingTokenAddressChange = (event) => {
    updateListingTokenAddress(event.target.value);
  };
  const handleListingPriceChange = (event) => {
    updateListingPrice(event.target.value);
  };

  const handleListingSubmit = (event) => {
    // alert('An essay was submitted: ' + this.state.value);
    console.log("listing submitted!");
    event.preventDefault();
  };

  return (
    <div className="form-container">
      <h1>Listing</h1>
          <form onSubmit={handleListingSubmit} className='form'>
            <label>
              <strong>TokenID:</strong> {listingTokenId}
            </label>
              <textarea value={listingTokenId} onChange={handleListingTokenIdChange} className='input-box'/>
            <label>
              <strong>Token Address:</strong> {listingTokenAddress}
              </label>
              <textarea
                value={listingTokenAddress}
                onChange={handleListingTokenAddressChange}
                className='input-box'
              />
            <label>
              <strong>Price:</strong> {listingPrice}
            </label>
              <textarea value={listingPrice} onChange={handleListingPriceChange} className='input-box' />
            <input type="submit" value="List" className='btn' />
          </form>
    </div>
  );
};

export default Listing;
