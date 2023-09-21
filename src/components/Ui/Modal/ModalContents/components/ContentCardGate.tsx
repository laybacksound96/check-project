import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentCardCheckBox from "./ContentCardCheckBox";

import { useState } from "react";

const GateVisibleContainer = styled.div`
  display: flex;
  align-items: center;
`;
interface IconContainerStyle {
  isHovered: boolean;
  Color: string | undefined;
  isContentVisible: boolean;
  isGateVisible: boolean;
}
const GateContainer = styled.div<IconContainerStyle>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({
    Color,
    isGateVisible,
    isContentVisible,
    theme: { TextColor_B },
  }) =>
    Color === undefined || isGateVisible === false || isContentVisible === false
      ? TextColor_B
      : Color};
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 7px;
  opacity: ${(props) => (props.isGateVisible ? "100%" : "30%")};
  transition: opacity 0.1s ease-in-out;

  ${GateVisibleContainer} {
    svg {
      font-size: 30px;
      opacity: ${(props) => (props.isHovered ? "100%" : "0%")};
      transition: opacity 0.1s ease-in-out;
    }
  }
`;

const GateNumber = styled.span`
  font-size: 40px;
  text-align: center;
`;
const DifficultyContainer = styled.div`
  padding: 5px;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ContentCardGate = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div></div>
    // <GateContainer
    //   Color={Color}
    //   isContentVisible={isContentVisible}
    //   isGateVisible={isVisible}
    //   isHovered={isHovered}
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // >
    //   <GateNumber>{Gate_No}</GateNumber>
    //   <DifficultyContainer>
    //     <CheckBoxContainer>
    //       <ContentCardCheckBox
    //         isNormal={isNormal}
    //         State={Difficulty}
    //         Difficulty="normal"
    //         handler={() =>
    //           SetDifficultyHandler(GateIndex, Difficulty, isNormal)
    //         }
    //       />
    //       <ContentCardCheckBox
    //         isNormal={isNormal}
    //         State={Difficulty}
    //         Difficulty="hard"
    //         handler={() =>
    //           SetDifficultyHandler(GateIndex, Difficulty, isNormal)
    //         }
    //       />
    //     </CheckBoxContainer>
    //   </DifficultyContainer>
    //   <GateVisibleContainer>
    //     <FontAwesomeIcon
    //       icon={isVisible ? faEye : faEyeSlash}
    //       onClick={() => SetGateVisibleHandler(GateIndex)}
    //     />
    //   </GateVisibleContainer>
    // </GateContainer>
  );
};

export default ContentCardGate;
