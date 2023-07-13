import { useParams } from "react-router-dom";
import styled from "styled-components";
import Contents from "./Contents";
import AccountGold from "./AccountGold";
import { useRecoilValue } from "recoil";
import { UserInfo } from "../../../atoms/Info/UserInfo";

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

  * {
    color: ${(props) => props.theme.TextColor_A};
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      display: inline;
      font-size: 30px;
      color: ${(props) => props.theme.TextColor_A};
    }
  }
`;
interface IProps {
  userId: string;
}
const HeaderBox = ({ userId }: IProps) => {
  return (
    <HeaderBoxStyle>
      <header>
        <h1>{userId}님의 체크시트</h1>
        <AccountGold />
      </header>
      <Contents />
    </HeaderBoxStyle>
  );
};

export default HeaderBox;
