import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DragCharactersDraggable from "./DragCharactersDraggable";
import { dragIcon } from "../../../Settings";
import {
  AccountOrder,
  IAccountOrder,
  ICharacterOrder,
  IContentsOrder,
} from "../../../atoms/order";
import { AxisLocker } from "../Functions/AxisLocker";
import getColorInFrequencyCounter from "../Functions/getColorFrequencyCounter";
import CheckBoxButton from "./CheckBoxButton";
import useModal from "../../../CustomHooks/Modal/useModal";
import { ContentsFrequency } from "../../../atoms/frequency";
import { UserSetting } from "../../../atoms/userSetting";
import isAllVisibleTrue from "../Functions/isAllVisibleTrue";

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
const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: ${dragIcon.icon.edgeLength}px;
  height: ${dragIcon.icon.edgeLength}px;
  font-size: ${dragIcon.column.fontSize}px;
  border-radius: 5px;
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
  CharacterOrder: ICharacterOrder;
  ContentsOrder: IContentsOrder;
  AccountIndex: number;
}

function DragCharacters({
  DragHandleProps,
  AccountName,
  CharacterOrder,
  ContentsOrder,
  AccountIndex,
}: IProps) {
  const [ConfigContent] = useModal();
  const [AddContent] = useModal();
  const [isHovered, setIsHovered] = useState(false);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
  const {
    [AccountName]: { ContentsSetting, CharacterSetting },
  } = useRecoilValue(UserSetting);
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const dragCharacterHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;

    return;
  };
  const dragContentHandler = (dragInfo: DropResult) => {
    // const { destination, source } = dragInfo;
    // if (!destination) return;
    // if (destination?.droppableId === source.droppableId) {
    //   setContentsOrder((prev) => {
    //     const copiedArray = [...prev[AccountName]];

    //     copiedArray.splice(source.index, 1);
    //     copiedArray.splice(
    //       destination?.index,
    //       0,
    //       prev[AccountName][source.index]
    //     );
    //     const copiedPrev = { ...prev, [AccountName]: [...copiedArray] };
    //     return copiedPrev;
    //   });
    // }
    return;
  };

  useEffect(() => {
    const filteredCharacterOrder = Object.keys(CharacterSetting).filter(
      (name) => CharacterSetting[name].isVisible
    );

    const filteredContentsOrder = Object.keys(ContentsSetting).filter(
      (name) =>
        ContentsSetting[name].isVisible &&
        isAllVisibleTrue(name, filteredCharacterOrder, CharacterSetting)
    );

    setAccountOrder((prev) => {
      const result: IAccountOrder = {
        AccountName,
        ContentsOrder: filteredContentsOrder,
        CharacterOrder: filteredCharacterOrder,
      };
      const copiedPrev = [...prev];
      copiedPrev[AccountIndex] = result;
      return copiedPrev;
    });
  }, [
    AccountIndex,
    AccountName,
    CharacterSetting,
    ContentsSetting,
    setAccountOrder,
  ]);
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
                  ConfigContent("CONFIG_CONTENT", {
                    AccountName,
                    CharacterName: "",
                  })
                }
              >
                <FontAwesomeIcon icon={faGear} size="lg" />
              </Character>
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
            <DragDropContext onDragEnd={dragContentHandler}>
              <Droppable droppableId="Column" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ display: "flex" }}
                  >
                    {ContentsOrder.map((ContentName, index) => (
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
                            {CharacterOrder.map((CharacterName) => {
                              return (
                                <CheckBoxButton
                                  key={CharacterName + ContentName}
                                  CharacterName={CharacterName}
                                  AccountName={AccountName}
                                  ContentName={ContentName}
                                  Color={getColorInFrequencyCounter(
                                    contentsFrequency,
                                    ContentName,
                                    CharacterName
                                  )}
                                />
                              );
                            })}
                          </ColumnContainer>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <Name
                      onClick={() =>
                        AddContent("ADD_ACCOUNT", {
                          AccountName,
                          CharacterName: "",
                        })
                      }
                    >
                      +
                    </Name>
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
