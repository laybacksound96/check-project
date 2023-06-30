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
import { GoldIncome } from "../../../../../atoms/Settings/GoldIncome";
import useSetCharacterSetting from "../../../../../CustomHooks/Settings/useSetCharacterSetting";

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
  opacity: ${(props) => (props.isHovered ? "100%" : "20%")};
  transition: opacity 0.1s ease-in-out;
  padding-left: 5px;
  align-items: center;
  span {
    font-size: 1rem;
  }
`;

const IconContainer = styled.div<IStyle>`
  opacity: ${(props) => (props.isHovered ? "100%" : "20%")};
  transition: opacity 0.1s ease-in-out;
`;

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
interface IProps {
  AccountName: string;
  ContentsName: string;
  CharacterName: string;
}
const ContentCard = ({ AccountName, ContentsName, CharacterName }: IProps) => {
  const {
    [AccountName]: {
      [CharacterName]: {
        [ContentsName]: { isVisible: isContentVisible, isGoldContents },
      },
    },
  } = useRecoilValue(ContentSetting);
  const {
    [AccountName]: {
      [CharacterName]: { [ContentsName]: gates },
    },
  } = useRecoilValue(Gates);
  const {
    [AccountName]: {
      [CharacterName]: { [ContentsName]: goldIncome },
    },
  } = useRecoilValue(GoldIncome);
  const setter = useSetContentSetting(AccountName, CharacterName, ContentsName);
  const goldSetter = useSetCharacterSetting(AccountName, CharacterName);
  const setGatesVisible = useSetGatesVisible(
    AccountName,
    CharacterName,
    ContentsName
  );
  const visibleHandler = () => {
    if (isContentVisible) {
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
    const { isVisible: isGateVisible } = gates[gateIndex];
    if (!isContentVisible) return;
    setGatesVisible(gateIndex, !isGateVisible);
  };
  const [isHovered, setIsHovered] = useState(false);

  const [prevGold, setPrevGold] = useState(0);
  return (
    <ContentList
      isVisibled={isContentVisible}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <header>
          <h1>{ContentsName}</h1>
          <IconContainer isHovered={isHovered} onClick={visibleHandler}>
            <FontAwesomeIcon icon={isContentVisible ? faEye : faEyeSlash} />
          </IconContainer>
        </header>

        <GoldContainer>
          <GoldIcon isHovered={isHovered} isGoldContents={isGoldContents}>
            <FontAwesomeIcon
              icon={faCoins}
              style={{ color: isGoldContents ? "yellow" : "gray" }}
            />
            <span>
              <CountUp start={prevGold} end={goldIncome} />
            </span>
          </GoldIcon>
          <GoldCheck isHovered={isHovered} onClick={goldContentsHandler}>
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
              isContentVisible={isContentVisible}
            />
          );
        })}
      </GateContainer>
    </ContentList>
  );
};
export default ContentCard;
