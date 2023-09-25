import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import React from "react";
import { dragIcon } from "../Settings";
import { LoginState } from "../atoms/login";
import { patchChecks, patchContents } from "../util/fetch";
import CheckBoxButton from "./ButtonCheckBox";
import { AxisLocker } from "./Functions/AxisLocker";
import { AccountOrder, IAccountOrder } from "../atoms/data";
import { UserState } from "../atoms/fetchData";
import patchData from "./Functions/patchData";
import { FrequencyCounter } from "../atoms/frequency";
import calculateStrength from "./Functions/calculateStrength";
import getRandomPastelColor from "./Functions/getRandomPastelColor";

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
  account: IAccountOrder;
  accountIndex: number;
}
const DragContents = ({ account, accountIndex }: IProps) => {
  const userState = useRecoilValue(UserState);
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);
  const frequency = useRecoilValue(FrequencyCounter);
  const loggined = useRecoilValue(LoginState);
  const dragContentHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    if (destination.index === source.index) return;
    setAccountOrder((prev) => {
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
  const onClickHandler = (
    characterName: string,
    contentName: string,
    checkIndex: number
  ) => {
    if (checkIndex === -1) {
      setAccountOrder((prev) => {
        const copiedAccounts = [...prev];
        const copiedData = { ...copiedAccounts[accountIndex] };
        const copiedChecks = [...copiedData.checks];
        copiedChecks.push({ characterName, contentName });
        copiedData.checks = copiedChecks;
        copiedAccounts[accountIndex] = copiedData;
        if (userState !== "GUEST") {
          const userId = userState.user._id;
          patchData(700, async () => {
            patchChecks(copiedData._id, userId, copiedChecks);
          });
        }
        return copiedAccounts;
      });
    } else {
      setAccountOrder((prev) => {
        const copiedAccounts = [...prev];
        const copiedData = { ...copiedAccounts[accountIndex] };
        const copiedChecks = [...copiedData.checks];
        copiedChecks.splice(checkIndex, 1);
        copiedData.checks = copiedChecks;
        copiedAccounts[accountIndex] = copiedData;
        if (userState !== "GUEST") {
          const userId = userState.user._id;
          patchData(700, async () => {
            patchChecks(copiedData._id, userId, copiedChecks);
          });
        }
        return copiedAccounts;
      });
    }
  };

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
              {account.contentsOrder.map((ContentName, index) => (
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
                      {account.characterOrder.map((CharacterName) => {
                        const contents = account.contents;
                        const content = contents.find(
                          ({ owner, contentName }) =>
                            owner === CharacterName &&
                            contentName === ContentName
                        );
                        if (!content) return null;
                        return (
                          <CheckBoxButton
                            key={accountIndex + CharacterName + ContentName}
                            CharacterName={CharacterName}
                            ContentName={ContentName}
                            Account={account}
                            Color={getRandomPastelColor(
                              ContentName,
                              content.gateSetting
                            )}
                            isVisible={content.isVisble}
                            onClickHandler={onClickHandler}
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
