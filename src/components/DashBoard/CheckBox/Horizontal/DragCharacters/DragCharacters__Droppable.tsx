import React from "react";
import { DraggableProvided, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Draggable from "./DragCharacters__Draggable";

const Area = styled.div`
  * {
    color: ${(props) => props.theme.bgColor};
  }
  font-weight: 500;
  flex-grow: 1;
  border-radius: 10px;
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
  boardId: string;
  parentProvided: DraggableProvided;
  accountName: string;
}
function DragCharacters__Droppable({
  boardId,
  parentProvided,
  accountName,
}: IProps) {
  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <Area style={{ display: "flex" }}>
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div>{accountName}</div>
            {/* {account.map((CharacterName, index) => {
              return (
                <Draggable
                  CharacterName={CharacterName}
                  index={index}
                  boardId={CharacterName + "_" + index}
                  key={CharacterName + "_" + index}
                  accountName={accountName}
                />
              );
            })}
            {provided.placeholder} */}
          </div>
          <DragAccount {...parentProvided.dragHandleProps}></DragAccount>
        </Area>
      )}
    </Droppable>
  );
}

export default React.memo(DragCharacters__Droppable);
