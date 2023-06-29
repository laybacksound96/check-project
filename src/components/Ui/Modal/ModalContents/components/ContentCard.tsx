import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import ContentCardGate from "./ContentCardGate";

import {
  faCoins,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";

import CountUp from "react-countup";
import useSetContentSetting from "../../../../../CustomHooks/Settings/useSetContentSetting";
import { useRecoilValue } from "recoil";
import { ContentSetting } from "../../../../../atoms/Settings/ContentSetting";
import { Gates } from "../../../../../atoms/Settings/Gates";
import useSetGatesVisible from "../../../../../CustomHooks/Settings/useSetGatesVisible";

interface IStyel {
  isVisibled: boolean;
}

const ContentList = styled.div<IStyel>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.Color_4};
  padding: 15px;
  width: auto;
  height: auto;
  border-radius: 10px;
  margin: 10px;
  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }
  opacity: ${(props) => (props.isVisibled ? "100%" : "30%")};
  transition: opacity 0.3s ease-in-out;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 10px;

  svg {
    margin-top: 5px;
    font-size: 30px;
    color: ${(props) => props.theme.TextColor_A};
    vertical-align: text-top;
    opacity: 40%;
    padding: 5px;
    transition: 0.2s ease;
  }
  svg:hover {
    border-radius: 5px;
    opacity: 20%;
    transition: 0.1s ease-in-out;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 5px;
    margin-bottom: 5px;
  }
`;

export const GateContainer = styled.div`
  display: flex;
  flex-direction: column;
  ul {
    li {
      font-size: 25px;
    }
  }
`;

interface IStyle {
  isHovered: boolean;
}
const GoldCheck = styled.div<IStyle>`
  display: flex;
  opacity: ${(props) => (props.isHovered ? "100%" : "0%")};
  transition: opacity 0.1s ease-in-out;
  padding-left: 5px;
  align-items: center;
  span {
    font-size: 1rem;
  }
`;

const IconContainer = styled.div<IStyle>`
  opacity: ${(props) => (props.isHovered ? "100%" : "0%")};
  transition: opacity 0.1s ease-in-out;
`;

interface IProps {
  AccountName: string;
  ContentsName: string;
  CharacterName: string;
}
interface GoldIconStyle {
  isHovered: boolean;
  isGoldContents: boolean;
}

const GoldIcon = styled.div<GoldIconStyle>`
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
    opacity: ${(props) => (props.isGoldContents ? "100%" : "40%")};
    font-size: 1.4rem;
  }
  svg {
    color: ${(props) => props.theme.TextColor_A};
    margin: 0px;
    padding: 0px;
    font-size: 20px;
  }
`;
const GoldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentCard = ({ AccountName, ContentsName, CharacterName }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [gateGold, setGateGold] = useState(0);
  const [startGold, setstartGold] = useState(0);
  const {
    [AccountName]: {
      [CharacterName]: {
        [ContentsName]: { isVisible, isGoldContents },
      },
    },
  } = useRecoilValue(ContentSetting);
  const {
    [AccountName]: {
      [CharacterName]: { [ContentsName]: gates },
    },
  } = useRecoilValue(Gates);
  const setter = useSetContentSetting(AccountName, CharacterName, ContentsName);
  const setGatesVisible = useSetGatesVisible(
    AccountName,
    CharacterName,
    ContentsName
  );
  const visibleHandler = () => {
    if (isVisible) {
      setter("isVisible", false);
      setter("isGoldContents", false);
    } else {
      setter("isVisible", true);
    }
  };
  const goldContentsHandler = () => {
    if (!isGoldContents) {
      setter("isVisible", true);
      setter("isGoldContents", true);
    } else {
      setter("isGoldContents", false);
    }
  };
  const gateVisibleHandler = (gateIndex: number) => {
    const { isVisible } = gates[gateIndex];
    setGatesVisible(gateIndex, isVisible);
  };

  return (
    <ContentList
      isVisibled={isVisible}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <header>
          <h1>{ContentsName}</h1>
          <IconContainer isHovered={isHovered} onClick={visibleHandler}>
            <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
          </IconContainer>
        </header>

        <GoldContainer onClick={goldContentsHandler}>
          <GoldIcon isHovered={isHovered} isGoldContents={isGoldContents}>
            <FontAwesomeIcon
              icon={faCoins}
              style={{ color: isGoldContents ? "yellow" : "gray" }}
            />
            <span>
              <CountUp start={startGold} end={gateGold} />
            </span>
          </GoldIcon>
          <GoldCheck isHovered={isHovered}>
            <span>골드획득 컨텐츠</span>
            <FontAwesomeIcon icon={isGoldContents ? faSquareCheck : faSquare} />
          </GoldCheck>
        </GoldContainer>
      </CardHeader>
      <GateContainer>
        {gates.map((gate, index) => {
          const Difficulty = gate.Difficulty;
          return (
            <ContentCardGate
              key={index}
              Difficulty={Difficulty}
              Gate={gate}
              GateIndex={index}
              SetGateVisibleHandler={gateVisibleHandler}
              isContentVisible={isVisible}
            />
          );
        })}
      </GateContainer>
    </ContentList>
  );
};
export default ContentCard;
