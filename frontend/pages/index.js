import Head from 'next/head'
import Image from 'next/image'
import User from '../components/User'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { ethers } from 'ethers'



export default function Home({setWalletAddress, walletAddress}) {
  //const [walletAddress, setWalletAddress] = useState();

  const login = async () => {
     if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0])
      }
}
  
  return (
    <div>
    <center>
      {!walletAddress ? <button onClick={login}  style={{backgroundColor: "red", padding: 20, color: "white"}} >Connect to METAMASK</button> :
      <div>
         <User /> 
      <p>ITEMS OWNED</p>
      </div>}
      
     
      </center>
    </div>
  )
}
