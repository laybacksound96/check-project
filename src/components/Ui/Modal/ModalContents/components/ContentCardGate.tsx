import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentCardCheckBox from "./ContentCardCheckBox";

const GateVisibleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 30px;
    opacity: 20%;
    transition: opacity 0.1s ease-in-out;
    &:hover {
      opacity: 100%;
    }
  }
`;
interface IconContainerStyle {
  Color: string | undefined;
  isContentVisible: boolean;
  isGateVisible: boolean;
}
const GateContainer = styled.div<IconContainerStyle>`
  display: flex;
  box-shadow: ${({ isGateVisible, isContentVisible }) =>
    isGateVisible === false || isContentVisible === false
      ? "none"
      : "0px 3px 5px 0px rgba(0, 0, 0, 0.35)"};
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
  transition: all 0.2s ease-in-out;
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

interface IProps {
  Difficulty: string;
  GateIndex: number;
  isGateVisible: boolean;
  isVisible: boolean;
  Color: string;
  isConvertable: boolean;
  isGateActivate: boolean;
  handleGateVisible: (gateIndex: number) => void;
  handleGateDifficulty: (gateIndex: number, Difficulty: string) => void;
}
const ContentCardGate = ({
  Difficulty,
  GateIndex,
  isVisible,
  isGateVisible,
  Color,
  isConvertable,
  isGateActivate,
  handleGateVisible,
  handleGateDifficulty,
}: IProps) => {
  return (
    <GateContainer
      Color={Color}
      isContentVisible={isVisible}
      isGateVisible={isGateVisible}
    >
      <GateNumber>{GateIndex + 1}</GateNumber>
      <DifficultyContainer>
        <CheckBoxContainer>
          <ContentCardCheckBox
            isCovertable={isConvertable}
            State={Difficulty}
            isVisible={isVisible}
            Difficulty="normal"
            handler={() => {
              if (!isConvertable || Difficulty === "normal") return;
              handleGateDifficulty(GateIndex, Difficulty);
            }}
          />
          <ContentCardCheckBox
            isCovertable={isConvertable}
            State={Difficulty}
            isVisible={isVisible}
            Difficulty="hard"
            handler={() => {
              if (!isConvertable || Difficulty === "hard") return;
              handleGateDifficulty(GateIndex, Difficulty);
            }}
          />
        </CheckBoxContainer>
      </DifficultyContainer>
      <GateVisibleContainer>
        <FontAwesomeIcon
          icon={isGateVisible ? faEye : faEyeSlash}
          onClick={() => {
            if (!isGateActivate) return;
            handleGateVisible(GateIndex);
          }}
        />
      </GateVisibleContainer>
    </GateContainer>
  );
};

export default ContentCardGate;
