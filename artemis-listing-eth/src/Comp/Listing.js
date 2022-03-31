import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Listing = () => {
    
    const [tokenId, updateTokenId] = useState(0)
    const [tokenAddress, updateTokenAddress] = useState('')
    const [price, updatePrice] = useState(0)

    const handleTokenIdChange = (event) =>{
        // this.setState({value: event.target.value});
        updateTokenId(event.target.value)
      }
    const handleTokenAddressChange = (event) =>{
        updateTokenAddress(event.target.value)
      }
    const handlePriceChange = (event) =>{
        updatePrice(event.target.value)
      }
    
    const handleListingSubmit = (event) => {
        // alert('An essay was submitted: ' + this.state.value);
        console.log('submit!')
        event.preventDefault();
      }
  return (
    <div className="listing-container">
      <Tabs>
        <TabList>
          <Tab>List NFT for Sale</Tab>
          <Tab>Buy NFT</Tab>
        </TabList>

        <TabPanel>
        <form onSubmit={handleListingSubmit}>
        <label>
          TokenID: {tokenId}
          <textarea value={tokenId} onChange={handleTokenIdChange} />
        </label>
        <label>
          Toekn Address: {tokenAddress}
          <textarea value={tokenAddress} onChange={handleTokenAddressChange} />
        </label>
        <label>
          Price: {price}
          <textarea value={price} onChange={handlePriceChange} />
        </label>
        <input type="submit" value="List" />
      </form>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Listing;
