import { Outlet } from "react-router-dom";
import Nav from "../components/Ui/Nav/Nav";

const LayoutBoard = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default LayoutBoard;
