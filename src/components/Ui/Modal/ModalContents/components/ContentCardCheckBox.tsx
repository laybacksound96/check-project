import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const CheckBox = styled.div`
  padding-top: 5px;
`;
interface IStyle {
  isNormal: string;
}
const CheckBoxContainer = styled.div<IStyle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  opacity: ${({ isNormal }) => (isNormal === "normal" ? "30%" : "100%")};
`;
interface IProps {
  State: string;
  Difficulty: string;
  handler: () => void;
}

const ContentCardCheckBox = ({ State, Difficulty, handler }: IProps) => {
  return (
    <CheckBoxContainer isNormal={State}>
      <span>{Difficulty}</span>
      <CheckBox onClick={handler}>
        <FontAwesomeIcon
          icon={State === Difficulty ? faSquareCheck : faSquare}
          size="lg"
        />
      </CheckBox>
    </CheckBoxContainer>
  );
};

export default ContentCardCheckBox;
