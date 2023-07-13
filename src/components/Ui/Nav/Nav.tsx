import { useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import { loadToken } from "../../../util/auth";

const NavConainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.Color_4};
`;

const Nav = () => {
  const token = useRouteLoaderData("root") as ReturnType<typeof loadToken>;
  return (
    <NavConainer>
      <span>CheckSheet.Link</span>
      <span>각종 버튼들</span>
      {!token && <span>Login</span>}
      {token && <span>Logout</span>}
    </NavConainer>
  );
};

export default Nav;
