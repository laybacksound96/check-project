import {
  DragDropContext,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React, { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

import DragCharactersDraggable from "./DragCharactersDraggable";

import { AccountOrder } from "../../../../../atoms/order";
import Vertical from "../../Vertical/Vertical";

interface Istyle {
  isHovered: boolean;
}
const Area = styled.div<Istyle>`
  display: flex;
  justify-content: space-between;
  * {
    color: ${(props) => props.theme.TextColor_A};
  }
  font-weight: 500;
  flex-grow: 1;
  border-radius: 10px;
  background-color: ${(props) => props.theme.Color_3};
  transition: background-color 0.2s ease-in-out;
  padding: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: ${(props) =>
      props.isHovered ? "rgba(0, 0, 0, 0.3)" : "initial"};
    transition: ease-in-out 0.1s;
  }
`;
const DragAccount = styled.div`
  flex-grow: 1;
  width: 100px;
  background-color: rgba(100, 100, 100, 0.5);
  transition: ease-in-out 0.1s;
  border-radius: 10px;
`;

interface IProps {
  DragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  AccountName: string;
  CharacterOrder: string[];
  AccountIndex: number;
}

const ButtonContainer = styled.div<Istyle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  opacity: ${(props) => (props.isHovered ? "100" : "0")};
`;
function DragCharacters({
  DragHandleProps,
  AccountName,
  CharacterOrder,
  AccountIndex,
}: IProps) {
  const [isHovered, setIsHovered] = useState(false);
  const setAccountOrder = useSetRecoilState(AccountOrder);

  const dragCharacterHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    setAccountOrder((prev) => {
      const copiedCharacterOrder = [...CharacterOrder];
      const copiedObject = copiedCharacterOrder[source.index];
      copiedCharacterOrder.splice(source.index, 1);
      copiedCharacterOrder.splice(destination?.index, 0, copiedObject);

      const copiedPrev = [...prev];
      const target = {
        ...copiedPrev[AccountIndex],
        CharacterOrder: copiedCharacterOrder,
      };
      copiedPrev.splice(AccountIndex, 1, target);

      return copiedPrev;
    });
    return;
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DragDropContext onDragEnd={dragCharacterHandler}>
        <Droppable droppableId={AccountName}>
          {(provided, snapshot) => (
            <Area isHovered={isHovered}>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Vertical />
                {CharacterOrder.map((CharacterName, index) => {
                  return (
                    <DragCharactersDraggable
                      AccountName={AccountName}
                      CharacterName={CharacterName}
                      index={index}
                      boardId={CharacterName + "_" + index}
                      key={CharacterName + "_" + index}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
              <ButtonContainer isHovered={isHovered}>
                <DragAccount {...DragHandleProps} />
              </ButtonContainer>
            </Area>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
export default React.memo(DragCharacters);
