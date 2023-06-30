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
import { Gates, IGatesSetting } from "../../../../../atoms/Settings/Gates";
import useSetGatesVisible from "../../../../../CustomHooks/Settings/useSetGatesVisible";
import { IData } from "../../../../../json/commanderTypes";
import commander from "../../../../../json/commander.json";
import { getKey } from "../../../../DashBoard/Functions/CalculateCheckbox";
import { ContentsFrequency } from "../../../../../atoms/frequency";
import getLowerLightnessColor from "../../../../DashBoard/Functions/getLowerLightnessColor";
interface IStyel {
  isVisibled: boolean;
  Color: string | undefined;
}

const ContentList = styled.div<IStyel>`
  display: flex;
  flex-direction: column;
  background-color: ${({ Color, theme: { Color_4 }, isVisibled }) =>
    Color === undefined || isVisibled === false
      ? Color_4
      : getLowerLightnessColor(Color, 15)};

  padding: 15px;
  width: auto;
  height: auto;
  border-radius: 10px;
  margin: 10px;
  h1 {
    font-size: 30px;
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
  opacity: ${(props) => (props.isHovered ? "100%" : "40%")};
  transition: opacity 0.1s ease-in-out;
  padding-left: 5px;
  align-items: center;
  span {
    font-size: 1rem;
  }
`;

const IconContainer = styled.div<IStyle>`
  opacity: ${(props) => (props.isHovered ? "100%" : "80%")};
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
    opacity: ${(props) => (props.isGoldContents ? "100%" : "60%")};
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
        [ContentsName]: {
          isVisible: isContentVisible,
          isGoldContents,
          isActivated,
        },
      },
    },
  } = useRecoilValue(ContentSetting);
  const {
    [AccountName]: {
      [CharacterName]: { [ContentsName]: gates },
    },
  } = useRecoilValue(Gates);
  const { [getKey(ContentsName, gates)]: frequency } =
    useRecoilValue(ContentsFrequency);
  const setter = useSetContentSetting(AccountName, CharacterName, ContentsName);
  const setGatesVisible = useSetGatesVisible(
    AccountName,
    CharacterName,
    ContentsName
  );
  const visibleHandler = () => {
    if (!isActivated) return;
    if (isContentVisible) {
      setter("isVisible", false);
      setter("isGoldContents", false);
    } else {
      setter("isVisible", true);
    }
  };
  const goldContentsHandler = () => {
    if (!isActivated) return;
    if (!isGoldContents) {
      setter("isVisible", true);
      setter("isGoldContents", true);
    } else {
      setter("isGoldContents", false);
    }
  };

  function calcGold(ContentName: string, gates: IGatesSetting[]): number {
    const commanderData: IData = commander;
    let gold = 0;
    for (let index in gates) {
      const { Difficulty, isVisible, isActivated } = gates[index];
      const CommanderGold = commanderData[ContentName][index][Difficulty]?.gold;
      if (!CommanderGold || !isVisible || !isActivated) continue;
      gold += CommanderGold;
    }
    return gold;
  }
  const gateVisibleHandler = (gateIndex: number) => {
    const { isVisible: isGateVisible } = gates[gateIndex];
    if (!isContentVisible || gates.length <= 1) return;
    setGatesVisible(gateIndex, !isGateVisible);
  };
  const [isHovered, setIsHovered] = useState(false);
  const [currentGold, setCurrentGold] = useState(0);
  const [prevGold, setPrevGold] = useState(0);

  useEffect(() => {
    setCurrentGold((prev) => {
      setPrevGold(prev);
      return calcGold(ContentsName, gates);
    });
  }, [ContentsName, gates]);

  return (
    <ContentList
      isVisibled={isContentVisible}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      Color={frequency?.Color}
    >
      <CardHeader>
        <header>
          <div>
            <h1>{ContentsName}</h1>
          </div>

          <IconContainer isHovered={isHovered} onClick={visibleHandler}>
            <FontAwesomeIcon icon={isContentVisible ? faEye : faEyeSlash} />
          </IconContainer>
        </header>
        <span>{frequency?.GateState}</span>

        <GoldContainer>
          <GoldIcon isHovered={isHovered} isGoldContents={isGoldContents}>
            <FontAwesomeIcon
              icon={faCoins}
              style={{ color: isGoldContents ? "yellow" : "gray" }}
            />
            <span>
              <CountUp start={prevGold} end={currentGold} />
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
          const { Difficulty, isNormal } = gate;
          return (
            <ContentCardGate
              key={index}
              Difficulty={Difficulty}
              Gate={gate}
              GateIndex={index}
              SetGateVisibleHandler={gateVisibleHandler}
              isContentVisible={isContentVisible}
              isNormal={isNormal}
              Color={frequency?.Color}
            />
          );
        })}
      </GateContainer>
    </ContentList>
  );
};
export default ContentCard;
