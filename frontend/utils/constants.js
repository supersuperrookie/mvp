import { nftAddress as CONTRACT_ADDRESS } from "../config";


// prettier-ignore
export const Status = [
  "NEW",             // 0
  "PENDING_INIT",    // 1
  "PENDING_TETHER",  // 2
  "TETHERED",        // 3
  "UNTETHERED",      // 4
];

const BUYER_ADDRESS = "0x5B4849c0A5BE7C11dc141352e6093E4b2Baa3A8E"
const SELLER_ADDRESS = "0xe44dbD837aA41F2814CDAc1ff03Df962f1Eb7D30"

export const evmContractConditions = [
  {
    contractAddress: CONTRACT_ADDRESS,
    functionName: "getCurrentOwner",
    functionParams: ["0"],
    functionAbi: {
      inputs: [
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256"
        }
      ],
      name: "getCurrentOwner",
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
    chain: "mumbai",
    returnValueTest: {
      key: "",
      comparator: "=",
      value: ":userAddress",
    },
  },
  { operator: "or" },
  {
    contractAddress: CONTRACT_ADDRESS,
    functionName: "getNextOwner",
    functionParams: ["0"],
    functionAbi: {
      inputs: [
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256"
        }
      ],
      name: "getNextOwner",
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
    chain: "mumbai",
    returnValueTest: {
      key: "",
      comparator: "=",
      value: ":userAddress",
    },
  },
];
