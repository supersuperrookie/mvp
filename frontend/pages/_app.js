import Layout from '../components/Layout'
import '../styles/globals.css'
import { useState } from 'react'


function MyApp({ Component, pageProps }) {
  
  const [walletAddress, setWalletAddress] = useState();

  return (
    <Layout walletAddress = {walletAddress}>
      <Component walletAddress = {walletAddress} setWalletAddress={setWalletAddress}{...pageProps} />
    </Layout>
  )
}

export default MyApp