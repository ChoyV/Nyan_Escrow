import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Burger from "./Components/Burger_menu/Burger";

import cat from "./assets/cat.gif";
import styles from "../src/app.module.scss";
import deploy from "./deploy";
import Escrow from "./Components/Escrow/Escrow";

// Initialize a Web3 provider using ethers.js
const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  // Define state variables using React's useState hook
  const [escrows, setEscrows] = useState([]); // To store escrow contract data
  const [account, setAccount] = useState(); // To store the connected Ethereum account
  const [signer, setSigner] = useState(); // To store the Ethereum signer
  const [isLocalStorageEmpty, setEmpty] = useState(true); // To track if localStorage is empty

  // useEffect to connect to MetaMask and set the account and signer
  useEffect(() => {
    async function checkMM() {
      try {
        // Request Ethereum accounts from MetaMask
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]); // Set the connected Ethereum account
          setSigner(provider.getSigner()); // Set the Ethereum signer
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    }
    checkMM();
  }, [account]); // Re-run this effect when the account changes

  // Function to handle connecting the wallet
  const handleConnect = async () => {
    try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setAccount(accounts[0]); // Update the account state when the user connects
        setSigner(provider.getSigner());
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Function to render Escrow components based on localStorage data
  function renderEscrow() {
    const signerCurrent = signer;
    const escrowArray = [];
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      const localStorageItem = localStorage.getItem(key);
      if (localStorageItem) {
        const escrowData = JSON.parse(localStorageItem);
        if (escrowData.account === account) {
          escrowArray.push(
            <Escrow
              key={key}
              address={escrowData.address}
              arbiter={escrowData.arbiter}
              beneficiary={escrowData.beneficiary}
              value={escrowData.value}
              account={escrowData.account}
              signer={signerCurrent}
            />
          );
        }
      }
    });
    return escrowArray;
  }

  // Function to create a new escrow contract
  async function newContract() {
    const beneficiary = document.getElementById("beneficiary").value;
    const arbiter = document.getElementById("arbiter").value;
    const value = ethers.BigNumber.from(ethers.utils.parseEther(document.getElementById("wei").value));
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);
    try {
      const deployedTX = escrowContract.deployTransaction;
      const TXhash = await deployedTX.wait();
      if (TXhash.contractAddress) {
        console.log(
          "Contract successfully deployed at address:",
          TXhash.contractAddress
        );
        // You can set state or perform other actions here
      } else {
        console.error(
          "Contract deployment failed. No contract address found in transaction receipt."
        );
      }
    } catch (error) {
      console.error("Error deploying contract:", error);
      return;
    }

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      account: account,
    };

    setEscrows([...escrows, escrow]);
    localStorage.setItem(
      JSON.stringify(escrow.address),
      JSON.stringify(escrow)
    );
    setEmpty(true);
  }

  // Return the JSX for the component
  return (
    <>
      <div className={styles.back}>
        <div onClick={handleConnect} className={styles.connect}>
          {account == null
            ? "CONNECT WALLET"
            : `${account.substring(0, 8)}...${account.slice(-4)}`}
        </div>

        <Burger />

        <div className={styles.container}>
          <div className={styles.newContract}>
            <h1 className="text-center font-extrabold"> New Contract </h1>
            <label
              className={`${styles.label} border-t-2 border-cyan-600 pt-3`}
            >
              Arbiter Address
              <input
                type="text"
                id="arbiter"
                placeholder="0x..."
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Beneficiary Address
              <input
                type="text"
                id="beneficiary"
                placeholder="0x..."
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Deposit Amount (in Wei)
              <input
                type="text"
                id="wei"
                placeholder="ETH"
                className={styles.input}
              />
            </label>
            <div
              className={styles.createButton}
              id="deploy"
              onClick={(e) => {
                e.preventDefault();
                newContract();
              }}
            >
              Create
            </div>
          </div>
          <img src={cat} className={styles.cat} />
          <div className={styles.deployedContractsContainer}>
            <div className={styles.deployedContracts}>Deployed Contracts</div>
            <div id="container">
              {!isLocalStorageEmpty ? (
                // Render this message if localStorage is empty
                <p>LocalStorage is empty.</p>
              ) : (
                // Render the Escrow components if localStorage is not empty
                renderEscrow()
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
