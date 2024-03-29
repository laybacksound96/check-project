import styled from "styled-components";
import Contents from "./Contents";
import AccountGold from "./AccountGold";
import { useRecoilValue } from "recoil";
import { IUser, User } from "../atoms/data";
const HeaderBoxStyle = styled.header`
  position: relative;
  min-width: auto;
  height: auto;
  border-radius: 30px;
  padding: 30px;

  background-color: ${(props) => props.theme.Color_1};
  border-color: ${(props) => props.theme.Color_4};
  border-style: solid;
  border-width: 3px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      display: inline;
      font-size: 30px;
      color: ${(props) => props.theme.TextColor_A};
      svg {
        margin-left: 10px;
      }
      &:hover {
        span {
          opacity: 100%;
          font-size: 0.9rem;
          color: #70ff90;
          transition: opacity 0.2s ease-in-out;
        }
      }
      span {
        opacity: 0%;
      }
    }
  }
`;

const makeName = (user: IUser) => {
  if (user.global_name) {
    return user.global_name;
  } else {
    if (user.discriminator === "0") {
      return user.global_name;
    } else {
      return user.user_name;
    }
  }
};
const HeaderBox = () => {
  const user = useRecoilValue(User);
  return (
    <HeaderBoxStyle>
      <header>
        <h1>{makeName(user)}님의 체크시트</h1>
        <AccountGold />
      </header>
      <Contents />
    </HeaderBoxStyle>
  );
};

export default HeaderBox;
