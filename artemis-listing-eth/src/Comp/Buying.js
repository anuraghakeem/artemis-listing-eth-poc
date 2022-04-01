import { useState } from "react";

const Buying = () => {
  const [buyingTokenId, updateBuyingTokenId] = useState(0);
  const [buyingTokenAddress, updateBuyingTokenAddress] = useState("");
  const [buyingSellerAddress, updateBuyingSellerAddress] = useState("");
  const [buyingPrice, updatebuyingPrice] = useState(0);

  const handleBuyingTokenIdChange = (event) => {
    updateBuyingTokenId(event.target.value);
  };
  const handleBuyingTokenAddressChange = (event) => {
    updateBuyingTokenAddress(event.target.value);
  };
  const handleBuyingSellerAddressChange = (event) => {
    updateBuyingSellerAddress(event.target.value);
  };
  const handleBuyingPriceChange = (event) => {
    updatebuyingPrice(event.target.value);
  };

  const handleBuyingSubmit = (event) => {
    // alert('An essay was submitted: ' + this.state.value);
    console.log("buying submitted!");
    event.preventDefault();
  };

  return (
    <div className="form-container">
      <h1>Buying</h1>
      <form onSubmit={handleBuyingSubmit} className="form">
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
          <strong>
          Token Address:
          </strong>
        </label>
        {buyingTokenAddress}
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
        <label>
          <strong>Price:</strong>
          {buyingPrice}
        </label>
        <textarea
          value={buyingPrice}
          onChange={handleBuyingPriceChange}
          className="input-box"
        />
        <input type="submit" value="Buy" className="btn" />
      </form>
    </div>
  );
};

export default Buying;
