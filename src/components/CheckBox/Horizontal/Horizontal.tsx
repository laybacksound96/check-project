import {
  DragDropContext,
  DraggableProvided,
  DraggingStyle,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import DroppableSpace from "./Horizontal__Droppable";
import { IAccount } from "../../../atoms";

interface IProps {
  account: IAccount;
  parentProvided: DraggableProvided;
  style: DraggingStyle | NotDraggingStyle;
}

function Horizontal({ account, parentProvided, style }: IProps) {
  const onDragEnd = (dragInfo: DropResult) => {
    // const { destination, source } = dragInfo;
    // if (!destination) return;
    // if (destination?.droppableId === source.droppableId) {
    //   setAccountState((prev) => {
    //     const copiedPrev = { ...prev };
    //     const charStateCopy = [...prev.Characters];
    //     const copiedObject = charStateCopy[source.index];

    //     charStateCopy.splice(source.index, 1);
    //     charStateCopy.splice(destination?.index, 0, copiedObject);
    //     copiedPrev.Characters = charStateCopy;

    //     return { ...copiedPrev };
    //   });
    // }
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
export default Horizontal;
