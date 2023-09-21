import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import React from "react";
import useModal from "../CustomHooks/useModal";
import { dragIcon } from "../Settings";
import { Account, UserState } from "../atoms/data";
import { LoginState } from "../atoms/login";
import { patchContents } from "../util/fetch";
import CheckBoxButton from "./CheckBoxButton";
import { AxisLocker } from "./Functions/AxisLocker";

const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: ${dragIcon.icon.edgeLength}px;
  height: ${dragIcon.icon.edgeLength}px;
  font-size: ${dragIcon.column.fontSize}px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.231);
    transition: ease-in-out 0.1s;
  }
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  AccountId: string;
  accountIndex: number;
}
const DragContents = ({ AccountId, accountIndex }: IProps) => {
  const [openModal] = useModal();
  const userState = useRecoilValue(UserState);
  const [account, setAccount] = useRecoilState(Account);
  const loggined = useRecoilValue(LoginState);
  const dragContentHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    if (destination.index === source.index) return;
    setAccount((prev) => {
      const copiedAccounts = [...prev];
      const copiedData = { ...copiedAccounts[accountIndex] };
      const copiedContentsOrder = [...copiedData.contentsOrder];
      const target = copiedContentsOrder[source.index];
      copiedContentsOrder.splice(source.index, 1);
      copiedContentsOrder.splice(destination?.index, 0, target);
      if (userState !== "GUEST") {
        const userId = userState.user._id;
        patchContents(copiedData._id, userId, copiedContentsOrder);
      }
      copiedData.contentsOrder = copiedContentsOrder;
      copiedAccounts[accountIndex] = copiedData;
      return copiedAccounts;
    });
    return;
  };
  const { contentsOrder, characterOrder, contents } = account[accountIndex];
  return (
    <>
      <DragDropContext onDragEnd={dragContentHandler}>
        <Droppable droppableId="Column" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: "flex" }}
            >
              {contentsOrder.map((ContentName, index) => (
                <Draggable
                  draggableId={ContentName}
                  index={index}
                  key={ContentName}
                  isDragDisabled={!loggined}
                >
                  {(provided) => (
                    <ColumnContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={AxisLocker(provided.draggableProps.style!, true)}
                    >
                      <Name {...provided.dragHandleProps}>
                        {ContentName.length >= 7
                          ? `${ContentName.slice(0, 7)}...`
                          : ContentName}
                      </Name>
                      {characterOrder.map((CharacterName) => {
                        return (
                          <CheckBoxButton
                            key={accountIndex + CharacterName + ContentName}
                            CharacterName={CharacterName}
                            AccountIndex={accountIndex}
                            ContentName={ContentName}
                            Color={"testColor"}
                          />
                        );
                      })}
                    </ColumnContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
export default React.memo(DragContents);
