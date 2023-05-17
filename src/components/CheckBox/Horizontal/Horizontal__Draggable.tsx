import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { AxisLocker } from "../Functions/AxisLocker";
import { dragIcon } from "../../../Settings";
import Checkbox from "./Horizontal__Draggable__Checkbox";
import { useRecoilValue } from "recoil";
import { ColumnState } from "../../../atoms";

interface INameProps {
  boardId: string;
  name: string;
  index: number;
}

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
    background-color: rgba(255, 255, 255, 0.483);
    transition: ease-in-out 0.1s;
  }
`;
const NameBox = styled.div`
  display: flex;
`;
function Horizontal__Draggable({ boardId, name, index }: INameProps) {
  const Column = useRecoilValue(ColumnState);
  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <NameBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={AxisLocker(provided.draggableProps.style!, false)}
        >
          <Name {...provided.dragHandleProps}>{name}</Name>
          {Column.map((elem, ColumnIndex) => {
            return (
              <Checkbox key={elem} RowIndex={index} ColumnIndex={ColumnIndex} />
            );
          })}
        </NameBox>
      )}
    </Draggable>
  );
}

export default React.memo(Horizontal__Draggable);
