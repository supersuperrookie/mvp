import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='' style={{backgroundColor:''}}>
      <div className="logo">
        <h1>AMHO</h1>
      </div>
      <Link href="/"><a>Dashboard</a></Link>
      <Link href="/market"><a>Marketplace</a></Link>
      <button style={{backgroundColor:'red', color: 'whitesmoke', padding: 8}}>   
          Connect
        </button>
   
    </nav>
);
}
 
export default Navbar;