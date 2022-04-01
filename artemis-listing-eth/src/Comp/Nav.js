const Nav = ({walletAddress, connectWallet}) => {

  return (
    <div className="nav-container">
      <div>Artemis</div>
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
      <h3>Address: {walletAddress}</h3>
    </div>
  );
};

export default Nav;
