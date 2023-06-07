import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const CheckBox = styled.div`
  padding-top: 5px;
`;
interface ICheckBoxContainerStyle {
  isFixedDifficulty: boolean;
}
const CheckBoxContainer = styled.div<ICheckBoxContainerStyle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  opacity: ${(props) => (props.isFixedDifficulty ? "30%" : "100%")};
`;
interface IProps {
  DifficultyState: string | undefined;
  Difficulty: string;
  isFixedDifficulty: boolean;
  difficultySetterHandler: (Difficulty: string) => void;
}

const ContentCardCheckBox = ({
  DifficultyState,
  Difficulty,
  isFixedDifficulty,
  difficultySetterHandler,
}: IProps) => {
  const onClickHandler = () => {
    difficultySetterHandler(Difficulty);
  };

  return (
    <CheckBoxContainer isFixedDifficulty={isFixedDifficulty}>
      <span>{Difficulty}</span>
      <CheckBox onClick={onClickHandler}>
        {DifficultyState === Difficulty ? (
          <FontAwesomeIcon icon={faSquareCheck} size="lg" />
        ) : (
          <FontAwesomeIcon icon={faSquare} size="lg" />
        )}
      </CheckBox>
    </CheckBoxContainer>
  );
};

export default ContentCardCheckBox;
