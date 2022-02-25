import { useState } from "react";
let litCeramicIntegration;
import('lit-ceramic-sdk').then((mod) => {
  if(typeof window !== 'undefined' || typeof document !== 'undefined') {
    litCeramicIntegration = new mod.Integration(
      "https://ceramic-clay.3boxlabs.com",
      "mumbai"
    );
    litCeramicIntegration.startLitClient(window);
  }
})
// import { Integration } from "lit-ceramic-sdk";
const CONTRACT_ADDRESS = "0x20F7bCABE76351984CaE70ce46CcC7F65410C485";
const BUYER_ADDRESS = "0x31458c55Fc0f1666c1B2e72a12F1530e853868Ce"; //0x5fb827c257E68082d55A6ff5AB3a8be76C20BB5C
const SELLER_ADDRESS = "0x3D191C3949F805D49bc384abEf62336F7b7DF8E9"; 
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
      value: BUYER_ADDRESS,
    },
  },
  {"operator": "or"},
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
      value: SELLER_ADDRESS,
    },
  }
];

const Lit = () => {
  // if(typeof window !== 'undefined' || typeof document !== 'undefined') {
  //   const litCeramicIntegration = new Integration(
  //     "https://ceramic-clay.3boxlabs.com",
  //     "mumbai"
  //   );
  //   litCeramicIntegration.startLitClient(window);
  // }
  const [did, setDid] = useState("");
  const [streamId, setStreamId] = useState("");
  const [secret, setSecret] = useState("secret");
  const [decryptedSecret, setDecryptedSecret] = useState("");
  const [progress, setProgress] = useState(false);

  const encryptSecret = async () => {
    const response = await litCeramicIntegration 
      .encryptAndWrite("secret", evmContractConditions, 'evmContractConditions')
      .then((result) => {
        setStreamId(result);
        alert(`Result: ${result}`);
      });
  };

  const handleInput = (e) => {
    e.preventDefault();
    setStreamId(e.target.value);
  }
  const decryptSecret = async () => {
    const response = await litCeramicIntegration
      .readAndDecrypt(streamId)
      .then((decryptedText) => {
        setDecryptedSecret(decryptedText);
        alert(decryptedText);
      });
  };

  const renderButton = () => {
    if (progress) {
      return (
        <>
          <button disabled={true}>Connecting...</button>
        </>
      );
    } else {
      return (
        <>
          {/* <button onClick={handleLogin}>Sign In</button> */}
          <button onClick={encryptSecret}>Encrypt Secret</button>
          <button onClick={decryptSecret}>Decrypt</button>
          <input type="text" value={streamId} onChange={handleInput}/>
        </>
      );
    }
  };

  if (did) {
    return (
      <>
        <p>
          Your DID: <code>{did}</code>
        </p>
        <p>
          Secret: <p>{decryptedSecret}</p>
          <button onClick={encryptSecret}>Encrypt Secret</button>
          <button onClick={decryptSecret}>Decrypt</button>
        </p>
      </>
    );
  } else {
    return renderButton();
  }
};
export default Lit