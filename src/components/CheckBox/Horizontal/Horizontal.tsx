import {
  DragDropContext,
  DraggableProvided,
  DraggingStyle,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import DroppableSpace from "./Horizontal__Droppable";
import { AccountsState, IAccount } from "../../../atoms";
import React from "react";
import { useRecoilState } from "recoil";
import { Contents } from "../../../Style/Dashboard";

interface IProps {
  account: IAccount;
  parentProvided: DraggableProvided;
  style: DraggingStyle | NotDraggingStyle;
}
function findIndexByKeyValue(array: IAccount[], value: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].AccountName === value) {
      return i;
    }
  }
  return -1;
}
function Horizontal({ account, parentProvided, style }: IProps) {
  const [accountsState, setAccountsState] = useRecoilState(AccountsState);
  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setAccountsState((prev) => {
        const copiedPrev = [...prev];
        const foundAccountOnDroppable = copiedPrev.find(
          (Account) => Account.AccountName === destination.droppableId
        );
        if (!foundAccountOnDroppable) return [];

        const index = findIndexByKeyValue(copiedPrev, destination.droppableId);

        const AccountCharacterCopy = [...foundAccountOnDroppable.Characters];
        const copiedAccount = AccountCharacterCopy[source.index];
        AccountCharacterCopy.splice(source.index, 1);
        AccountCharacterCopy.splice(destination?.index, 0, copiedAccount);

        const copiedStartPrev = copiedPrev[index];
        copiedStartPrev.Characters = [...AccountCharacterCopy];
        copiedPrev.splice(index, 1);
        copiedPrev.splice(destination?.index, 0, copiedStartPrev);

        return [...copiedPrev];
      });
    }
    return;
  };

  return (
    <div
      ref={parentProvided.innerRef}
      {...parentProvided.draggableProps}
      style={style}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableSpace
          boardId={account.AccountName}
          account={account}
          parentProvided={parentProvided}
        />
      </DragDropContext>
    </div>
  );
}
export default React.memo(Horizontal);
