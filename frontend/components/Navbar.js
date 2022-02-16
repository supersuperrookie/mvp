import Link from 'next/link';
import { useState } from 'react'
import { ethers } from 'ethers'

const Navbar = () => {
  
  return (
    <nav className='' style={{backgroundColor:''}}>
      <div className="logo">
        <h1>AMHO</h1>
      </div>
      <Link href="/"><a>Collections</a></Link>
      <Link href="/market"><a>Eshop</a></Link>
      <Link href="/user"><a>Buyer Guy</a></Link>
   
    </nav>
);
}
 
export default Navbar;