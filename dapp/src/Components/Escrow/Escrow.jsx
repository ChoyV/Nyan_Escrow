import styles from "./Escrow.module.scss";
import { ethers } from "ethers";

export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  account,
  signer,
}) {
  const escrowABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_arbiter",
          type: "address",
        },
        {
          internalType: "address",
          name: "_beneficiary",
          type: "address",
        },
      ],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "Approved",
      type: "event",
    },
    {
      inputs: [],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "arbiter",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "beneficiary",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "depositor",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "isApproved",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const escrowContract = new ethers.Contract(address, escrowABI, signer);

  const approve = async () => {
    const approveTxn = await escrowContract.connect(signer).approve();
    await approveTxn.wait();
  };

  const handleApprove = async () => {
    escrowContract.on("Approved", () => {
      document.getElementById(escrowContract.address).className =
        "bg-green-300 rounded-lg  font-semibold";
      document.getElementById(escrowContract.address).innerText =
        "✓ It's been approved!";
      document.getElementById(escrowContract.address).onClick = null;
    });

    await approve();
  };

  return (
    <div className="border-b-4 border-blue-800">
      <ul>
        <li>
          <div className={styles.arbiter}> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div className={styles.beneficiary}> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div className={styles.value}> Value </div>
          <div> {parseInt(ethers.utils.formatEther(value).toString())} ETH </div>
        </li>
        <div className="flex justify-center">
          {account === arbiter ? (
            <div className="bg-red-300 font-medium">You are not arbiter!</div>
          ) : (
            <div className={styles.button} id={address} onClick={handleApprove}>
              Approve
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}
