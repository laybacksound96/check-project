import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import DragCharactersDraggable, { Character } from "./DragCharactersDraggable";
import { dragIcon } from "../../../Settings";
import {
  ContentsFrequency,
  CheckBoxConfig,
  AccountState,
} from "../../../atoms/atoms";
import { AccountOrder, ContentsOrder } from "../../../atoms/order";
import { AxisLocker } from "../Functions/AxisLocker";
import getColorInFrequencyCounter from "../Functions/getColorFrequencyCounter";
import CheckBoxButton from "./CheckBoxButton";
import useModal from "../../../CustomHooks/Modal/useModal";
import isAllTrue from "../Functions/isAllTrue";

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
const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: ${dragIcon.icon.edgeLength}px;
  height: ${dragIcon.icon.edgeLength}px;

  border-radius: 5px;
  font-size: ${dragIcon.column.fontSize}px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.231);
    transition: ease-in-out 0.1s;
  }
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
interface IProps {
  DragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  AccountName: string;
  CharacterOrder: string[];
  AccountIndex: number;
}

function DragCharacters({
  DragHandleProps,
  AccountName,
  CharacterOrder,
  AccountIndex,
}: IProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [openModal] = useModal("ADD_CONTENT");
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);
  const [contentsOrder, setContentsOrder] = useRecoilState(ContentsOrder);
  const [checkboxState, setCheckboxState] = useRecoilState(CheckBoxConfig);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
  const accountState = useRecoilValue(AccountState);

  useEffect(() => {
    setAccountOrder((prev) => {
      const order = {
        ...prev[AccountIndex],
        CharacterOrder: Object.keys(accountState[AccountName]).filter(
          (name) => accountState[AccountName][name].isVisible
        ),
      };
      const copiedPrev = [...prev];
      copiedPrev.splice(AccountIndex, 1);
      copiedPrev.splice(AccountIndex, 0, order);
      return copiedPrev;
    });
  }, [AccountIndex, AccountName, accountState, setAccountOrder]);
  useEffect(() => {
    setContentsOrder((prev) => {
      const { CharacterOrder } = accountOrder[AccountIndex];
      const contentOrder = prev[AccountName];
      const array = contentOrder.filter((contentName) =>
        isAllTrue(contentName, CharacterOrder, checkboxState)
      );
      const copiedPrev = { ...prev, [`${AccountName}`]: array };
      return copiedPrev;
    });
  }, [
    AccountIndex,
    AccountName,
    accountOrder,
    checkboxState,
    setContentsOrder,
  ]);
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
  const dragContentHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setContentsOrder((prev) => {
        const copiedArray = prev[AccountName];

        copiedArray.splice(source.index, 1);
        copiedArray.splice(
          destination?.index,
          0,
          prev[AccountName][source.index]
        );
        const copiedPrev = { ...prev, [AccountName]: [...copiedArray] };
        return copiedPrev;
      });
    }
    return;
  };
  const CheckBoxOnclick = (character: string, content: string) => {
    setCheckboxState((Characters) => {
      const copiedCharacters = { ...Characters };
      const ContentName = { ...copiedCharacters[character] };
      const ConfigObject = { ...ContentName[content] };
      const state = copiedCharacters[character][content].isCleared;

      ConfigObject.isCleared = !state;
      ContentName[content] = ConfigObject;
      copiedCharacters[character] = ContentName;
      return copiedCharacters;
    });
  };

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
              <Character />
              {accountOrder[AccountIndex].CharacterOrder.map(
                (CharacterName, index) => {
                  return (
                    <DragCharactersDraggable
                      AccountName={AccountName}
                      CharacterName={CharacterName}
                      index={index}
                      boardId={CharacterName + "_" + index}
                      key={CharacterName + "_" + index}
                    />
                  );
                }
              )}
              {provided.placeholder}
            </div>

            <DragDropContext onDragEnd={dragContentHandler}>
              <Droppable droppableId="Column" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ display: "flex" }}
                  >
                    {contentsOrder[AccountName].map((ContentName, index) => (
                      <Draggable
                        draggableId={ContentName}
                        index={index}
                        key={ContentName}
                      >
                        {(provided) => (
                          <ColumnContainer
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            style={AxisLocker(
                              provided.draggableProps.style!,
                              true
                            )}
                          >
                            <Name>
                              {ContentName.length >= 7
                                ? `${ContentName.slice(0, 7)}...`
                                : ContentName}
                            </Name>
                            {accountOrder[AccountIndex].CharacterOrder.map(
                              (CharacterName) => {
                                const color = getColorInFrequencyCounter(
                                  contentsFrequency,
                                  ContentName,
                                  CharacterName
                                );
                                return (
                                  <CheckBoxButton
                                    key={CharacterName + ContentName}
                                    CharacterName={CharacterName}
                                    ContentName={ContentName}
                                    CheckBoxOnclick={CheckBoxOnclick}
                                    Color={color}
                                  />
                                );
                              }
                            )}
                          </ColumnContainer>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <Name onClick={() => openModal()}>+</Name>
                  </div>
                )}
              </Droppable>
            </DragDropContext>

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
