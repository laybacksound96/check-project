import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CharacterState, ColumnState } from "../../../atoms";

import Card from "./Vertical__card";
import { AxisLocker } from "../Functions/AxisLocker";

function CheckBoxColumn() {
  const setChars = useSetRecoilState(CharacterState);
  const [Column, setColumns] = useRecoilState(ColumnState);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setColumns((prev) => {
        const boardCopy = [...prev];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return [...boardCopy];
      });

      setChars((prev) => {
        const boardCopy = [...prev];
        const newArray = [];
        for (var i = 0; i < boardCopy.length; i++) {
          const checkCopy = [...boardCopy[i]["Check"]];
          const copiedObject = { ...checkCopy[source.index] };
          checkCopy.splice(source.index, 1);
          checkCopy.splice(destination?.index, 0, copiedObject);
          const newObject = {
            CharacterName: boardCopy[i]["CharacterName"],
            Check: checkCopy,
          };
          newArray.push(newObject);
        }
        return newArray;
      });
    }
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one" direction="horizontal">
        {(provided) => (
          <div
            style={{ display: "flex" }}
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
