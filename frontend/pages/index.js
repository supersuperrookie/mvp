import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { ethers } from 'ethers'
import user from './user'


export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);

  const login = async () => {
     if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0])
      }
}
  
  return (
    <div>
      <button onClick={login} style={{backgroundColor:"red", color:"whitesmoke", padding: 10 }}>Connect</button>
      <p>Your wallet address {walletAddress}</p>
      <user />
    </div>
  )
}
