import React, { Suspense, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { AccountOrder } from "../../../atoms/Settings/Orders";
import { UserState } from "../../../atoms/user";
import { IAccount, IFetchedData, getAccountData } from "../../../util/fetch";
import { Await } from "react-router-dom";
import Dashboard from "../../../page/Dashboard";
import AddAccountButton from "../Components/AddAccountButton";
import UncheckAllButton from "../Components/UncheckAllContents";
import { AxisLocker } from "../Functions/AxisLocker";
import AccountContainer from "./DragCharacters";
import { Data } from "../../../atoms/data";
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
  const [userState, setUserState] = useRecoilState(UserState);
  const [loggined] = useState(isLoggined(userState));
  const [data, setData] = useRecoilState(Data);
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
              {data.map((data, index) => {
                return (
                  <Draggable
                    draggableId={data._id}
                    key={data._id}
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
                          data={data}
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
