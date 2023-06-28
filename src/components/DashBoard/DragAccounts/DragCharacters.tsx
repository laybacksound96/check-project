import {
  DragDropContext,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DragCharactersDraggable from "./DragCharactersDraggable";
import { dragIcon } from "../../../Settings";
import useModal from "../../../CustomHooks/Modal/useModal";
import { CharacterOrder } from "../../../atoms/order";
import { useRecoilState } from "recoil";

interface Istyle {
  isHovered: boolean;
}
const Area = styled.div<Istyle>`
  display: flex;
  justify-content: space-between;
  * {
    color: ${(props) => props.theme.TextColor_A};
  }
  font-weight: 500;

  border-radius: 10px;
  background-color: ${(props) => props.theme.Color_3};
  transition: background-color 0.2s ease-in-out;
  padding: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: ${(props) =>
      props.isHovered ? "rgba(0, 0, 0, 0.3)" : "initial"};
    transition: ease-in-out 0.1s;
  }
`;
const Character = styled.div<Istyle>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  padding-left: 5px;

  height: ${dragIcon.icon.edgeLength}px;
  border-radius: 5px;
  svg {
    opacity: 20%;
    font-size: 30px;
    margin-left: 5px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.231);
    transition: ease-in-out 0.1s;
    svg {
      opacity: 100%;
    }
  }
`;
const DragAccount = styled.div`
  flex-grow: 1;
  width: 100px;
  background-color: rgba(100, 100, 100, 0.5);
  transition: ease-in-out 0.1s;
  border-radius: 10px;
`;

const DragAccountBtn = styled.div<Istyle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  opacity: ${(props) => (props.isHovered ? "100" : "0")};
`;

interface IProps {
  DragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  AccountName: string;
}

function DragCharacters({ DragHandleProps, AccountName }: IProps) {
  const [openModal] = useModal();
  const [isHovered, setIsHovered] = useState(false);
  const [{ [AccountName]: characterOrder }, setCharacterOrder] =
    useRecoilState(CharacterOrder);
  const dragCharacterHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;

    return;
  };

  useEffect(() => {}, []);
  return (
    <DragDropContext onDragEnd={dragCharacterHandler}>
      <Droppable droppableId={AccountName}>
        {(provided, snapshot) => (
          <Area
            isHovered={isHovered}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Character
                isHovered={isHovered}
                onClick={() =>
                  openModal("CONFIG_ACCOUNT", {
                    AccountName,
                    CharacterName: "",
                  })
                }
              >
                <FontAwesomeIcon icon={faGear} size="lg" />
              </Character>
              {characterOrder.map((CharacterName, index) => {
                return (
                  <DragCharactersDraggable
                    AccountName={AccountName}
                    CharacterName={CharacterName}
                    index={index}
                    boardId={CharacterName + "_" + index}
                    key={CharacterName + "_" + index}
                  />
                );
              })}
              {provided.placeholder}
            </div>

            <DragAccountBtn isHovered={isHovered}>
              <DragAccount {...DragHandleProps} />
            </DragAccountBtn>
          </Area>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default React.memo(DragCharacters);
