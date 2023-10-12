import { DropResult, DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import React from "react";
import { dragIcon } from "../Settings";
import CheckBoxButton from "./ButtonCheckBox";
import { AxisLocker } from "./Functions/AxisLocker";
import getRandomPastelColor from "./Functions/getRandomPastelColor";
import { Accounts, Contents, IAccount } from "../atoms/data";
import { changeChecks, changeOrder } from "./Functions/changeFunctions";
import { patchChecks, patchOrder } from "../util/fetch";
import { LoginState } from "../atoms/login";

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
  account: IAccount;
  accountIndex: number;
}
const DragContents = ({ account, accountIndex }: IProps) => {
  const setAccounts = useSetRecoilState(Accounts);
  const loggined = useRecoilValue(LoginState);
  const contents = useRecoilValue(Contents);
  const foundContents = contents.find(({ owner }) => owner === account._id);
  if (!foundContents) return null;
  const dragContentHandler = async (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    if (destination.index === source.index) return;
    const prevOrder = [...account.contentsOrder];
    const newOrder = changeOrder(destination, source, prevOrder);
    const newAccount = await patchOrder(account._id, {
      name: "contentsOrder",
      order: newOrder,
    });
    if (!newAccount) return;
    setAccounts((prev) => {
      const copiedAccounts = [...prev];
      copiedAccounts[accountIndex] = newAccount;
      return copiedAccounts;
    });
    return;
  };
  const onClickHandler = async (characterName: string, contentName: string, checkIndex: number) => {
    const newCheck = { characterName, contentName };
    const checks = account.checks;
    const newChecks = changeChecks(checks, checkIndex, newCheck);
    const newAccount = await patchChecks(account._id, newChecks);
    setAccounts((prev) => {
      const copiedPrev = [...prev];
      copiedPrev[accountIndex] = newAccount;
      return copiedPrev;
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={dragContentHandler}>
        <Droppable droppableId="Column" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: "flex" }}>
              {account.contentsOrder.map((ContentName, index) => (
                <Draggable draggableId={ContentName} index={index} key={ContentName} isDragDisabled={!loggined}>
                  {(provided) => (
                    <ColumnContainer ref={provided.innerRef} {...provided.draggableProps} style={AxisLocker(provided.draggableProps.style!, true)}>
                      <Name {...provided.dragHandleProps}>{ContentName.length >= 7 ? `${ContentName.slice(0, 7)}...` : ContentName}</Name>
                      {account.characterOrder.map((CharacterName) => {
                        const content = foundContents.contents.find(
                          ({ owner, contentName }) => owner === CharacterName && contentName === ContentName
                        );
                        if (!content) return null;
                        return (
                          <CheckBoxButton
                            key={accountIndex + CharacterName + ContentName}
                            CharacterName={CharacterName}
                            ContentName={ContentName}
                            Account={account}
                            Color={getRandomPastelColor(ContentName, content.gateSetting)}
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
