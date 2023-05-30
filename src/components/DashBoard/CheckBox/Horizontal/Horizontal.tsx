import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import React, { useState } from "react";
import { AccountOrder, ModalEnum, ModalState } from "../../../../atoms";

import DragAccounts from "./DragAccounts/DragAccounts";
import { DropResult } from "react-beautiful-dnd";

const AddAccountBtn = styled.button`
  height: 100px;
  border: none;
  background-color: ${(props) => props.theme.subColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.231);
    transition: ease-in-out 0.1s;
  }
`;

function Horizontal() {
  type IAccountOrder = string[];
  const [accountOrder, setAccountOrder] =
    useRecoilState<IAccountOrder>(AccountOrder);

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
  const setIsModalOpen = useSetRecoilState(ModalState);
  const openModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = true;
      copiedPrev.modalType = ModalEnum.ADD_ACCOUNT;
      return { ...copiedPrev };
    });
  };

  return (
    <>
      <DragAccounts
        AccountOrder={accountOrder}
        dragAccountHandler={dragAccountHandler}
      />
      <AddAccountBtn onClick={openModal}>+ add new account?</AddAccountBtn>
    </>
  );
}

export default Horizontal;
