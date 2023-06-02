import {
  DragDropContext,
  DraggableProvided,
  DraggingStyle,
  DropResult,
  Droppable,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { AccountState } from "../../../../../atoms";
import DragCharactersDraggable from "./DragCharactersDraggable";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  parentProvided: DraggableProvided;
  style: DraggingStyle | NotDraggingStyle;
  accountName: string;
  accountIndex: number;
}

const Area = styled.div`
  * {
    color: ${(props) => props.theme.bgColor};
  }
  font-weight: 500;
  flex-grow: 1;
  border-radius: 10px;
  background-color: ${(props) => props.theme.subColor};
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.131);
    transition: ease-in-out 0.1s;
  }
`;
const DragAccount = styled.div`
  width: 100%;
  &:hover {
    background-color: rgba(255, 255, 255, 0.258);
    transition: ease-in-out 0.1s;
  }
  border-radius: 10px;
`;
const ButtonContainer = styled.div`
  width: 45px;
  height: 45px;
  margin-left: 15px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    opacity: 50%;
    width: 45px;
    height: 45px;
    padding: 5px 5px;
    border-radius: 10px;
    &:hover {
      background-color: #ffffff3e;
      opacity: 100%;
    }
  }
`;
function DragCharacters({ parentProvided, style, accountName }: IProps) {
  const accountState = useRecoilValue(AccountState);
  const [Account, setAccount] = useState(
    Object.keys(accountState[accountName])
  );
  const [isHovered, setIsHovered] = useState(false);

  const dragCharacterHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    setAccount((prev) => {
      const copiedPrev = [...prev];
      const copiedObject = copiedPrev[source.index];
      copiedPrev.splice(source.index, 1);
      copiedPrev.splice(destination?.index, 0, copiedObject);
      return [...copiedPrev];
    });
    return;
  };

  return (
    <div
      ref={parentProvided.innerRef}
      {...parentProvided.draggableProps}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DragDropContext onDragEnd={dragCharacterHandler}>
        <Droppable droppableId={accountName}>
          {(provided, snapshot) => (
            <Area style={{ display: "flex" }}>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {
                  <ButtonContainer
                    style={{ opacity: `${isHovered ? "100" : "0"}` }}
                  >
                    <FontAwesomeIcon icon={faGear} size="lg" />
                  </ButtonContainer>
                }
                {Account.map((CharacterName, index) => {
                  return (
                    <DragCharactersDraggable
                      CharacterName={CharacterName}
                      index={index}
                      boardId={CharacterName + "_" + index}
                      key={CharacterName + "_" + index}
                      accountName={accountName}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
              <DragAccount {...parentProvided.dragHandleProps}></DragAccount>
            </Area>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
export default React.memo(DragCharacters);
