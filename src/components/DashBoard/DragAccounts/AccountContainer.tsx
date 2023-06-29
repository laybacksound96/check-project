import {
  DragDropContext,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
import DragContents from "./DragContents";
import DragCharacters from "./DragCharacters";
import { useSetRecoilState } from "recoil";
import { CharacterOrder } from "../../../atoms/Settings/Orders";

const DragAccountBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  opacity: 0;
  width: 100px;
  background-color: rgba(100, 100, 100, 0.5);
  border-radius: 10px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  * {
    color: ${(props) => props.theme.TextColor_A};
  }
  font-weight: 500;
  border-radius: 10px;
  background-color: ${(props) => props.theme.Color_3};
  transition: background-color 0.2s ease-in-out;
  padding: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    transition: ease-in-out 0.1s;
    & > ${DragAccountBtn} {
      opacity: 1;
    }
  }
`;

interface IProps {
  DragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  AccountName: string;
}

function AccountContainer({ DragHandleProps, AccountName }: IProps) {
  const setCharacterOrder = useSetRecoilState(CharacterOrder);
  const dragCharacterHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) {
      setCharacterOrder((prev) => prev);
    }
    return;
  };
  return (
    <DragDropContext onDragEnd={dragCharacterHandler}>
      <Droppable droppableId={AccountName}>
        {(provided) => (
          <Container>
            <DragCharacters AccountName={AccountName} provided={provided} />
            <DragContents AccountName={AccountName} />
            <DragAccountBtn {...DragHandleProps} />
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default React.memo(AccountContainer);
