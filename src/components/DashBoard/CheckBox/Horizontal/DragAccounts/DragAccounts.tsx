import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { AxisLocker } from "../../../Functions/AxisLocker";
import DragCharacters from "../DragCharacters/DragCharacters";

const AccountStyle = styled.div`
  display: flex;
  flex-direction: column;
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
                  <DragCharacters
                    parentProvided={provided}
                    accountName={AccountName}
                    accountIndex={index}
                    style={AxisLocker(provided.draggableProps.style!, false)}
                  />
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
