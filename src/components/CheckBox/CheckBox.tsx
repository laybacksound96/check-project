import { useRecoilState, useRecoilValue } from "recoil";
import { AccountsState, CheckboxesState, ColumnState } from "../../atoms";
import Horizontal from "./Horizontal/Horizontal";
import styled, { keyframes } from "styled-components";
import { InsertAccountHandler } from "./Functions/InsertAccount";
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { AxisLocker } from "./Functions/AxisLocker";
import React from "react";

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
const AccountStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const MotionStyle = styled.div`
  /* animation: ${fadeInAnimation} 0.5s ease-in-out; */
`;

function CheckBox() {
  const [accountsState, setAccountsState] = useRecoilState(AccountsState);
  const [checkboxesState, setCheckboxesState] = useRecoilState(CheckboxesState);
  const columnState = useRecoilValue(ColumnState);

  const AddAccountHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const InsertedAccount = InsertAccountHandler();
    const isThereAccountName = checkboxesState[InsertedAccount.AccountName];
    const newAccountName = InsertedAccount.AccountName;

    if (!isThereAccountName) {
      setCheckboxesState((prev) => {
        const copiedPrev = { ...prev };
        copiedPrev[newAccountName] = {};
        InsertedAccount.Characters.map((Character) => {
          const newCharacterName = Character.CharacterName;
          copiedPrev[newAccountName][newCharacterName] = {};
          columnState.map(
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

  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setAccountsState((prev) => {
        const copiedPrev = [...prev];
        const copiedObject = copiedPrev[source.index];
        copiedPrev.splice(source.index, 1);
        copiedPrev.splice(destination?.index, 0, copiedObject);
        return [...copiedPrev];
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="accounts" direction="vertical">
          {(provided) => (
            <AccountStyle ref={provided.innerRef} {...provided.droppableProps}>
              {accountsState.map((account, index) => (
                <Draggable
                  draggableId={`${index}_draggableID_${account.AccountName}`}
                  key={`${index}_draggableID_${account.AccountName}`}
                  index={index}
                >
                  {(provided) => (
                    <MotionStyle>
                      <Horizontal
                        parentProvided={provided}
                        account={account}
                        style={AxisLocker(
                          provided.draggableProps.style!,
                          false
                        )}
                        accountIndex={index}
                      />
                    </MotionStyle>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </AccountStyle>
          )}
        </Droppable>
      </DragDropContext>
      <AddAccountBtn onClick={AddAccountHandler}>
        + add new account?
      </AddAccountBtn>
    </>
  );
}

export default React.memo(CheckBox);
