import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { dragIcon } from "../../../Settings";

const CheckBox = styled.div`
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
  RowIndex: number;
  ColumnIndex: number;
  accountName: string;
  CharacterName: string;
  elem: string;
  isChecked: boolean;
}
function Checkbox({
  ColumnIndex,
  RowIndex,
  CharacterName,
  accountName,
  elem,
  isChecked,
}: ICheckboxProps) {
  const [isClicked, setIsClicked] = useState(false);

  function CheckBox_Onclick() {
    setIsClicked((prev) => {
      console.log("accountName = " + accountName);
      console.log("CharacterName = " + CharacterName);
      console.log("ColumnIndex = " + ColumnIndex);
      console.log("elem = " + elem);
      console.log("RowIndex = " + RowIndex);
      return !prev;
    });
  }

  return (
    <CheckBox onClick={CheckBox_Onclick}>
      {isChecked ? (
        <FontAwesomeIcon icon={faSquareCheck} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faSquare} size="lg" />
      )}
    </CheckBox>
  );
}

export default Checkbox;
