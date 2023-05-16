import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { CharacterState } from "../../../atoms";
import DraggableName from "./Horizontal__Draggable";

interface ICardProps {
  boardId: string;
}

function Horizontal__Droppable({ boardId }: ICardProps) {
  const user = useRecoilValue(CharacterState);
  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <Area ref={provided.innerRef} {...provided.droppableProps}>
          {user.map((value, index) => (
            <DraggableName
              boardId={value.CharacterName}
              value={value.CharacterName}
              index={index}
              check={value.Check}
              key={value.CharacterName}
            />
          ))}
          {provided.placeholder}
        </Area>
      )}
    </Droppable>
  );
}

const Area = styled.div`
  * {
    color: ${(props) => props.theme.bgColor};
  }
  font-weight: 500;
  flex-grow: 1;
  border-radius: 10px;
  margin: 5px;
  padding: 15px;
  background-color: ${(props) => props.theme.subColor};
  transition: background-color 0.2s ease-in-out;
`;

export default React.memo(Horizontal__Droppable);
