import Footer from "./Footer";
import Navbar from "./Navbar";

export const LayoutMargin = "lg:mr-[540px] lg:ml-[540px]"
export const AntiLayoutMargin = "mr-[-540px] ml-[-540px]"

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
