import Layout from '../components/Layout'
import { useState } from 'react'
import "../styles/index.css"


function MyApp({ Component, pageProps }) {
  
  const [walletAddress, setWalletAddress] = useState();

  return (
    <Layout walletAddress = {walletAddress}>
      <Component walletAddress = {walletAddress} setWalletAddress={setWalletAddress}{...pageProps} />
    </Layout>
  )
}

export default MyApp