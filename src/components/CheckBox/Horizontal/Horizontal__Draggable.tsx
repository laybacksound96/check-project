import React from "react";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { ICheck } from "../../../atoms";
import Checkbox from "./Horizontal__Draggable__Checkbox";

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
          style={AxisLocker(provided.draggableProps.style!)}
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

function AxisLocker(style: DraggingStyle | NotDraggingStyle) {
  if (style?.transform) {
    const axisLockY = `translate(0px,${style.transform.split(",").pop()}`;
    return {
      ...style,
      transform: axisLockY,
    };
  }
  return style;
}
const Name = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  padding-left: 5px;
  height: 50px;
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
