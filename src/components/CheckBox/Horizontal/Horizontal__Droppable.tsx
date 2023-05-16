import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Draggable from "./Horizontal__Draggable";

const Area = styled.div`
  * {
    color: ${(props) => props.theme.bgColor};
  }
  font-weight: 500;
  flex-grow: 1;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.subColor};
  transition: background-color 0.2s ease-in-out;
`;
interface IProps {
  account: { Characters: string[] };
  boardId: string;
  accountIndex: number;
}
function Horizontal__Droppable({ boardId, accountIndex, account }: IProps) {
  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <Area ref={provided.innerRef} {...provided.droppableProps}>
          {account.Characters.map((elem, index) => {
            return (
              <Draggable
                name={elem}
                index={index}
                boardId={elem + "_" + index}
                key={elem + "_" + index}
              />
            );
          })}
          {provided.placeholder}
        </Area>
      )}
    </Droppable>
  );
}

export default React.memo(Horizontal__Droppable);
