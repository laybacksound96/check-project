import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { IGates } from "../../../../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentCardCheckBox from "./ContentCardCheckBox";

import { useState } from "react";

interface IProps {
  Difficulty: string | undefined;
  Gate: IGates;
}
const IconContainer = styled.div`
  display: flex;
  justify-content: end;
`;
interface IconContainerStyle {
  isHovered: boolean;
  isVisibled: boolean;
}
const GateContainer = styled.div<IconContainerStyle>`
  display: flex;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.Color_2};
  padding-bottom: 5px;
  padding-left: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  opacity: ${(props) => (props.isVisibled ? "100%" : "30%")};
  transition: opacity 0.1s ease-in-out;
  ${IconContainer} {
    svg {
      margin-top: 10px;
      margin-right: 10px;
      opacity: ${(props) => (props.isHovered ? "100%" : "0%")};
      transition: opacity 0.1s ease-in-out;
    }
  }
`;

const GateNumber = styled.span`
  font-size: 50px;
  text-align: center;
`;
const DifficultyContainer = styled.div`
  padding: 5px;
`;
const GateNumberContainer = styled.div`
  display: flex;
`;
const DifficultySpan = styled.span`
  background-color: ${(props) => props.theme.Color_4};
  border-radius: 5px;
  padding: 5px;
`;

const ContentCardGate = ({ Difficulty, Gate }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisibled, setIsVisibled] = useState(Gate.isVisible);
  const isFixedDifficulty = Gate.isFixedDifficulty;
  return (
    <GateContainer
      isVisibled={isVisibled}
      isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GateNumberContainer style={{ display: "flex", flexDirection: "column" }}>
        <GateNumber>{Gate.Gate_No}</GateNumber>
        <DifficultySpan>{Difficulty}</DifficultySpan>
      </GateNumberContainer>
      <DifficultyContainer>
        <IconContainer
          onClick={() => {
            if (Gate.isFixedDifficulty) return;
            setIsVisibled((prev) => !prev);
          }}
        >
          {isVisibled ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </IconContainer>
        <div style={{ display: "flex", margin: "10px 0", width: "100%" }}>
          <ContentCardCheckBox
            DifficultyState={Difficulty}
            Difficulty="normal"
            isFixedDifficulty={isFixedDifficulty}
          />
          <ContentCardCheckBox
            DifficultyState={Difficulty}
            Difficulty="hard"
            isFixedDifficulty={isFixedDifficulty}
          />
        </div>
      </DifficultyContainer>
    </GateContainer>
  );
};

export default ContentCardGate;
