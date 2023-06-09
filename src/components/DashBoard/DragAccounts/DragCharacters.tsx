import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import DragContents from "./DragContents";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CharacterOrder } from "../../../atoms/Settings/Orders";
import { dragIcon } from "../../../Settings";
import { CharacterInfo } from "../../../atoms/Info/CharacterInfo";
import ConfigAccountButton from "../Components/ConfigAccountButton";
import ConfigContentButton from "../Components/ConfigContentButton";
import { AxisLocker } from "../Functions/AxisLocker";
import { CharacterSetting } from "../../../atoms/Settings/CharacterSetting";
import { ContentSetting } from "../../../atoms/Settings/ContentSetting";
import { Gates } from "../../../atoms/Settings/Gates";
import CharacterGold from "../Components/CharacterGold";
import { LoginState } from "../../../atoms/login";
interface IStyle {
  loggined: boolean;
}
const DragAccountBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  opacity: 0;
  width: 100px;
  background-color: rgba(100, 100, 100, 0.5);
  border-radius: 10px;
`;
const Container = styled.div<IStyle>`
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
  ${(prop) =>
    prop.loggined &&
    css`
      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
        transition: ease-in-out 0.1s;
        & > ${DragAccountBtn} {
          opacity: 1;
        }
      }
    `}
`;

export const Character = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
  padding-left: 5px;
  font-size: ${dragIcon.row.fontSize}px;
  height: ${dragIcon.icon.edgeLength}px;
  border-radius: 5px;

  &:hover {
    background-color: rgba(100, 100, 100, 0.5);
    transition: ease-in-out 0.1s;
    svg {
      opacity: 50%;
    }
  }

  button {
    margin-top: 0px;
  }
`;
const CharactersContainer = styled.div`
  display: flex;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 0.9rem;
    opacity: 40%;
    color: ${(props) => props.theme.TextColor_A};
    &:nth-child(2) {
      font-size: 0.85rem;
    }
  }
`;
interface IProps {
  DragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  AccountName: string;
}

function DragCharacters({ DragHandleProps, AccountName }: IProps) {
  const loggined = useRecoilValue(LoginState);
  const setCharacterOrder = useSetRecoilState(CharacterOrder);
  const { [AccountName]: characterOrder } = useRecoilValue(CharacterOrder);
  const { [AccountName]: characterInfo } = useRecoilValue(CharacterInfo);
  const { [AccountName]: characterSetting } = useRecoilValue(CharacterSetting);
  const { [AccountName]: contentSetting } = useRecoilValue(ContentSetting);
  const { [AccountName]: gates } = useRecoilValue(Gates);
  const dragCharacterHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    setCharacterOrder((prev) => {
      const copiedOrder = [...prev[AccountName]];
      const target = copiedOrder[source.index];
      copiedOrder.splice(source.index, 1);
      copiedOrder.splice(destination?.index, 0, target);
      return { ...prev, [AccountName]: copiedOrder };
    });
    return;
  };
  useEffect(() => {
    setCharacterOrder((prev) => {
      const visibleArray = Object.keys(characterSetting).filter(
        (elem) => characterSetting[elem].isVisible
      );
      return { ...prev, [AccountName]: visibleArray };
    });
  }, [AccountName, characterSetting, setCharacterOrder]);
  return (
    <DragDropContext onDragEnd={dragCharacterHandler}>
      <Droppable droppableId={AccountName}>
        {(provided) => (
          <Container loggined={loggined}>
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ConfigAccountButton AccountName={AccountName} />
              {characterOrder.map((CharacterName, index) => {
                const { ClassName, Level } = characterInfo[CharacterName];
                const { [CharacterName]: contentState } = contentSetting;
                const { [CharacterName]: gatesContent } = gates;

                return (
                  <Draggable
                    key={CharacterName}
                    draggableId={CharacterName}
                    index={index}
                    isDragDisabled={!loggined}
                  >
                    {(provided) => (
                      <CharactersContainer
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={AxisLocker(
                          provided.draggableProps.style!,
                          false
                        )}
                      >
                        <Character {...provided.dragHandleProps}>
                          <NameContainer>
                            <h1>{CharacterName}</h1>
                            <span>{ClassName}</span>
                            <span>Lv {Level}</span>
                          </NameContainer>
                          <div>
                            <ConfigContentButton
                              AccountName={AccountName}
                              CharacterName={CharacterName}
                            />
                            <CharacterGold
                              contentState={contentState}
                              gatesContent={gatesContent}
                            />
                          </div>
                        </Character>
                      </CharactersContainer>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
            <DragContents AccountName={AccountName} />
            <DragAccountBtn {...DragHandleProps} />
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default React.memo(DragCharacters);
