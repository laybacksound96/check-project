import { Outlet } from "react-router-dom";
import Footer from "../components/Ui/Footer";
import { GlobalStyle } from "../Style/App";

const RootLayout = () => {
  return (
    <>
      <GlobalStyle />
      <Outlet />
      <Footer />
    </>
  );
};
export default RootLayout;
