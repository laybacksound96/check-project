import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AccountOrder, VisibledColumns } from "../../../../../atoms/order";
import { AxisLocker } from "../../../Functions/AxisLocker";
import { ModalEnum, ModalState } from "../../../../../atoms/modal";
import Card, { Name } from "../../Vertical/Card";
import DragCharactersDraggable, { Character } from "./DragCharactersDraggable";

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

const DragAccountBtn = styled.div<Istyle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  opacity: ${(props) => (props.isHovered ? "100" : "0")};
`;
const Row = styled.div``;
const Column = styled.div``;
function DragCharacters({
  DragHandleProps,
  AccountName,
  CharacterOrder,
  AccountIndex,
}: IProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);
  const [visibledColumns, setVisibledColumns] = useRecoilState(VisibledColumns);
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
  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setVisibledColumns((prev) => {
        const copiedPrev = [...prev];
        const copiedObject = copiedPrev[source.index];
        copiedPrev.splice(source.index, 1);
        copiedPrev.splice(destination?.index, 0, copiedObject);
        return [...copiedPrev];
      });
    }
    return;
  };
  const setIsModalOpen = useSetRecoilState(ModalState);
  const openModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = true;
      copiedPrev.modalType = ModalEnum.ADD_CONTENT;
      return { ...copiedPrev };
    });
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
              <Row ref={provided.innerRef} {...provided.droppableProps}>
                <Character />
                {accountOrder[AccountIndex].CharacterOrder.map(
                  (CharacterName, index) => {
                    return (
                      <DragCharactersDraggable
                        AccountName={AccountName}
                        CharacterName={CharacterName}
                        index={index}
                        boardId={CharacterName + "_" + index}
                        key={CharacterName + "_" + index}
                      />
                    );
                  }
                )}
                {provided.placeholder}
              </Row>
              <Column>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="Vertical" direction="horizontal">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ display: "flex" }}
                      >
                        {visibledColumns.map((contentName, index) => (
                          <Draggable
                            draggableId={contentName}
                            index={index}
                            key={contentName}
                          >
                            {(provided) => (
                              <Card
                                Column={contentName}
                                parentProvided={provided}
                                index={index}
                                style={AxisLocker(
                                  provided.draggableProps.style!,
                                  true
                                )}
                              />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        <Name onClick={openModal}>+</Name>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Column>
              <DragAccountBtn isHovered={isHovered}>
                <DragAccount {...DragHandleProps} />
              </DragAccountBtn>
            </Area>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
export default React.memo(DragCharacters);
