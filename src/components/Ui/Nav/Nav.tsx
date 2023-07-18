import { useParams, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import { loadToken } from "../../../util/auth";
import { discordLoginHandler } from "../../../page/Home";
import { ReactComponent as DiscordIcon } from "../../../icons/discord-icon.svg";
import { faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
const LoginContainer = styled.div`
  flex: 1;
  justify-content: end;
  display: flex;
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;
const LogoutButton = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.TextColor_B};

  border-radius: 5px;
  width: 50px;
  height: 50px;
  overflow: hidden;
  &:hover {
    background-color: ${({ theme }) => theme.Color_2};
    width: 130px;
    transition: width 0.3s ease;
  }
  div {
    position: absolute;
    right: 10px;
    display: inline-flex;
    align-items: center;
    width: auto;
    svg {
      margin-left: 10px;
      width: 30px;
      height: 30px;
    }
    span {
      width: 70px;
    }
  }
`;
const LoginDiscord = styled.div`
  width: 50px;
  height: 50px;
  background-color: #6e78ea;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
  div {
    display: inline-flex;
    align-items: center;
    width: auto;
    svg {
      width: 30px;
      height: 30px;
      margin-right: 15px;
    }
    span {
      font-weight: bold;
      width: 150px;
    }
  }
  &:hover {
    background-color: #8c92f5;
    width: 200px;
  }
  transition: width 0.3s ease;
`;
const Nav = () => {
  const { userId } = useParams();
  const location = userId ? `board/${userId}` : "";
  function logoutHandler() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_id");
    window.location.href = "/" + location;
  }
  const token = useRouteLoaderData("root") as ReturnType<typeof loadToken>;
  return (
    <NavConainer>
      <a style={{ flex: 1 }} href="/">
        CheckSheet.Link
      </a>
      <SearchContainer>
        <input />
      </SearchContainer>
      <LoginContainer>
        {!token && (
          <LoginDiscord onClick={discordLoginHandler}>
            <div>
              <DiscordIcon />
              <span>Discord로 로그인</span>
            </div>
          </LoginDiscord>
        )}
        {token && (
          <LogoutButton onClick={logoutHandler}>
            <div>
              <span>로그아웃</span>
              <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} />
            </div>
          </LogoutButton>
        )}
      </LoginContainer>
    </NavConainer>
  );
};

export default Nav;
