import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { ethers } from 'ethers'

export default function Home() {
  const [loginState, setLoginState] = useState();

  const login = async () => {
      setLoginState("Connecting to your wallet..." )
    if(!window.ethereum) {
      setLoginState("No Metamask wallet... please install");
      return;
    }
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);  
  const signer = provider.getSigner();
  const walletAddr = await signer.getAddress();
  console.log(`walletAdr`, walletAddr)  
  const signature = await signer.signMessage("Welcome to AMHO");
  console.log(`signature`, signature)
}
  
  return (
    <div>
   <p>{loginState}</p>
    </div>
  )
}
