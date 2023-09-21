import { ethers } from 'ethers';
import Escrow from '../../smart_contracts/artifacts/contracts/Escrow.sol/Escrow.json';

export default async function deploy(signer, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  return factory.deploy(arbiter, beneficiary, { value });
}