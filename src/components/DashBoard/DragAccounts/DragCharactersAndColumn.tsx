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
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DragCharactersDraggable from "./DragCharactersDraggable";
import { dragIcon } from "../../../Settings";
import { ContentsFrequency, UserSetting } from "../../../atoms/atoms";
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
import isAllTrue from "../Functions/isAllTrue";
import useConfigObject from "../../../CustomHooks/UserSetting/useCharsContentSetting";

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
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
  const userSetting = useRecoilValue(UserSetting);
  useEffect(() => {
    setAccountOrder((prev) => {
      const CharacterState = userSetting[AccountName].CharacterState;
      const CharacterOrder: ICharacterOrder = Object.keys(
        CharacterState
      ).filter((name) => CharacterState[name].isVisible);
      const order: IAccountOrder = {
        ...prev[AccountIndex],
        CharacterOrder,
      };
      const copiedPrev = [...prev];
      copiedPrev.splice(AccountIndex, 1);
      copiedPrev.splice(AccountIndex, 0, order);
      return copiedPrev;
    });
  }, [AccountIndex, AccountName, setAccountOrder, userSetting]);
  // useEffect(() => {
  //   setContentsOrder((prev) => {
  //     const { AccountName, CharacterOrder } = accountOrder[AccountIndex];
  //     const characterObject = contentsState[AccountName];

  //     const array = Object.keys(characterObject).filter(
  //       (contentName) =>
  //         isAllTrue(contentName, CharacterOrder, accountState[AccountName]) &&
  //         characterObject[contentName].isVisible
  //     );
  //     const copiedPrev = { ...prev, [`${AccountName}`]: array };
  //     return copiedPrev;
  //   });
  // }, []);
  const dragCharacterHandler = (dragInfo: DropResult) => {
    // const { destination, source } = dragInfo;
    // if (!destination) return;
    // if (destination?.droppableId !== source.droppableId) return;
    // setAccountOrder((prev) => {
    //   const copiedCharacterOrder = [...CharacterOrder];
    //   const copiedObject = copiedCharacterOrder[source.index];
    //   copiedCharacterOrder.splice(source.index, 1);
    //   copiedCharacterOrder.splice(destination?.index, 0, copiedObject);
    //   const copiedPrev = [...prev];
    //   const target = {
    //     ...copiedPrev[AccountIndex],
    //     CharacterOrder: copiedCharacterOrder,
    //   };
    //   copiedPrev.splice(AccountIndex, 1, target);
    //   return copiedPrev;
    // });
    // return;
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
                                    AccountName={AccountName}
                                    ContentName={ContentName}
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
