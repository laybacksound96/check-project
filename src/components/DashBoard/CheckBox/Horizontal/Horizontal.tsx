import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import React, { useState } from "react";
import { AccountsState, CheckboxesState, ColumnState } from "../../../../atoms";
import { InsertAccountHandler } from "../../Functions/InsertAccount";
import DragAccounts from "./DragAccounts/DragAccounts";

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
  const setAccountsState = useSetRecoilState(AccountsState);
  const [checkboxesState, setCheckboxesState] = useRecoilState(CheckboxesState);
  const Column = useRecoilValue(ColumnState);

  const AddAccountHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const InsertedAccount = InsertAccountHandler(Math.floor(event.timeStamp));
    const isThereAccountName = checkboxesState[InsertedAccount.AccountName];
    const newAccountName = InsertedAccount.AccountName;
    if (!isThereAccountName) {
      setCheckboxesState((prev) => {
        const copiedPrev = { ...prev };
        copiedPrev[newAccountName] = {};
        InsertedAccount.Characters.map((Character) => {
          const newCharacterName = Character.CharacterName;
          copiedPrev[newAccountName][newCharacterName] = {};
          const columns = Column.map((obj) => obj.contentName);
          columns.map(
            (content) =>
              (copiedPrev[newAccountName][newCharacterName][content] = false)
          );
          return null;
        });
        return copiedPrev;
      });
    }
    setAccountsState((prev) => {
      return [...prev, InsertedAccount];
    });
  };

  return (
    <>
      <DragAccounts />
      <AddAccountBtn onClick={AddAccountHandler}>
        + add new account?
      </AddAccountBtn>
    </>
  );
}

export default Horizontal;
