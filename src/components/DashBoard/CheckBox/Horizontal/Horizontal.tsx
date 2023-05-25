import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import React, { useState } from "react";
import { CheckboxesState, ContentsState } from "../../../../atoms";
import { InsertAccountHandler } from "../../Functions/InsertAccount";
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
  const [accounts, setAccounts] = useRecoilState(CheckboxesState);
  const Column = useRecoilValue(ContentsState);

  type IAccountOrder = string[];
  const [AccountOrder, setAccountOrder] = useState<IAccountOrder>([]);

  const AddAccountHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const MakedMockingAccount = InsertAccountHandler(
      Math.floor(event.timeStamp)
    );
    const isExistAccountName = accounts[MakedMockingAccount.AccountName];
    const newMockingAccountName = MakedMockingAccount.AccountName;

    if (isExistAccountName) return;
    setAccounts((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev[newMockingAccountName] = {};

      for (let index in MakedMockingAccount.Characters) {
        const CharacterName =
          MakedMockingAccount.Characters[index].CharacterName;
        const newCharacterName = CharacterName;
        const columns = Object.keys(Column);
        copiedPrev[newMockingAccountName][newCharacterName] = {};

        for (let index in columns) {
          copiedPrev[newMockingAccountName][newCharacterName][columns[index]] =
            false;
        }
      }
      return copiedPrev;
    });
    setAccountOrder((prev) => {
      return [...prev, newMockingAccountName];
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
      <DragAccounts
        AccountOrder={AccountOrder}
        dragAccountHandler={dragAccountHandler}
      />
      <AddAccountBtn onClick={AddAccountHandler}>
        + add new account?
      </AddAccountBtn>
    </>
  );
}

export default Horizontal;
