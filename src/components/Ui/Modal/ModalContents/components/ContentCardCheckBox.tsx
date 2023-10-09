import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const CheckBox = styled.div`
  padding-top: 5px;
`;
interface IStyle {
  Difficulty: string;
  isCovertable: boolean;
  isVisible: boolean;
}
const CheckBoxContainer = styled.div<IStyle>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  opacity: ${({ isCovertable, Difficulty, isVisible }) => {
    if (!isVisible) return "30%";
    if (isCovertable) {
      return "100%";
    } else {
      if (Difficulty === "normal") return "100%";
      return "30%";
    }
  }};
  &:hover {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

interface IProps {
  isCovertable: boolean;
  Difficulty: string;
  handler: () => void;
  State: string;
  isVisible: boolean;
}

const ContentCardCheckBox = ({
  isCovertable,
  State,
  Difficulty,
  handler,
  isVisible,
}: IProps) => {
  return (
    <CheckBoxContainer
      isCovertable={isCovertable}
      onClick={handler}
      Difficulty={Difficulty}
      isVisible={isVisible}
    >
      <span>{Difficulty}</span>
      <CheckBox>
        <FontAwesomeIcon
          icon={State === Difficulty ? faSquareCheck : faSquare}
          size="lg"
        />
      </CheckBox>
    </CheckBoxContainer>
  );
};

export default ContentCardCheckBox;
