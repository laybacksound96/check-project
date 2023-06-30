import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const CheckBox = styled.div`
  padding-top: 5px;
`;
interface IStyle {
  isNormal: boolean;
}
const CheckBoxContainer = styled.div<IStyle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  opacity: ${({ isNormal }) => (isNormal === true ? "30%" : "100%")};
`;
interface IProps {
  isNormal: boolean;
  Difficulty: string;
  handler: () => void;
  State: string;
}

const ContentCardCheckBox = ({
  isNormal,
  State,
  Difficulty,
  handler,
}: IProps) => {
  return (
    <CheckBoxContainer isNormal={isNormal}>
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
