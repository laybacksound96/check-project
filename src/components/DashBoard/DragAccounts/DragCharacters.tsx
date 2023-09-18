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
import { dragCharacter } from "../../../util/fetch";
interface IStyle {
  loggined: boolean;
}
const DragAccountBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  width: 100px;
  background-color: rgba(100, 100, 100, 0.5);
  border-radius: 10px;
  opacity: 40%;
  &:hover {
    opacity: 70%;
  }
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
  accountIndex: number;
}

function DragCharacters({ DragHandleProps, accountIndex }: IProps) {
  const userState = useRecoilValue(UserState);
  const [data, setData] = useRecoilState(Data);
  const loggined = useRecoilValue(LoginState);
  const dragCharacterHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    if (destination.index === source.index) return;
    setData((prev) => {
      const copiedAccounts = [...prev];
      const copiedData = { ...copiedAccounts[accountIndex] };
      const copiedCharacterOrder = [...copiedData.characterOrder];
      const target = copiedCharacterOrder[source.index];
      copiedCharacterOrder.splice(source.index, 1);
      copiedCharacterOrder.splice(destination?.index, 0, target);
      if (userState !== "GUEST") {
        const userId = userState.user._id;
        dragCharacter(copiedData._id, userId, copiedCharacterOrder);
      }
      copiedData.characterOrder = copiedCharacterOrder;
      copiedAccounts[accountIndex] = copiedData;
      return copiedAccounts;
    });
    return;
  };

  return (
    <DragDropContext onDragEnd={dragCharacterHandler}>
      <Droppable droppableId={data[accountIndex]._id}>
        {(provided) => (
          <Container loggined={loggined}>
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ConfigAccountButton AccountName={data[accountIndex]._id} />
              {data[accountIndex].characterOrder.map((name, index) => {
                const character = data[accountIndex].characters.characters.find(
                  ({ CharacterName }) => CharacterName === name
                );
                return (
                  <Draggable
                    key={name}
                    draggableId={name}
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
                            <h1>{name}</h1>
                            <span>{character?.CharacterClassName}</span>
                            <span>Lv {character?.ItemMaxLevel}</span>
                          </NameContainer>
                          <div>
                            <ConfigContentButton
                              AccountName={data[accountIndex]._id}
                              CharacterName={name}
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
            <DragContents
              AccountName={data[accountIndex]._id}
              accountIndex={accountIndex}
            />
            <DragAccountBtn {...DragHandleProps} />
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default React.memo(DragCharacters);
