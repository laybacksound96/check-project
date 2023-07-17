import { useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import { loadToken } from "../../../util/auth";
import { discordLoginHandler } from "../../../page/Home";
import { ReactComponent as DiscordIcon } from "../../../icons/discord-icon.svg";
const NavConainer = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.Color_4};
`;
const LoginDiscord = styled.div`
  display: flex;
  position: relative;
  justify-content: start;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #6e78ea;
  padding: 10px;
  border-radius: 5px;
  overflow: clip;

  &:hover {
    background-color: #8c92f5;
  }
  transition: width 0.3s ease;
`;
const Nav = () => {
  const token = useRouteLoaderData("root") as ReturnType<typeof loadToken>;
  return (
    <NavConainer>
      <span>CheckSheet.Link</span>
      <span>각종 버튼들</span>
      {!token && (
        <LoginDiscord onClick={discordLoginHandler}>
          <DiscordIcon />
          {/* <span>Discord로 로그인</span> */}
        </LoginDiscord>
      )}
      {token && <span>Logout</span>}
    </NavConainer>
  );
};

export default Nav;
