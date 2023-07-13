import { Outlet } from "react-router-dom";
import Footer from "../components/Ui/Footer";

const RootLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default RootLayout;
