import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { ColumnState } from "../../../atoms";

import Card, { Name } from "./Vertical__card";
import { AxisLocker } from "../Functions/AxisLocker";

function CheckBoxColumn() {
  const [Column, setColumn] = useRecoilState(ColumnState);
  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setColumn((prev) => {
        const copiedPrev = [...prev];
        const copiedObject = copiedPrev[source.index];

        copiedPrev.splice(source.index, 1);
        copiedPrev.splice(destination?.index, 0, copiedObject);

        return [...copiedPrev];
      });
    }
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
            <Name>+</Name>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default React.memo(CheckBoxColumn);
