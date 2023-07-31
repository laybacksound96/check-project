import React, { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { AxisLocker } from "../Functions/AxisLocker";
import DragCharacters from "./DragCharacters";
import AddAccountButton from "../Components/AddAccountButton";
import { LoginState } from "../../../atoms/login";
import UncheckAllButton from "../Components/UncheckAllContents";
import makeUnchecked from "../Functions/makeUnchecked";
import { Accounts } from "../../../atoms/data";

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
const MenuBar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: auto;
  height: auto;
  margin-bottom: 10px;
`;
const DragAccounts = () => {
  const [accountOrder, setAccount] = useRecoilState(Accounts);
  const loggined = useRecoilValue(LoginState);
  const dragAccountHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    setAccount((prev) => {
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
              {loggined && accountOrder.length > 0 && (
                <MenuBar>
                  <UncheckAllButton handleUncheck={uncheckHandler} />
                </MenuBar>
              )}
              {accountOrder.map(({ accountName, characterOrder }, index) => {
                return (
                  <Draggable
                    draggableId={`draggableID_${accountName}`}
                    key={`draggableID_${accountName}`}
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
                          AccountName={accountName}
                          CharacterOrder={characterOrder}
                          setAccount={setAccount}
                          index={index}
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
