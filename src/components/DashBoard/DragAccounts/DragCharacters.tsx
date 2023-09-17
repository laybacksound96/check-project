import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

import React from "react";
import styled, { css } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { dragIcon } from "../../../Settings";
import { LoginState } from "../../../atoms/login";
import { UserState } from "../../../atoms/user";
import { Data, IAccount } from "../../../atoms/data";

import ConfigAccountButton from "../Components/ConfigAccountButton";
import CharacterGold from "../Components/CharacterGold";
import ConfigContentButton from "../Components/ConfigContentButton";
import { AxisLocker } from "../Functions/AxisLocker";
import DragContents from "./DragContents";
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
  data: IAccount;
}

function DragCharacters({ DragHandleProps, data }: IProps) {
  const loggined = useRecoilValue(LoginState);
  const dragCharacterHandler = (dragInfo: DropResult) => {
    // const { destination, source } = dragInfo;
    // if (!destination) return;
    // if (destination?.droppableId !== source.droppableId) return;
    // setCharacterOrder((prev) => {
    //   const copiedOrder = [...prev[AccountName]];
    //   const target = copiedOrder[source.index];
    //   copiedOrder.splice(source.index, 1);
    //   copiedOrder.splice(destination?.index, 0, target);
    //   return { ...prev, [AccountName]: copiedOrder };
    // });
    // return;
  };

  return (
    <DragDropContext onDragEnd={dragCharacterHandler}>
      <Droppable droppableId={data._id}>
        {(provided) => (
          <Container loggined={loggined}>
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ConfigAccountButton AccountName={data._id} />
              {data.characterOrder.map((CharacterName, index) => {
                const character = data.characters.find(
                  ({ CharacterName }) => CharacterName
                );
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
                            <span>{character?.CharacterClassName}</span>
                            <span>Lv {character?.ItemMaxLevel}</span>
                          </NameContainer>
                          <div>
                            <ConfigContentButton
                              AccountName={data._id}
                              CharacterName={CharacterName}
                            />
                            {/* {IsGoldCharacter && (
                              <CharacterGold
                                contentState={contentState}
                                gatesContent={gatesContent}
                              />
                            )} */}
                          </div>
                        </Character>
                      </CharactersContainer>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
            {/* <DragContents AccountName={data._id} />
            <DragAccountBtn {...DragHandleProps} /> */}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default React.memo(DragCharacters);
