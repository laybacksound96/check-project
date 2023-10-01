import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React from "react";
import styled, { css } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DragContents from "./DragContents";
import { AccountOrder, IAccountOrder, ICheck, IContent } from "../atoms/data";
import { dragIcon } from "../Settings";
import { LoginState } from "../atoms/login";
import { patchCharacter } from "../util/fetch";
import { AxisLocker } from "./Functions/AxisLocker";
import { UserState } from "../atoms/fetchData";
import ButtonConfigAccount from "./ButtonConfigAccount";
import ButtonConfigContent from "./ButtonConfigContent";
import CharacterGold from "./CharacterGold";
import CountGold from "./CountGold";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { CommanderData, ICommander } from "../atoms/commander";
import calculateIncome from "./Functions/calculateIncome";
import CountUp from "react-countup";

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
const SettingAndGold = styled.div`
  display: flex;
`;
interface IProps {
  DragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  account: IAccountOrder;
  accountIndex: number;
}
const AccountIncomeContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 60%;
  svg {
    margin-right: 3px;
  }
  div {
    font-size: 0.95rem;
  }
`;

function DragCharacters({ DragHandleProps, account, accountIndex }: IProps) {
  const userState = useRecoilValue(UserState);
  const loggined = useRecoilValue(LoginState);
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const commanderData = useRecoilValue(CommanderData);
  const dragCharacterHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    if (destination.index === source.index) return;
    setAccountOrder((prev) => {
      const copiedAccounts = [...prev];
      const copiedData = { ...copiedAccounts[accountIndex] };
      const copiedCharacterOrder = [...copiedData.characterOrder];
      const target = copiedCharacterOrder[source.index];
      copiedCharacterOrder.splice(source.index, 1);
      copiedCharacterOrder.splice(destination?.index, 0, target);
      if (userState !== "GUEST") {
        const userId = userState.user._id;
        patchCharacter(copiedData._id, userId, copiedCharacterOrder);
      }
      copiedData.characterOrder = copiedCharacterOrder;
      copiedAccounts[accountIndex] = copiedData;
      return copiedAccounts;
    });
    return;
  };
  const goldContents = account.contents.filter(
    ({ isVisble, isGoldContents }) =>
      isVisble === true && isGoldContents === true
  );
  const calculateCheckedIncome = (
    goldContents: IContent[],
    commanderData: ICommander[],
    checks: ICheck[]
  ) => {
    let gold = 0;
    checks.forEach(({ characterName, contentName }) => {
      const commander = commanderData.find(
        ({ name: commanderName }) => commanderName === contentName
      );
      const content = goldContents.find(
        ({ contentName: cont, owner }) =>
          cont === contentName && characterName === owner
      );

      if (!commander || !content) return;
      const difficulty = content.gateSetting
        .filter(({ isVisible }) => isVisible === true)
        .map(({ difficulty }) => difficulty);
      difficulty.forEach((difficulty, index) => {
        const gate = commander.data.find(
          ({ difficulty: diff }) => difficulty === diff
        );
        if (!gate) return;
        gold += gate.gates[index].gold;
      });
    });
    return gold;
  };
  const AccountIncome = ({
    goldContents,
    commanderData,
    checks,
  }: {
    goldContents: IContent[];
    commanderData: ICommander[];
    checks: ICheck[];
  }) => {
    return (
      <AccountIncomeContainer>
        <span>계정 획득 골드</span>
        <div>
          <FontAwesomeIcon icon={faCoins} />
          <CountGold
            income={calculateCheckedIncome(goldContents, commanderData, checks)}
          />
          <span>/</span>
          <CountUp
            start={calculateIncome(goldContents, commanderData)}
            end={calculateIncome(goldContents, commanderData)}
          />
        </div>
      </AccountIncomeContainer>
    );
  };
  return (
    <DragDropContext onDragEnd={dragCharacterHandler}>
      <Droppable droppableId={account._id}>
        {(provided) => (
          <Container loggined={loggined}>
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <SettingAndGold>
                <ButtonConfigAccount index={accountIndex} />
                <AccountIncome
                  goldContents={goldContents}
                  commanderData={commanderData}
                  checks={account.checks}
                />
              </SettingAndGold>
              {account.characterOrder.map((name, index) => {
                const character = account.characters.find(
                  ({ CharacterName }) => CharacterName === name
                );
                const contents = account.contents.filter(
                  ({ owner }) => owner === name
                );
                if (!character || !contents) {
                  return null;
                }
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
                            <span>{character.CharacterClassName}</span>
                            <span>Lv {character.ItemMaxLevel}</span>
                          </NameContainer>
                          <div>
                            <ButtonConfigContent
                              accountIndex={accountIndex}
                              characterName={name}
                            />
                            {character.isGoldCharacter && (
                              <CharacterGold
                                checks={account.checks}
                                contents={contents}
                                CharacterName={name}
                              />
                            )}
                          </div>
                        </Character>
                      </CharactersContainer>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
            <DragContents account={account} accountIndex={accountIndex} />
            <DragAccountBtn {...DragHandleProps} />
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default React.memo(DragCharacters);
