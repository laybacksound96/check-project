import {
  DragDropContext,
  DraggableProvided,
  DraggingStyle,
  DropResult,
  Droppable,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { CheckboxesState } from "../../../../../atoms";
import DragCharactersDraggable from "./DragCharactersDraggable";

interface IProps {
  parentProvided: DraggableProvided;
  style: DraggingStyle | NotDraggingStyle;
  accountName: string;
  accountIndex: number;
}

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

function DragCharacters({ parentProvided, style, accountName }: IProps) {
  const Accounts = useRecoilValue(CheckboxesState);
  const [Account, setAccount] = useState(Object.keys(Accounts[accountName]));

  const dragCharacterHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    setAccount((prev) => {
      const copiedPrev = [...prev];
      const copiedObject = copiedPrev[source.index];
      copiedPrev.splice(source.index, 1);
      copiedPrev.splice(destination?.index, 0, copiedObject);
      return [...copiedPrev];
    });
    return;
  };
  return (
    <div
      ref={parentProvided.innerRef}
      {...parentProvided.draggableProps}
      style={style}
    >
      <DragDropContext onDragEnd={dragCharacterHandler}>
        <Droppable droppableId={accountName}>
          {(provided, snapshot) => (
            <Area style={{ display: "flex" }}>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {Account.map((CharacterName, index) => {
                  return (
                    <DragCharactersDraggable
                      CharacterName={CharacterName}
                      index={index}
                      boardId={CharacterName + "_" + index}
                      key={CharacterName + "_" + index}
                      accountName={accountName}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
              <DragAccount {...parentProvided.dragHandleProps}></DragAccount>
            </Area>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
export default React.memo(DragCharacters);
