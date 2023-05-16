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
import { CharacterState, RowState } from "../../../atoms";

import RowCard from "./Vertical__card";

function AxisLocker(style: DraggingStyle | NotDraggingStyle) {
  if (style?.transform) {
    const axisLockX = `${style.transform.split(",").shift()}, 0px)`;
    return {
      ...style,
      transform: axisLockX,
    };
  }
  return style;
}
const Container = styled.div`
  display: flex;
  color: ${(props) => props.theme.textColor};
`;
const Name = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  height: 20px;
  border-radius: 5px;
`;
function CheckBoxRow() {
  const setChars = useSetRecoilState(CharacterState);
  const [Row, setRows] = useRecoilState(RowState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setRows((prev) => {
        const boardCopy = [...prev];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return [...boardCopy];
      });

      /* 
      @todo : code refactoring needs
      */

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
    /*
    Name 컴포넌트는 Droppable의 열을 맞춰주고 있다.
    컨테이너를 Grid식으로 바꾸던지 근본적인 개선필요
    */
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Name />
        <Droppable droppableId="one" direction="horizontal">
          {(provided) => (
            <div
              style={{ display: "flex" }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {Row.map((Row, index) => (
                <Draggable draggableId={Row} index={index} key={Row}>
                  {(provided) => (
                    <RowCard
                      Row={Row}
                      parentProvided={provided}
                      style={AxisLocker(provided.draggableProps.style!)}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  );
}
export default React.memo(CheckBoxRow);
