import { useEffect, useState, useRef } from "react";
import { useGlobal } from "../utils/global-state";
import withLit from "../utils/withLit";
import { toString, fromString } from "uint8arrays";
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("react-qr-reader"));

// let litCeramicIntegration;
// import('lit-ceramic-sdk').then((mod) => {
//   if(typeof window !== 'undefined' || typeof document !== 'undefined') {
//     litCeramicIntegration = new mod.Integration(
//       "https://ceramic-clay.3boxlabs.com",
//       "mumbai"
//     );
//     litCeramicIntegration.startLitClient(window);
//   }
// })
import { Integration } from "lit-ceramic-sdk";
const CONTRACT_ADDRESS = "0xB54341db961E3849b0a950AB41c9e1C4C71FE216";
// const BUYER_ADDRESS = "0xCf65E1e8343465fef356a831e5F716BcAcf045Bfasdasd";
// const SELLER_ADDRESS = "0xbde1403056C81138fA8Abe97Ca19F39900073473";

const evmContractConditions = [
  {
    contractAddress: CONTRACT_ADDRESS,
    functionName: "getBuyer",
    functionParams: [],
    functionAbi: {
      inputs: [],
      name: "getBuyer",
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
      value: "0xCf65E1e8343465fef356a831e5F716BcAcf045Bfasdasd",
    },
  },
  { operator: "or" },
  {
    contractAddress: CONTRACT_ADDRESS,
    functionName: "getSeller",
    functionParams: [],
    functionAbi: {
      inputs: [],
      name: "getSeller",
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
      value: "0xbde1403056C81138fA8Abe97Ca19F39900073473",
    },
  },
];
const Lit = ({ litCeramicIntegration }) => {
  if (typeof window !== "undefined" || typeof document !== "undefined") {
    const litCeramicIntegration = new Integration(
      "https://ceramic-clay.3boxlabs.com",
      "mumbai"
    );
    litCeramicIntegration.startLitClient(window);
  }
  const [globalState, globalActions] = useGlobal();
  const [did, setDid] = useState("");
  const [streamId, setStreamId] = useState("");
  const [decryptedSecret, setDecryptedSecret] = useState("");
  const [lit, setLit] = useState(undefined);
  const [data, setData] = useState("No result");

  useEffect(() => {
    setLit(litCeramicIntegration);
  }, [setLit]);

  const encryptSecret = async () => {
    const response = await litCeramicIntegration
      .encryptAndWrite("secret", evmContractConditions, "evmContractConditions")
      .then((result) => {
        setStreamId(result);
      });
  };

  const handleScan = (qrData) => {
    console.log(qrData);
  }

  const handleInput = (e) => {
    e.preventDefault();
    setStreamId(e.target.value);
  };
  const decryptSecret = async () => {
    const response = await litCeramicIntegration
      .readAndDecrypt(streamId)
      .then((decryptedText) => {
        setDecryptedSecret(decryptedText);
        alert(decryptedText);
      });
  };

  return (
    <>
      {/* <button onClick={handleLogin}>Sign In</button> */}
      <button onClick={encryptSecret}>Encrypt Secret</button>
      <button onClick={decryptSecret}>Decrypt</button>
      <input type="text" value={streamId} onChange={handleInput} />
      </>
  );
};

export default withLit(Lit);
