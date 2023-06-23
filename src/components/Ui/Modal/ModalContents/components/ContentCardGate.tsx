import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { IGates } from "../../../../../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentCardCheckBox from "./ContentCardCheckBox";

import { useState } from "react";

const IconContainer = styled.div`
  display: flex;
  align-items: center;
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
      font-size: 30px;
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
const CheckBoxContainer = styled.div`
  display: flex;
  margin: 10px 0;
  margin-top: 20px;
  width: 100%;
`;
interface IProps {
  Difficulty: string | undefined;
  isContentVisible: boolean;
  Gate: IGates;
  ChracterName: string;
  ContentsName: string;
}
const ContentCardGate = ({
  Gate: { Gate_No, isFixedDifficulty, isVisible },
  Difficulty,
  isContentVisible,
}: IProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const changeDifficultyHandler = () => {
    // if (isFixedDifficulty || !isContentVisible || !isVisible) return;
    // setDifficulty(Difficulty === "normal" ? "hard" : "normal");
  };

  return (
    <div></div>
    // <GateContainer
    //   isVisibled={isVisible}
    //   isHovered={isHovered}
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // >
    //   <GateNumberContainer style={{ display: "flex", flexDirection: "column" }}>
    //     <GateNumber>{Gate_No}</GateNumber>
    //     <DifficultySpan>{Difficulty}</DifficultySpan>
    //   </GateNumberContainer>
    //   <DifficultyContainer>
    //     <CheckBoxContainer>
    //       <ContentCardCheckBox
    //         DifficultyState={Difficulty}
    //         Difficulty="normal"
    //         isFixedDifficulty={isFixedDifficulty}
    //         handler={changeDifficultyHandler}
    //       />
    //       <ContentCardCheckBox
    //         DifficultyState={Difficulty}
    //         Difficulty="hard"
    //         isFixedDifficulty={isFixedDifficulty}
    //         handler={changeDifficultyHandler}
    //       />
    //     </CheckBoxContainer>
    //   </DifficultyContainer>
    //   <IconContainer onClick={() => setIsVisible(!isVisible)}>
    //     {isVisible ? (
    //       <FontAwesomeIcon icon={faEye} />
    //     ) : (
    //       <FontAwesomeIcon icon={faEyeSlash} />
    //     )}
    //   </IconContainer>
    // </GateContainer>
  );
};

export default ContentCardGate;
