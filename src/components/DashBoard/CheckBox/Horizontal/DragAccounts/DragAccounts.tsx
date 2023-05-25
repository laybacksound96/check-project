import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled, { keyframes } from "styled-components";
import { AxisLocker } from "../../../Functions/AxisLocker";
import DragCharacters from "../DragCharacters/DragCharacters";

const AccountStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const MotionStyle = styled.div`
  /* animation: ${fadeInAnimation} 0.5s ease-in-out; */
`;
interface IProps {
  AccountOrder: string[];
  dragAccountHandler: (dragInfo: DropResult) => void;
}
const DragAccounts = ({ AccountOrder, dragAccountHandler }: IProps) => {
  return (
    <DragDropContext onDragEnd={dragAccountHandler}>
      <Droppable droppableId="accounts" direction="vertical">
        {(provided) => (
          <AccountStyle ref={provided.innerRef} {...provided.droppableProps}>
            {AccountOrder.map((AccountName, index) => (
              <Draggable
                draggableId={`draggableID_${AccountName}`}
                key={`draggableID_${AccountName}`}
                index={index}
              >
                {(provided) => (
                  <MotionStyle>
                    <DragCharacters
                      parentProvided={provided}
                      accountName={AccountName}
                      accountIndex={index}
                      style={AxisLocker(provided.draggableProps.style!, false)}
                    />
                  </MotionStyle>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </AccountStyle>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default React.memo(DragAccounts);
