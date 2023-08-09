import styled, { css, keyframes } from "styled-components";
import Contents from "./Contents";
import AccountGold from "./AccountGold";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faCheck } from "@fortawesome/free-solid-svg-icons";
import { IFetchedData } from "../../../util/fetch";
import { ISync } from "../../../page/Dashboard";

interface IStyle {
  isSync: ISync;
}
const HeaderBoxStyle = styled.header<IStyle>`
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
      svg {
        margin-left: 10px;
        path {
          color: ${({ isSync }) => isSync === "success" && "#70ff90"};
        }
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
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatingIcon = styled(FontAwesomeIcon)`
  ${(props) => {
    if (props.icon === faRotate) {
      return css`
        animation: ${rotateAnimation} 1s linear infinite;
      `;
    }
  }}
`;
const Error = styled.p`
  margin-left: 5px;
  display: inline-block;
  font-size: 0.9rem;
  color: red;
`;

interface IProps {
  userData: string | IFetchedData;
  isSync: ISync;
}
const makeName = (data: IFetchedData) => {
  if (data.global_name) {
    return data.global_name;
  } else {
    if (data.discriminator === "0") {
      return data.global_name;
    } else {
      return data.user_name;
    }
  }
};
const HeaderBox = ({ userData, isSync }: IProps) => {
  return (
    <HeaderBoxStyle isSync={isSync}>
      <header>
        <h1>
          {typeof userData === "string" ? (
            <>{userData}님의 체크시트</>
          ) : (
            <>{makeName(userData)}님의 체크시트</>
          )}
          {isSync === "error" && <Error>서버와의 동기화에 실패했어요.</Error>}
          {isSync === "inprogress" && <RotatingIcon icon={faRotate} />}
          {isSync === "success" && (
            <>
              <RotatingIcon icon={faCheck} />
              <span>서버와 동기화되었어요.</span>
            </>
          )}
        </h1>
        {/* <AccountGold /> */}
      </header>
      <Contents />
    </HeaderBoxStyle>
  );
};

export default HeaderBox;
