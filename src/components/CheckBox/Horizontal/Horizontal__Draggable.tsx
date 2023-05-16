import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ICheck } from "../../../atoms";
import Checkbox from "./Horizontal__Draggable__Checkbox";
import { AxisLocker } from "../Functions/AxisLocker";
import { dragIcon } from "../../../Settings";

interface INameProps {
  boardId: string;
  value: string;
  index: number;
  check: ICheck[];
}

function Horizontal__Draggable({ boardId, value, check, index }: INameProps) {
  const boardIndex = index;
  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <NameBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={AxisLocker(provided.draggableProps.style!, true)}
        >
          <Name {...provided.dragHandleProps}>{value}</Name>

          {check.map((check, index) => (
            <Checkbox
              key={check.checkName}
              isChecked={check.isChecked}
              BoxIndex={index}
              boardIndex={boardIndex}
            />
          ))}
        </NameBox>
      )}
    </Draggable>
  );
}

const Name = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  padding-left: 5px;
  height: ${dragIcon.edgeLength}px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transition: ease-in-out 0.1s;
  }
`;
const NameBox = styled.div`
  display: flex;
`;

export default React.memo(Horizontal__Draggable);
