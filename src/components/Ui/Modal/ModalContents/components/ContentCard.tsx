import styled from "styled-components";
import { CheckBoxConfig, IGates } from "../../../../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";
import ContentCardGate from "./ContentCardGate";
import {
  useIsGoldContents,
  useIsVisible,
} from "../../../../DashBoard/Functions/CustomHooks/CheckBoxConfig/CustomHooks";
import {
  faCoins,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";

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

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  span {
    margin: 0px 20px;
  }
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
`;

const Card = styled.div`
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
  div {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    span {
      font-size: 0.9rem;
      margin: 0;
      margin-top: 5px;
    }
  }
`;
interface IGoldIcon {
  isGoldContents: boolean;
}
const GoldIcon = styled.div<IGoldIcon>`
  svg {
    color: ${(props) => (props.isGoldContents ? "yellow" : "gray")};
  }
`;
const IconContainer = styled.div<IStyle>`
  opacity: ${(props) => (props.isHovered ? "100%" : "0%")};
  transition: opacity 0.1s ease-in-out;
`;
const Icon = styled.div`
  svg {
    color: ${(props) => props.theme.TextColor_A};
    margin: 0px;
    padding: 0px;
    font-size: 20px;
  }
`;
interface IProps {
  ContentsName: string;
  ChracterName: string;
  Gates: IGates[];
  modifyGoldContentsArray: (ContentsName: string) => void;
}

const ContentCard = ({
  Gates,
  ContentsName,
  ChracterName,
  modifyGoldContentsArray,
}: IProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const [isGoldContents, setIsGoldContents] = useIsGoldContents(
    CheckBoxConfig,
    ChracterName,
    ContentsName
  );
  const [isVisible, setIsVisible] = useIsVisible(
    CheckBoxConfig,
    ChracterName,
    ContentsName
  );
  const visibleHandler = () => {
    if (!isHovered) return;
    setIsVisible(!isVisible);
  };
  const goldContentsHandler = () => {
    setIsGoldContents(!isGoldContents);
    modifyGoldContentsArray(ContentsName);
  };

  return (
    <ContentList
      isVisibled={isVisible}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <h1>{ContentsName}</h1>
        <GoldCheck isHovered={isHovered}>
          <GoldIcon isGoldContents={isGoldContents}>
            <FontAwesomeIcon icon={faCoins} />
          </GoldIcon>

          <div onClick={goldContentsHandler}>
            <span>골드획득 컨텐츠</span>
            <Icon>
              {isGoldContents ? (
                <FontAwesomeIcon icon={faSquareCheck} />
              ) : (
                <FontAwesomeIcon icon={faSquare} />
              )}
            </Icon>
          </div>
        </GoldCheck>

        <IconContainer isHovered={isHovered} onClick={visibleHandler}>
          {isVisible ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </IconContainer>
      </CardHeader>
      <Card>
        {Gates.map((gate, index) => {
          const Difficulty = gate.Difficulty;
          return (
            <ContentCardGate
              key={index}
              Difficulty={Difficulty}
              Gate={gate}
              ChracterName={ChracterName}
              ContentsName={ContentsName}
              index={index}
            />
          );
        })}
      </Card>
    </ContentList>
  );
};
export default ContentCard;
