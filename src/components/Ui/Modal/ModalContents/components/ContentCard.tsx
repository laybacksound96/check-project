import styled from "styled-components";
import { IGates } from "../../../../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";
import ContentCardGate from "./ContentCardGate";
const ContentList = styled.div`
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
  Gates: IGates[];
}

const ContentCard = ({ Gates, ContentsName }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ContentList
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <h1>{ContentsName}</h1>
        {isHovered && <FontAwesomeIcon icon={faEye} />}
      </CardHeader>
      <Card>
        {Gates.map((gate, index) => {
          const Difficulty = gate.Difficulty;
          return (
            <ContentCardGate key={index} Difficulty={Difficulty} Gate={gate} />
          );
        })}
      </Card>
    </ContentList>
  );
};
export default ContentCard;
