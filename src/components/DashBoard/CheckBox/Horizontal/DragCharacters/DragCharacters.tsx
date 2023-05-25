import {
  DragDropContext,
  DraggableProvided,
  DraggingStyle,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import DroppableSpace from "./DragCharacters__Droppable";
import React from "react";

interface IProps {
  parentProvided: DraggableProvided;
  style: DraggingStyle | NotDraggingStyle;
  accountName: string;
  accountIndex: number;
}

function DragCharacters({ parentProvided, style, accountName }: IProps) {
  const dragCharacterHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;

    return;
  };

  return (
    <div
      ref={parentProvided.innerRef}
      {...parentProvided.draggableProps}
      style={style}
    >
      <DragDropContext onDragEnd={dragCharacterHandler}>
        <DroppableSpace
          boardId={accountName}
          accountName={accountName}
          parentProvided={parentProvided}
        />
      </DragDropContext>
    </div>
  );
}
export default React.memo(DragCharacters);
