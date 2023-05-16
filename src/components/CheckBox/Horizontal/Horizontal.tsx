import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { CharacterState } from "../../../atoms";
import DroppableSpace from "./Horizontal__Droppable";
import { useState } from "react";

interface IAccountProps {
  account: { Characters: string[] };
  index: number;
}

function Horizontal({ index, account }: IAccountProps) {
  const [accountState, setAccountState] = useState(account);

  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setAccountState((prev) => {
        const copiedPrev = { ...prev };

        console.log(copiedPrev);

        const charStateCopy = [...prev.Characters];
        const copiedObject = charStateCopy[source.index];

        // charStateCopy.splice(source.index, 1);
        // charStateCopy.splice(destination?.index, 0, copiedObject);
        copiedPrev.Characters = charStateCopy;

        return copiedPrev;
      });
    }
    return;
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableSpace
        boardId={"" + index}
        accountIndex={index}
        account={account}
      />
    </DragDropContext>
  );
}
export default Horizontal;
