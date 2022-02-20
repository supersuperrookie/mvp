import Layout from '../components/Layout'
import { useState } from 'react'
import "../styles/index.css"


function MyApp({ Component, pageProps }) {
  
  const [walletAddress, setWalletAddress] = useState();

  return (
    // <CeramicProvider network={Networks.TESTNET_CLAY} connect={connect}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    // </CeramicProvider>
  );
}

export default MyApp;
