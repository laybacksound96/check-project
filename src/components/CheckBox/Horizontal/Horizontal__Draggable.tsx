import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { AxisLocker } from "../Functions/AxisLocker";
import { dragIcon } from "../../../Settings";
import Checkbox from "./Checkbox";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CheckboxesState, ColumnState, ContentsState } from "../../../atoms";

const Name = styled.div`
  display: flex;
  justify-content: flex-start;
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
function Horizontal__Draggable({
  boardId,
  CharacterName,
  index,
  accountName,
}: IProps) {
  const Column = useRecoilValue(ColumnState);
  const setContents = useSetRecoilState(ContentsState);
  const [CheckboxState, setCheckboxState] = useRecoilState(CheckboxesState);

  const CheckBoxOnclick = (char: string, cont: string, ColumnIndex: number) => {
    setCheckboxState((Accounts) => {
      const copiedAccounts = { ...Accounts };
      const copiedAccount = { ...copiedAccounts[accountName] };
      const copiedCharacter = { ...copiedAccount[char] };

      copiedCharacter[cont] = !copiedCharacter[cont];
      copiedAccount[char] = copiedCharacter;
      copiedAccounts[accountName] = copiedAccount;

      return copiedAccounts;
    });

    setContents((prev) => {
      const copiedPrev = [...prev];
      const content = { ...copiedPrev[ColumnIndex] };
      if (!CheckboxState[accountName][char][cont]) {
        content.frequency++;
      } else {
        content.frequency--;
      }
      copiedPrev[ColumnIndex] = content;

      return copiedPrev;
    });
  };
  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <NameBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={AxisLocker(provided.draggableProps.style!, false)}
        >
          <Name {...provided.dragHandleProps}>{CharacterName}</Name>

          {Column.map((elem, ColumnIndex) => {
            return (
              <Checkbox
                key={index + ColumnIndex + elem}
                isChecked={CheckboxState[accountName][CharacterName][elem]}
                CheckBoxOnclick={CheckBoxOnclick}
                ContentName={elem}
                CharacterName={CharacterName}
                ColumnIndex={ColumnIndex}
              />
            );
          })}
        </NameBox>
      )}
    </Draggable>
  );
}

export default React.memo(Horizontal__Draggable);
