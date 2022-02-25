import Link from 'next/link';
import { useState } from 'react'
import { ethers } from 'ethers'
const Navbar = ({walletAddress}) => {
  return (
<>
      <nav className='flex flex-wrap items-center p-3 bg-blue-600 '>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '> 
            <span className='text-xl font-bold tracking-wide text-white uppercase'>
              AMHO
            </span>
          </a>
        </Link>
        <button className='inline-flex p-3 ml-auto text-white rounded outline-none hover:bg-blue-600 lg:hidden hover:text-white'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        <div className='hidden w-full lg:inline-flex lg:flex-grow lg:w-auto'>
          <div className='flex flex-col items-start w-full lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:items-center lg:h-auto'>
            <Link href='/'>
              <a className='items-center justify-center w-full px-3 py-2 font-bold text-white rounded lg:inline-flex lg:w-auto hover:bg-blue-400 hover:text-white '>
                COLLECTIONS
              </a>
            </Link>
            <Link href='/lit'>
              <a className='items-center justify-center w-full px-3 py-2 font-bold text-white rounded lg:inline-flex lg:w-auto hover:bg-blue-400 hover:text-white '>
                LIT
              </a>
            </Link>
            
            <Link href='/market'>
              <a className='items-center justify-center w-full px-3 py-2 font-bold text-white rounded lg:inline-flex lg:w-auto hover:bg-blue-400 hover:text-white'>
                E-SHOP
              </a>
            </Link>
            <Link href="/"><a>{walletAddress && walletAddress.substring(0,8) + "..." + walletAddress.substring(34,42)}</a></Link>
          </div>
        </div>
      </nav>
    </>

);
}
 
export default Navbar;