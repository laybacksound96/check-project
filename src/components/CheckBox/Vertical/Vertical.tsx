import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { ColumnState } from "../../../atoms";

import Card from "./Vertical__card";
import { AxisLocker } from "../Functions/AxisLocker";

function CheckBoxColumn() {
  const [Column] = useRecoilState(ColumnState);
  const onDragEnd = (info: DropResult) => {
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one" direction="horizontal">
        {(provided) => (
          <div
            style={{ display: "flex", marginLeft: "200px" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {Column.map((Column, index) => (
              <Draggable draggableId={Column} index={index} key={Column}>
                {(provided) => (
                  <Card
                    Column={Column}
                    parentProvided={provided}
                    style={AxisLocker(provided.draggableProps.style!, true)}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default React.memo(CheckBoxColumn);
