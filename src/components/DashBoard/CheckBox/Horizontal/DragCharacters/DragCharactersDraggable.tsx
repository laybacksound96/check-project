import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { AxisLocker } from "../../../Functions/AxisLocker";
import { dragIcon } from "../../../../../Settings";
import Checkbox from "../CheckBoxButton/CheckBoxButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckboxesState,
  ContentsState,
  VisibledColumns,
} from "../../../../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  padding-left: 5px;
  font-size: ${dragIcon.row.fontSize}px;
  height: ${dragIcon.icon.edgeLength}px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.258);
    transition: ease-in-out 0.1s;
  }
  button {
    margin-top: 0px;
  }
`;
const NameBox = styled.div`
  display: flex;
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  padding-right: 5px;
  padding-top: 5px;
  svg {
    opacity: 60%;
    border-radius: 10px;
    padding: 10px 10px;
    &:hover {
      opacity: 100%;
      background-color: #f0f8ff72;
    }
  }
`;

interface IProps {
  boardId: string;
  CharacterName: string;
  index: number;
  accountName: string;
}
function DragCharactersDraggable({
  boardId,
  CharacterName,
  index,
  accountName,
}: IProps) {
  const Contents = useRecoilValue(ContentsState);

  const setCheckboxState = useSetRecoilState(CheckboxesState);
  const {
    [`${accountName}`]: { [`${CharacterName}`]: ContentState },
  } = useRecoilValue(CheckboxesState);

  const [isHovered, setIsHovered] = useState(false);
  const visibledColumns = useRecoilValue(VisibledColumns);
  const CheckBoxOnclick = (char: string, cont: string) => {
    setCheckboxState((Accounts) => {
      const copiedAccounts = { ...Accounts };
      const copiedAccount = { ...copiedAccounts[accountName] };
      const copiedCharacter = { ...copiedAccount[char] };
      const copiedContent = copiedCharacter[cont];
      const state = copiedAccounts[accountName][char][cont];

      copiedCharacter[cont] = !state;
      copiedAccount[char] = copiedCharacter;
      copiedAccounts[accountName] = copiedAccount;
      return copiedAccounts;
    });
  };

  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <NameBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={AxisLocker(provided.draggableProps.style!, false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Name {...provided.dragHandleProps}>
            {CharacterName}
            <ButtonContainer>
              {isHovered && (
                <FontAwesomeIcon
                  onClick={() => console.log("clicked")}
                  icon={faGear}
                  size="lg"
                />
              )}
            </ButtonContainer>
          </Name>

          {visibledColumns.map((ContentName, ColumnIndex) => {
            return (
              Contents[ContentName].isVisible && (
                <Checkbox
                  key={index + ColumnIndex + ContentName}
                  isChecked={ContentState[ContentName]}
                  isVisible={true}
                  CheckBoxOnclick={CheckBoxOnclick}
                  ContentName={ContentName}
                  CharacterName={CharacterName}
                />
              )
            );
          })}
        </NameBox>
      )}
    </Draggable>
  );
}

export default React.memo(DragCharactersDraggable);
