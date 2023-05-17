import {
  DragDropContext,
  DraggableProvided,
  DraggingStyle,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import DroppableSpace from "./Horizontal__Droppable";
import { useState } from "react";

interface IAccountProps {
  account: { Characters: string[] };
  index: number;
  parentProvided: DraggableProvided;
  style: DraggingStyle | NotDraggingStyle;
}
function Horizontal({ index, account, parentProvided, style }: IAccountProps) {
  const [accountState, setAccountState] = useState(account);

  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setAccountState((prev) => {
        const copiedPrev = { ...prev };
        const charStateCopy = [...prev.Characters];
        const copiedObject = charStateCopy[source.index];

        charStateCopy.splice(source.index, 1);
        charStateCopy.splice(destination?.index, 0, copiedObject);
        copiedPrev.Characters = charStateCopy;

        return { ...copiedPrev };
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
          boardId={"" + index}
          accountIndex={index}
          account={accountState}
          parentProvided={parentProvided}
        />
      </DragDropContext>
    </div>
  );
}
export default Horizontal;
