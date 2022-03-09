import Footer from "./Footer"
import Navbar from "./Navbar"



const Layout = ({ children, walletAddress }) => {
  return (
    <div className="content">
      <Navbar walletAddress = {walletAddress}/>
      { children }
      <Footer />
    </div>
  );
}
 
export default Layout;