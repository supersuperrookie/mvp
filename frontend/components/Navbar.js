import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='' style={{backgroundColor:'lightblue'}}>
      <div className="logo">
        <h1>AMHO</h1>
      </div>
      <Link href="/"><a>Dashboard</a></Link>
      <Link href="/market"><a>Marketplace</a></Link>
      <Link href="/user"><a>Mint</a></Link>
   
    </nav>
);
}
 
export default Navbar;