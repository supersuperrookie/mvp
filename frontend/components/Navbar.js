import Link from 'next/link';
import { useState } from 'react'
import { ethers } from 'ethers'

const Navbar = ({walletAddress}) => {
  
  return (
    <nav className='' style={{backgroundColor:''}}>
      <div className="logo">
        <h1>AMHO</h1>
      </div>
      <Link href="/"><a>COLLECTIONS</a></Link>
      <Link href="/market"><a>E-SHOP</a></Link>
      <Link href="/"><a>{walletAddress && walletAddress.substring(0,8) + "..." + walletAddress.substring(34,42)}</a></Link>
   
    </nav>
);
}
 
export default Navbar;