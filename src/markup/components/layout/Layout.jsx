import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Preloader from "../preloader/Preloader";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      {/* <Preloader /> */}
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
