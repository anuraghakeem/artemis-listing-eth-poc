import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Listing = () => {
  const [listingTokenId, updateListingTokenId] = useState(0);
  const [listingTokenAddress, updateListingTokenAddress] = useState("");
  const [listingPrice, updateListingPrice] = useState(0);

  const [buyingTokenId, updateBuyingTokenId] = useState(0);
  const [buyingTokenAddress, updateBuyingTokenAddress] = useState("");
  const [buyingSellerAddress, updateBuyingSellerAddress] = useState("");
  const [buyingPrice, updatebuyingPrice] = useState(0);


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
    <div className="listing-container">
      {/* <Tabs>
        <TabList>
          <Tab>List NFT for Sale</Tab>
          <Tab>Buy NFT</Tab>
        </TabList> */}

        {/* <TabPanel> */}
          <form onSubmit={handleListingSubmit}>
            <label>
              TokenID: {listingTokenId}
              <textarea value={listingTokenId} onChange={handleListingTokenIdChange} />
            </label>
            <label>
              Token Address: {listingTokenAddress}
              <textarea
                value={listingTokenAddress}
                onChange={handleListingTokenAddressChange}
              />
            </label>
            <label>
              Price: {listingPrice}
              <textarea value={listingPrice} onChange={handleListingPriceChange} />
            </label>
            <input type="submit" value="List" />
          </form>
        {/* </TabPanel> */}
        {/* <TabPanel> */}
          <form onSubmit={handleBuyingSubmit}>
            <label>
              TokenID: {buyingTokenId}
              <textarea value={buyingTokenId} onChange={handleBuyingTokenIdChange} />
            </label>
            <label>
              Token Address: {buyingTokenAddress}
              <textarea
                value={buyingTokenAddress}
                onChange={handleBuyingTokenAddressChange}
              />
            </label>
            <label>
              Seller Address: {buyingSellerAddress}
              <textarea
                value={buyingSellerAddress}
                onChange={handleBuyingSellerAddressChange}
              />
            </label>
            <label>
              Price: {buyingPrice}
              <textarea value={buyingPrice} onChange={handleBuyingPriceChange} />
            </label>
            <input type="submit" value="Buy" />
          </form>
        {/* </TabPanel> */}
      {/* </Tabs> */}
    </div>
  );
};

export default Listing;
