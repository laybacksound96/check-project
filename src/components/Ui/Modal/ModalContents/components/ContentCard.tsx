import styled from "styled-components";
import { CheckBoxConfig, IGates } from "../../../../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";
import ContentCardGate from "./ContentCardGate";
import { useIsVisible } from "../../../../DashBoard/Functions/CustomHooks/CheckBoxConfig/CustomHooks";

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
  align-items: start;
  justify-content: space-between;
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
  return (
    <ContentList
      isVisibled={isVisible}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <h1>{ContentsName}</h1>
        {isHovered && (
          <div onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </div>
        )}
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
