import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const CheckBox = styled.div``;
const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
`;
function onClickHandler() {}
const ContentCardCheckBox = ({ difficulty }: { difficulty: string }) => (
  <CheckBoxContainer>
    <span>{difficulty}</span>
    <CheckBox onClick={onClickHandler}>
      {difficulty === "hard" || "normal" ? (
        <FontAwesomeIcon icon={faSquareCheck} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faSquare} size="lg" />
      )}
    </CheckBox>
  </CheckBoxContainer>
);

export default ContentCardCheckBox;
