import Link from 'next/link';
import { useState } from 'react'
import { ethers } from 'ethers'

const Navbar = () => {
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
    <nav className='' style={{backgroundColor:''}}>
      <div className="logo">
        <h1>AMHO</h1>
      </div>
      <Link href="/"><a>Dashboard</a></Link>
      <Link href="/market"><a>Marketplace</a></Link>
      <Link href="/lit"><a>Testing</a></Link>
      <Link href="/user"><a>Connect</a></Link>
         <button onClick={login} style={{backgroundColor:"red", color:"whitesmoke", padding: 10}}>Connect</button>
   
    </nav>
);
}
 
export default Navbar;