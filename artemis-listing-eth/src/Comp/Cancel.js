import { useState } from "react";

const Cancel = () => {
  const [cancelTokenId, updateCancelTokenId] = useState(0);
  const [cancelTokenAddress, updateCancelTokenAddress] = useState("");
  const [cancelSellerAddress, updateCancelSellerAddress] = useState("");
  const [cancelPrice, updateCancelPrice] = useState(0);

  const handleCancelTokenIdChange = (event) => {
    updateCancelTokenId(event.target.value);
  };
  const handleCancelTokenAddressChange = (event) => {
    updateCancelTokenAddress(event.target.value);
  };
  const handleCancelSellerAddressChange = (event) => {
    updateCancelSellerAddress(event.target.value);
  };
  const handleCancelPriceChange = (event) => {
    updateCancelPrice(event.target.value);
  };

  const handleCancelSubmit = (event) => {
    // alert('An essay was submitted: ' + this.state.value);
    console.log("Cancel submitted!");
    event.preventDefault();
  };

  return (
    <div className="form-container">
      <h1>Cancelling</h1>
      <form onSubmit={handleCancelSubmit} className="form">
        <label>
          <strong>TokenID:</strong>
          {cancelTokenId}
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
        {cancelTokenAddress}
        </label>
        <textarea
          value={cancelTokenAddress}
          onChange={handleCancelTokenAddressChange}
          className="input-box"
        />
        <label>
          <strong>Seller Address:</strong>
          {cancelSellerAddress}
        </label>
        <textarea
          value={cancelSellerAddress}
          onChange={handleCancelSellerAddressChange}
          className="input-box"
        />
        <label>
          <strong>Price:</strong>
          {cancelPrice}
        </label>
        <textarea
          value={cancelPrice}
          onChange={handleCancelPriceChange}
          className="input-box"
        />
        <input type="submit" value="Cancel" className="btn" />
      </form>
    </div>
  );
};

export default Cancel;
