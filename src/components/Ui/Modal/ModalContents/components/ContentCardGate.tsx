import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentCardCheckBox from "./ContentCardCheckBox";
import { IGate } from "../../../../../atoms/data";

const GateVisibleContainer = styled.div`
  display: flex;
  align-items: center;
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
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.35);
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
  Gate: IGate;
  GateIndex: number;
  isGateVisible: boolean;
  isVisible: boolean;
  Color: string;
  isActivated: boolean;
}
const ContentCardGate = ({
  Difficulty,
  Gate,
  GateIndex,
  isVisible,
  isGateVisible,
  Color,
  isActivated,
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
            isCovertable={isActivated}
            State={Difficulty}
            Difficulty="normal"
            handler={() => {}}
          />
          <ContentCardCheckBox
            isCovertable={isActivated}
            State={Difficulty}
            Difficulty="hard"
            handler={() => {}}
          />
        </CheckBoxContainer>
      </DifficultyContainer>
      <GateVisibleContainer>
        <FontAwesomeIcon
          icon={isGateVisible ? faEye : faEyeSlash}
          onClick={() => {}}
        />
      </GateVisibleContainer>
    </GateContainer>
  );
};

export default ContentCardGate;
