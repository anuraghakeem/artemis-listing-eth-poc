import navLogo from "../Img/navLogo.png";
const Nav = ({ walletAddress, connectWallet }) => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <img src={navLogo} className="artemis-logo" />
      </div>
      <div className="wallet-details">
        {!walletAddress && walletAddress.length == 0 ? (
          <button onClick={connectWallet} className='btn-connect-wallet'>Connect Wallet</button>
        ):
        <h3>Address: {walletAddress}</h3>
        }
      </div>
    </div>
  );
};

export default Nav;
