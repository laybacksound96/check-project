import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DraggingStyle,
  NotDraggingStyle,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CharacterState, ColumnState } from "../../../atoms";

import Card from "./Vertical__card";

function AxisLocker(style: DraggingStyle | NotDraggingStyle) {
  return style;
  // if (style?.transform) {
  //   const axisLockX = `${style.transform.split(",").shift()}, 0px)`;
  //   return {
  //     ...style,
  //     transform: axisLockX,
  //   };
  // }
  // return style;
}
const Container = styled.div`
  display: flex;
`;
const ColumnStyle = styled.div`
  display: flex;
`;
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
      <Container>
        <Droppable droppableId="one" direction="horizontal">
          {(provided) => (
            <ColumnStyle ref={provided.innerRef} {...provided.droppableProps}>
              {Column.map((Column, index) => (
                <Draggable draggableId={Column} index={index} key={Column}>
                  {(provided) => (
                    <Card
                      Column={Column}
                      parentProvided={provided}
                      style={AxisLocker(provided.draggableProps.style!)}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ColumnStyle>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  );
}
export default React.memo(CheckBoxColumn);
