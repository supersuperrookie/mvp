import Layout from "../components/Layout";
import "../styles/globals.css";
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { CeramicProvider, Networks } from "use-ceramic";
import Web3Modal from 'web3modal';
import Web3 from 'web3';

const connect = async () => {
const web3Modal = new Web3Modal({
    network: "mumbai",
    cacheProvider: false,
  });
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  return new EthereumAuthProvider(provider, accounts[0]);
}

function MyApp({ Component, pageProps }) {
  return (
    <CeramicProvider network={Networks.TESTNET_CLAY} connect={connect}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CeramicProvider>
  );
}

export default MyApp;
