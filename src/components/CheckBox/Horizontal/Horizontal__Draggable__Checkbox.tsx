import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CharacterState } from "../../../atoms";

// @todo2 width는 Row쪽 witdh와 공유해야 함
const ShareWidthDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transition: ease-in-out 0.1s;
  }
`;
interface ICheckboxProps {
  key: string;
  isChecked: boolean;
  BoxIndex: number;
  boardIndex: number;
}
function Checkbox({ isChecked, BoxIndex, boardIndex }: ICheckboxProps) {
  const [Chars, setCharacterState] = useRecoilState(CharacterState);
  const updateCharacterState = useCallback(() => {
    setCharacterState((prev) => {
      const newCharacterState = [...prev];
      const newCheck = newCharacterState[boardIndex].Check.map(
        (check, index) => {
          if (BoxIndex === index) {
            return { ...check, isChecked: !check.isChecked };
          } else {
            return check;
          }
        }
      );
      newCharacterState[boardIndex] = {
        ...newCharacterState[boardIndex],
        Check: newCheck,
      };
      return newCharacterState;
    });
  }, [BoxIndex, boardIndex, setCharacterState]);

  function CheckBox_Onclick() {
    updateCharacterState();
  }

  return (
    <ShareWidthDiv onClick={CheckBox_Onclick}>
      {Chars[boardIndex].Check[BoxIndex].isChecked ? (
        <FontAwesomeIcon icon={faSquareCheck} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faSquare} size="lg" />
      )}
    </ShareWidthDiv>
  );
}

export default Checkbox;
