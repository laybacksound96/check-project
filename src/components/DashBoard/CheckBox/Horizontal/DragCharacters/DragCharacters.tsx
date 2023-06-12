import {
  DragDropContext,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";

import DragCharactersDraggable from "./DragCharactersDraggable";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AccountOrder } from "../../../../../atoms/order";
import { AccountState } from "../../../../../atoms/atoms";
import reOrderAccountOreder from "../../../Functions/reOrderAccountOrder";

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
  flex-grow: 1;
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
const DragAccount = styled.div`
  flex-grow: 1;
  width: 100px;
  background-color: rgba(100, 100, 100, 0.5);
  transition: ease-in-out 0.1s;
  border-radius: 10px;
`;
const IconContainer = styled.div`
  width: 45px;
  height: 45px;
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
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
      background-color: rgba(100, 100, 100, 0.5);
      opacity: 100%;
    }
  }
`;
interface IProps {
  DragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  AccountName: string;
  CharacterOrder: string[];
  AccountIndex: number;
}

const ButtonContainer = styled.div<Istyle>`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  opacity: ${(props) => (props.isHovered ? "100" : "0")};
  margin-bottom: 20px;
`;
function DragCharacters({
  DragHandleProps,
  AccountName,
  CharacterOrder,
  AccountIndex,
}: IProps) {
  const [isHovered, setIsHovered] = useState(false);
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const accountState = useRecoilValue(AccountState);

  const dragCharacterHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    setAccountOrder((prev) => {
      const copiedCharacterOrder = [...CharacterOrder];
      const copiedObject = copiedCharacterOrder[source.index];
      copiedCharacterOrder.splice(source.index, 1);
      copiedCharacterOrder.splice(destination?.index, 0, copiedObject);

      const copiedPrev = [...prev];
      const target = {
        ...copiedPrev[AccountIndex],
        CharacterOrder: copiedCharacterOrder,
      };
      copiedPrev.splice(AccountIndex, 1, target);

      return copiedPrev;
    });
    return;
  };

  useEffect(() => {
    setAccountOrder((prev) =>
      reOrderAccountOreder(accountState, prev, AccountIndex)
    );
  }, [accountState, setAccountOrder, AccountIndex]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DragDropContext onDragEnd={dragCharacterHandler}>
        <Droppable droppableId={AccountName}>
          {(provided, snapshot) => (
            <Area isHovered={isHovered}>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {CharacterOrder.map((CharacterName, index) => {
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
              <ButtonContainer isHovered={isHovered}>
                <IconContainer>
                  <FontAwesomeIcon icon={faGear} size="lg" />
                </IconContainer>
                <DragAccount {...DragHandleProps} />
              </ButtonContainer>
            </Area>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
export default React.memo(DragCharacters);
