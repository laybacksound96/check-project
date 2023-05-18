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
import { useSetRecoilState } from "recoil";

interface IProps {
  account: IAccount;
  parentProvided: DraggableProvided;
  style: DraggingStyle | NotDraggingStyle;
  accountIndex: number;
}

function Horizontal({ account, parentProvided, style, accountIndex }: IProps) {
  const setAccountsState = useSetRecoilState(AccountsState);
  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setAccountsState((prev) => {
        const copiedPrev = [...prev];
        const copiedAccount = { ...prev[accountIndex] };
        const Characters = [...copiedAccount.Characters];
        const copiedArray = Characters[source.index];
        copiedPrev.splice(accountIndex, 1);
        Characters.splice(source.index, 1);
        Characters.splice(destination?.index, 0, copiedArray);
        copiedPrev.splice(accountIndex, 0, copiedAccount);
        copiedAccount.Characters = Characters;
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
          accountName={account.AccountName}
          parentProvided={parentProvided}
          accountIndex={accountIndex}
        />
      </DragDropContext>
    </div>
  );
}
export default React.memo(Horizontal);
