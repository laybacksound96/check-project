import styled from "styled-components";
import { CheckBoxConfig, IGates } from "../../../../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";
import ContentCardGate from "./ContentCardGate";
import { useIsVisible } from "../../../../DashBoard/Functions/CustomHooks/CheckBoxConfig/CustomHooks";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

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
    transition: 0.5s ease;
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
  svg {
    color: yellow;
  }
`;
const IconContainer = styled.div<IStyle>`
  opacity: ${(props) => (props.isHovered ? "100%" : "0%")};
  transition: opacity 0.1s ease-in-out;
`;
interface IProps {
  ContentsName: string;
  ChracterName: string;
  Gates: IGates[];
}

const ContentCard = ({ Gates, ContentsName, ChracterName }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useIsVisible(
    CheckBoxConfig,
    ChracterName,
    ContentsName
  );
  const visibleHandler = () => {
    if (!isHovered) return;
    setIsVisible(!isVisible);
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
          <FontAwesomeIcon icon={faCoins} />
          <div>
            <span>골드획득 컨텐츠</span>
            <input type="checkbox" />
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
