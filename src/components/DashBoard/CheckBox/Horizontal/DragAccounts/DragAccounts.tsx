import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { AxisLocker } from "../../../Functions/AxisLocker";
import DragCharacters from "../DragCharacters/DragCharacters";
import { AccountOrder } from "../../../../../atoms/order";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ModalState, ModalEnum } from "../../../../../atoms/modal";

const AccountStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddAccountBtn = styled.button`
  height: 100px;
  border: none;
  background-color: ${(props) => props.theme.Color_4};
  color: ${(props) => props.theme.TextColor_A};
  border-radius: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.231);
    transition: ease-in-out 0.1s;
  }
`;

const DragAccounts = () => {
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);
  const setIsModalOpen = useSetRecoilState(ModalState);
  const openModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = true;
      copiedPrev.modalType = ModalEnum.ADD_ACCOUNT;
      return { ...copiedPrev };
    });
  };
  const dragAccountHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    setAccountOrder((prev) => {
      const copiedPrev = [...prev];
      const copiedObject = copiedPrev[source.index];
      copiedPrev.splice(source.index, 1);
      copiedPrev.splice(destination?.index, 0, copiedObject);
      return [...copiedPrev];
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={dragAccountHandler}>
        <Droppable droppableId="accounts" direction="vertical">
          {(provided) => (
            <AccountStyle ref={provided.innerRef} {...provided.droppableProps}>
              {accountOrder.map(({ AccountName, CharacterOrder }, index) => (
                <Draggable
                  draggableId={`draggableID_${AccountName}`}
                  key={`draggableID_${AccountName}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={AxisLocker(provided.draggableProps.style!, false)}
                    >
                      <DragCharacters
                        DragHandleProps={provided.dragHandleProps}
                        AccountName={AccountName}
                        AccountIndex={index}
                        CharacterOrder={CharacterOrder}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </AccountStyle>
          )}
        </Droppable>
      </DragDropContext>
      <AddAccountBtn onClick={openModal}>+ add new account?</AddAccountBtn>
    </>
  );
};
export default React.memo(DragAccounts);
