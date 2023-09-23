import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { patchAccount } from "../util/fetch";
import AddAccountButton from "./ButtonAddAccount";
import { AxisLocker } from "./Functions/AxisLocker";
import DragCharacters from "./DragCharacters";
import { AccountOrder } from "../atoms/data";
import UncheckAllButton from "./UncheckAllContents";
import { LoginState } from "../atoms/login";
import { IFetchedData, UserState } from "../atoms/fetchData";
const DragBoxStyle = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.Color_1};
  * {
    color: ${(props) => props.theme.TextColor_A};
  }
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  border-style: solid;
  border-color: ${(props) => props.theme.Color_4};
  border-width: 3px;

  padding: 30px 40px;
  border-radius: 15px;
  margin-bottom: 150px;
`;
const AccountStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
export function isLoggined(userState: IFetchedData | "GUEST") {
  if (userState === "GUEST") return true;
  return userState.isLoggined;
}

const DragAccounts = () => {
  const userState = useRecoilValue(UserState);
  const loggined = useRecoilValue(LoginState);
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);
  const dragAccountHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    if (destination.index === source.index) return;
    setAccountOrder((prev) => {
      const copiedPrev = [...prev];
      const copiedObject = copiedPrev[source.index];
      copiedPrev.splice(source.index, 1);
      copiedPrev.splice(destination?.index, 0, copiedObject);
      const accountOrderdata = copiedPrev.map((elem) => elem._id);
      if (userState !== "GUEST") {
        const userId = userState.user._id;
        patchAccount(userId, accountOrderdata);
      }
      return [...copiedPrev];
    });
  };

  const uncheckHandler = () => {
    // setContentSetting((prev) => {
    //   const newSetting = makeUnchecked(prev);
    //   if (!newSetting) return prev;
    //   return newSetting;
    // });
  };

  return (
    <DragBoxStyle>
      <DragDropContext onDragEnd={dragAccountHandler}>
        <Droppable droppableId="accounts" direction="vertical">
          {(provided) => (
            <AccountStyle ref={provided.innerRef} {...provided.droppableProps}>
              {loggined && <UncheckAllButton handleUncheck={uncheckHandler} />}
              {accountOrder.map((account, index) => {
                return (
                  <Draggable
                    draggableId={account._id}
                    key={account._id}
                    index={index}
                    isDragDisabled={!loggined}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={AxisLocker(
                          provided.draggableProps.style!,
                          false
                        )}
                      >
                        <DragCharacters
                          DragHandleProps={provided.dragHandleProps}
                          account={account}
                          accountIndex={index}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </AccountStyle>
          )}
        </Droppable>
      </DragDropContext>
      {loggined && <AddAccountButton />}
    </DragBoxStyle>
  );
};
export default React.memo(DragAccounts);
