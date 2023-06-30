import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentCardCheckBox from "./ContentCardCheckBox";

import { useState } from "react";
import { IGatesSetting } from "../../../../../atoms/Settings/Gates";

const GateVisibleContainer = styled.div`
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
  padding-right: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  opacity: ${(props) => (props.isVisibled ? "100%" : "30%")};
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
  Gate: IGatesSetting;
  Difficulty: "normal" | "hard";
  isContentVisible: boolean;
  GateIndex: number;
  SetGateVisibleHandler: (GateIndex: number) => void;
}
const ContentCardGate = ({
  Gate: { Gate_No, isVisible },
  Difficulty,
  isContentVisible,
  GateIndex,
  SetGateVisibleHandler,
}: IProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const changeDifficultyHandler = () => {
    if (!isContentVisible || !isVisible) return;
  };

  return (
    <GateContainer
      isVisibled={isVisible}
      isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GateNumberContainer style={{ display: "flex", flexDirection: "column" }}>
        <GateNumber>{Gate_No}</GateNumber>
        <DifficultySpan>{Difficulty}</DifficultySpan>
      </GateNumberContainer>
      <DifficultyContainer>
        <CheckBoxContainer>
          <ContentCardCheckBox
            State={Difficulty}
            Difficulty="normal"
            handler={changeDifficultyHandler}
          />
          <ContentCardCheckBox
            State={Difficulty}
            Difficulty="hard"
            handler={changeDifficultyHandler}
          />
        </CheckBoxContainer>
      </DifficultyContainer>
      <GateVisibleContainer>
        <FontAwesomeIcon
          icon={isVisible ? faEye : faEyeSlash}
          onClick={() => SetGateVisibleHandler(GateIndex)}
        />
      </GateVisibleContainer>
    </GateContainer>
  );
};

export default ContentCardGate;
