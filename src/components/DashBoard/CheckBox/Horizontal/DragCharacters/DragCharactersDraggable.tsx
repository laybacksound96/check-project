import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { AxisLocker } from "../../../Functions/AxisLocker";
import { dragIcon } from "../../../../../Settings";
import Checkbox from "../CheckBoxButton/CheckBoxButton";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CheckboxesState,
  ContentsState,
  VisibledColumns,
} from "../../../../../atoms";

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
  const [CheckboxState, setCheckboxState] = useRecoilState(CheckboxesState);
  const [isHovered, setIsHovered] = useState(false);
  const visibledColumns = useRecoilValue(VisibledColumns);
  const CheckBoxOnclick = (char: string, cont: string) => {
    setCheckboxState((Accounts) => {
      const copiedAccounts = { ...Accounts };
      const copiedAccount = { ...copiedAccounts[accountName] };
      const copiedCharacter = { ...copiedAccount[char] };

      copiedCharacter[cont] = !copiedCharacter[cont];
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                height: "100%",
              }}
            >
              {isHovered && <button>Setting</button>}
            </div>
          </Name>

          {visibledColumns.map((ContentName, ColumnIndex) => {
            return (
              Contents[ContentName].isVisible && (
                <Checkbox
                  key={index + ColumnIndex + ContentName}
                  isChecked={
                    CheckboxState[accountName][CharacterName][ContentName]
                  }
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
