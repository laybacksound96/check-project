import React from "react";
import { DraggableProvided, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Draggable from "./Horizontal__Draggable";

const Area = styled.div`
  * {
    color: ${(props) => props.theme.bgColor};
  }
  font-weight: 500;
  flex-grow: 1;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.subColor};
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.131);
    transition: ease-in-out 0.1s;
  }
`;
const DragAccount = styled.div`
  width: 100%;
  &:hover {
    background-color: rgba(255, 255, 255, 0.258);
    transition: ease-in-out 0.1s;
  }
  border-radius: 10px;
`;
interface IProps {
  account: { Characters: string[] };
  boardId: string;
  accountIndex: number;
  parentProvided: DraggableProvided;
}
function Horizontal__Droppable({
  boardId,
  accountIndex,
  account,
  parentProvided,
}: IProps) {
  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <Area style={{ display: "flex" }}>
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {account.Characters.map((name, index) => {
              return (
                <Draggable
                  name={name}
                  index={index}
                  boardId={name + "_" + index}
                  key={name + "_" + index}
                />
              );
            })}
            {provided.placeholder}
          </div>
          <DragAccount {...parentProvided.dragHandleProps}></DragAccount>
        </Area>
      )}
    </Droppable>
  );
}

export default React.memo(Horizontal__Droppable);
