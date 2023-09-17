import { useParams, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import { loadToken } from "../../../util/auth";
import { discordLoginHandler } from "../../../page/Home";
import { ReactComponent as DiscordIcon } from "../../../icons/discord-icon.svg";
import {
  faCircleInfo,
  faMagnifyingGlass,
  faPersonWalkingDashedLineArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ISearchedData } from "../../../util/fetch";
import { useRecoilState } from "recoil";
import { IsFocused } from "../../../atoms/ui";
import UserCard from "./UserCard";

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
  position: relative;
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
const SearchList = styled.div`
  position: absolute;
  width: 330px;
  max-height: 250px;
  top: 50px;
  z-index: 1;
  overflow-y: auto;
  padding: 10px;
  border-radius: 0px 0px 10px 10px;
  margin-top: 1px;
  color: ${({ theme }) => theme.Color_4};
  background-color: ${({ theme }) => theme.TextColor_A};
`;
const InputContainer = styled.form`
  display: flex;

  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  color: ${({ theme }) => theme.Color_4};
  width: 350px;
  height: 50px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.TextColor_A};
  span {
    font-weight: bold;
    font-size: 0.9rem;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: start;
    flex-direction: column;
    span {
      margin-bottom: 5px;
    }
    input {
      padding: 0px;
      outline: none;
      width: 100%;
      border: none;
    }
  }

  button {
    width: 50px;
    height: 100%;
    border: none;
    background-color: ${({ theme }) => theme.TextColor_A};
    padding: 10px;
    svg {
      color: ${({ theme }) => theme.Color_4};
      width: 100%;
      height: 100%;
    }
  }
`;
const EmptyList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  color: ${({ theme }) => theme.TextColor_B};
  svg {
    margin-bottom: 10px;
    font-size: 1.2rem;
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
  const [searchList, setSearchList] = useState<ISearchedData[]>([]);
  const { userId } = useParams();
  const [isFocused, setIsFocused] = useRecoilState(IsFocused);
  const location = userId ? `board/${userId}` : "";
  function logoutHandler() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_id");
    window.location.href = "/" + location;
  }
  const HandleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // const inputedValue = event.target.value;
    // if (inputedValue === "") {
    //   setSearchList([]);
    // } else {
    //   search(inputedValue, setSearchList);
    // }
  };

  const token = useRouteLoaderData("root") as ReturnType<typeof loadToken>;
  return (
    <NavConainer>
      <div style={{ flex: 1 }}>
        <a href="/">CheckSheet.Link</a>
      </div>
      <SearchContainer>
        <InputContainer>
          <div>
            <span>Search</span>
            <input
              placeholder="디스코드 닉네임 혹은 캐릭터이름..."
              onFocus={() => setIsFocused(true)}
              onChange={HandleChange}
            />
          </div>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="black" />
        </InputContainer>
        {isFocused && (
          <SearchList>
            {searchList.length > 0 ? (
              searchList.map((elem, index) => (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <UserCard data={elem} />
                </div>
              ))
            ) : (
              <EmptyList>
                <FontAwesomeIcon icon={faCircleInfo} />
                <span>검색한 유저가 없습니다.</span>
              </EmptyList>
            )}
          </SearchList>
        )}
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
