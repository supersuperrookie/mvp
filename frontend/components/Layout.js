import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, walletAddress }) => {
  return (
    <div>
      <Navbar walletAddress={walletAddress} />
      <div className="flex flex-col min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
