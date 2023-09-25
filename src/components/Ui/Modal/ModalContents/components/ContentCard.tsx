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
import { useRecoilValue } from "recoil";
import getLowerLightnessColor from "../../../../Functions/getLowerLightnessColor";
import { IContent } from "../../../../../atoms/data";
import getRandomPastelColor from "../../../../Functions/getRandomPastelColor";
import CountGold from "../../../../CountGold";
import { CommanderData } from "../../../../../atoms/commander";
import calculateIncome from "../../../../Functions/calculateIncome";
interface IStyel {
  isVisibled: boolean;
  Color: string | undefined;
}

const ContentList = styled.div<IStyel>`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.35);
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

const GoldCheck = styled.div`
  display: flex;
  opacity: 40%;
  transition: opacity 0.1s ease-in-out;
  padding-left: 5px;
  align-items: center;
  span {
    font-size: 1rem;
  }
  &:hover {
    opacity: 100%;
  }
`;

const IconContainer = styled.div`
  opacity: 80%;
  transition: opacity 0.1s ease-in-out;
  &:hover {
    opacity: 100%;
  }
`;

interface GoldIconStyle {
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
  contents: IContent;
  isGoldContents: boolean;
  level: number;
}
const ContentCard = ({ contents, isGoldContents, level }: IProps) => {
  const { isVisble, contentName, gateSetting } = contents;
  const commanderData = useRecoilValue(CommanderData);
  const commander = commanderData.find(({ name }) => name === contentName);
  if (!commander) return null;
  const income = calculateIncome([contents], commanderData);
  const goldContentsHandler = () => {};
  const visibleHandler = () => {};

  return (
    <ContentList
      isVisibled={isVisble}
      Color={getRandomPastelColor(contentName, gateSetting)}
    >
      <CardHeader>
        <header>
          <div>
            <h1>{contentName}</h1>
          </div>
          <IconContainer onClick={() => visibleHandler}>
            <FontAwesomeIcon icon={isVisble ? faEye : faEyeSlash} />
          </IconContainer>
        </header>
        <GoldContainer>
          <GoldIcon isGoldContents={isGoldContents}>
            <FontAwesomeIcon
              icon={faCoins}
              style={{ color: isGoldContents ? "yellow" : "gray" }}
            />
            <CountGold income={income} />
          </GoldIcon>
          <GoldCheck onClick={() => goldContentsHandler}>
            <span>골드획득 컨텐츠</span>
            <FontAwesomeIcon icon={isGoldContents ? faSquareCheck : faSquare} />
          </GoldCheck>
        </GoldContainer>
      </CardHeader>
      <GateContainer>
        {gateSetting.map((gate, index) => {
          const { difficulty, isVisible } = gate;
          const checkActivate = () => {
            if (commander.data.length === 1) {
              const { gates } = commander.data[0];
              return gates[index].level <= level;
            } else {
              const { gates } = commander.data[1];
              return gates[index].level <= level;
            }
          };

          return (
            <ContentCardGate
              key={index}
              Difficulty={difficulty}
              Gate={gate}
              GateIndex={index}
              isVisible={isVisble}
              isGateVisible={isVisible}
              isActivated={checkActivate()}
              Color={getRandomPastelColor(contentName, gateSetting)}
            />
          );
        })}
      </GateContainer>
    </ContentList>
  );
};
export default ContentCard;
