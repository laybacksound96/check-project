import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";
import { dragIcon } from "../../../../../Settings";
interface IStyle {
  isVisible: boolean;
}
const CheckBox = styled.div<IStyle>`
  opacity: ${(props) => (props.isVisible ? "100%" : "0%")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${dragIcon.icon.fontSize}px;
  width: ${dragIcon.icon.edgeLength}px;
  height: ${dragIcon.icon.edgeLength}px;
  border-radius: 5px;
  color: ${(props) => props.theme.subColor};
  &:hover {
    background-color: rgba(255, 255, 255, 0.258);
    transition: ease-in-out 0.1s;
  }
`;
interface ICheckboxProps {
  key: string;
  CheckBoxOnclick: (char: string, cont: string) => void;
  isChecked: boolean;
  CharacterName: string;
  ContentName: string;
  isVisible: boolean;
  level: number;
}

function CheckBoxButton({
  isChecked,
  CheckBoxOnclick,
  CharacterName,
  ContentName,
  isVisible,
  level,
}: ICheckboxProps) {
  function onClickHandler() {
    if (!isVisible) return;
    CheckBoxOnclick(CharacterName, ContentName);
  }

  return (
    <CheckBox onClick={onClickHandler} isVisible={isVisible}>
      {isChecked ? (
        <FontAwesomeIcon icon={faSquareCheck} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faSquare} size="lg" />
      )}
    </CheckBox>
  );
}

export default CheckBoxButton;
