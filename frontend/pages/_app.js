import Layout from '../components/Layout'
import { useState } from 'react'
import "../styles/index.css"
import withLit from '../utils/withLit';


function MyApp({ Component, pageProps }) {
  return (
    // <CeramicProvider network={Networks.TESTNET_CLAY} connect={connect}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    // </CeramicProvider>
  );
}

export default withLit(MyApp);
