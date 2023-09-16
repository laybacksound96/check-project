import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { AxisLocker } from "../Functions/AxisLocker";
import AccountContainer from "./DragCharacters";
import AddAccountButton from "../Components/AddAccountButton";
import { AccountOrder } from "../../../atoms/Settings/Orders";
import UncheckAllButton from "../Components/UncheckAllContents";
import { UserState } from "../../../atoms/user";
import { IFetchedData } from "../../../util/fetch";

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
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);
  const userState = useRecoilValue(UserState);
  const [loggined] = useState(isLoggined(userState));

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
              {accountOrder.map((AccountName, index) => {
                return (
                  <Draggable
                    draggableId={`draggableID_${AccountName}`}
                    key={`draggableID_${AccountName}`}
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
                        <AccountContainer
                          DragHandleProps={provided.dragHandleProps}
                          AccountName={AccountName}
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
