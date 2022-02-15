import { useState } from "react";
import { useCeramic } from "use-ceramic";
import { Integration } from "lit-ceramic-sdk";
const ACL = [
  {
    contractAddress: "0x8fDc07B1886e35CAc8928f0aE91100B0e7beEbeA",
    standardContractType: "",
    chain: "ropsten",
    method: "getBuyer",
    parameters: [],
    returnValueTest: {
      comparator: "=",
      value: "0x5fb827c257E68082d55A6ff5AB3a8be76C20BB5C",
    },
  },
  { "operator": "or" },
  {
    contractAddress: "0x8fDc07B1886e35CAc8928f0aE91100B0e7beEbeA",
    standardContractType: "",
    chain: "ropsten",
    method: "getSeller",
    parameters: [],
    returnValueTest: {
      comparator: "=",
      value: "0xb82744C8365cE57f2d379b15974c60114b787190",
    },
  },
];

const Lit = () => {
  const litCeramicIntegration = new Integration("https://ceramic-clay.3boxlabs.com");
  litCeramicIntegration.startLitClient(window);
  const ceramic = useCeramic();
  const [did, setDid] = useState("");
  const [secret, setSecret] = useState("secret");
  const [decryptedSecret, setDecryptedSecret] = useState("");
  const [progress, setProgress] = useState(false);
  const [streamId, setStreamId] = useState("");

  const handleLogin = async () => {
    setProgress(true);
    try {
      const authProvider = await ceramic.connect();
      await ceramic.authenticate(authProvider);
      setDid(ceramic.did.id);
    } catch (e) {
      console.error(e);
    } finally {
      setProgress(false);
    }
  };

  const encryptSecret = () => {
    const response = litCeramicIntegration
      .encryptAndWrite('secret', ACL)
      .then((result) => {
        setStreamId(result)
        alert(`Result: ${result}`)
      });
  };

  const decryptSecret = () => {
    const response = litCeramicIntegration
      .readAndDecrypt(streamId)
      .then((decryptedText) => {
        setDecryptedSecret(decryptedText)
        console.log(decryptedText)
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
          <button onClick={handleLogin}>Sign In</button>
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
export default Lit;
