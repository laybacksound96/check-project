import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { AccountsState } from "../../../../../atoms";
import { AxisLocker } from "../../../Functions/AxisLocker";
import DragCharacters from "../DragCharacters/DragCharacters";

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
const DragAccounts = () => {
  const [accountsState, setAccountsState] = useRecoilState(AccountsState);
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
                    <DragCharacters
                      parentProvided={provided}
                      account={account}
                      style={AxisLocker(provided.draggableProps.style!, false)}
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
  );
};
export default React.memo(DragAccounts);
