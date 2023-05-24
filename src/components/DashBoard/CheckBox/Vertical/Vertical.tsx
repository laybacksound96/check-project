import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { AccountsState, ColumnState } from "../../../../atoms";

import Card, { Name } from "./Vertical__card";
import { AxisLocker } from "../../Functions/AxisLocker";

function CheckBoxColumn() {
  const [Columns, setColumns] = useRecoilState(ColumnState);

  const Accounts = useRecoilValue(AccountsState);

  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setColumns((prev) => {
        const copiedPrev = [...prev];
        const copiedObject = copiedPrev[source.index];
        copiedPrev.splice(source.index, 1);
        copiedPrev.splice(destination?.index, 0, copiedObject);
        return [...copiedPrev];
      });
    }
    return;
  };

  return Accounts.length ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one" direction="horizontal">
        {(provided) => (
          <div
            style={{ display: "flex", marginLeft: "200px" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {Columns.map((Column, index) => (
              <Draggable
                draggableId={Column.contentName}
                index={index}
                key={Column.contentName}
              >
                {(provided) => (
                  <Card
                    Column={Column.contentName}
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
  ) : null;
}
export default React.memo(CheckBoxColumn);
