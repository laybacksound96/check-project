import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import Card, { Name } from "./Vertical__card";
import { AxisLocker } from "../../Functions/AxisLocker";
import styled from "styled-components";
import { ModalEnum, ModalState } from "../../../../atoms/modal";
import { AccountOrder, VisibledColumns } from "../../../../atoms/order";
import { Character } from "../Horizontal/DragCharacters/DragCharactersDraggable";

const VerticalContainer = styled.div`
  display: flex;
`;
const CardContainer = styled.div`
  display: flex;
`;
function Vertical() {
  const accountOrder = useRecoilValue(AccountOrder);
  const [visibledColumns, setVisibledColumns] = useRecoilState(VisibledColumns);

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

  return accountOrder.length ? (
    <VerticalContainer>
      <Character />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="Vertical" direction="horizontal">
          {(provided) => (
            <CardContainer ref={provided.innerRef} {...provided.droppableProps}>
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
                      style={AxisLocker(provided.draggableProps.style!, true)}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Name onClick={openModal}>+</Name>
            </CardContainer>
          )}
        </Droppable>
      </DragDropContext>
    </VerticalContainer>
  ) : null;
}
export default React.memo(Vertical);
