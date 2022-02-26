import Link from 'next/link';
import Profile from './Profile';
const Navbar = ({walletAddress}) => {
  return (
<>
      <nav className='flex flex-wrap items-center p-3 bg-white'>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '> 
            <span className='text-xl font-bold tracking-wide text-black uppercase'>
              AMHO
            </span>
          </a>
        </Link>
        <button className='inline-flex p-3 ml-auto text-white rounded outline-none hover:bg-white-600 lg:hidden hover:text-white'>
        </button>
        <div className='hidden w-full lg:inline-flex lg:flex-grow lg:w-auto'>
          <div className='flex flex-col items-start w-full lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:items-center lg:h-auto'>
            <Link href='/'>
              <a className='items-center justify-center w-full px-3 py-2 font-bold text-black rounded lg:inline-flex lg:w-auto hover:underline decoration-4'>
                COLLECTIONS
              </a>
            </Link>
            <Link href='/market'>
              <a className='items-center justify-center w-full px-3 py-2 font-bold text-black rounded lg:inline-flex lg:w-auto hover:underline decoration-4'>
                E-SHOP
              </a>
            </Link>
            <Link href='/lit'>
              <a className='items-center justify-center w-full px-3 py-2 font-bold text-black rounded lg:inline-flex lg:w-auto hover:underline decoration-4'>
                LIT
              </a>
            </Link>
            <Profile/>
          </div>
        </div>
      </nav>
    </>

);
}
 
export default Navbar;