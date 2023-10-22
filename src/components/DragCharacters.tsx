import { DragDropContext, Draggable, DraggableProvidedDragHandleProps, DropResult, Droppable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import DragContents from "./DragContents";
import { Accounts, Characters, Contents, IAccount, ICharacter, ICharacters, ICheck, IContent, IContents } from "../atoms/data";
import { dragIcon } from "../Settings";
import { AxisLocker } from "./Functions/AxisLocker";
import ButtonConfigAccount from "./ButtonConfigAccount";
import ButtonConfigContent from "./ButtonConfigContent";
import CharacterGold from "./CharacterGold";
import CountGold from "./CountGold";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { CommanderData, ICommander } from "../atoms/commander";
import calculateIncome from "./Functions/calculateIncome";
import CountUp from "react-countup";
import { changeOrder } from "./Functions/changeFunctions";
import { LoginState } from "../atoms/login";
import { useParams } from "react-router-dom";
import { patchOrder } from "../fetch/account";
import { fetchSearchAccount } from "../fetch/api";
import { patchLevel } from "../fetch/character";

interface IStyle {
  loggined: boolean;
}
const DragAccountBtn = styled.div<IStyle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  width: 100px;
  background-color: rgba(100, 100, 100, 0.5);
  border-radius: 10px;
  opacity: ${({ loggined }) => (loggined ? "40%" : "0%")};
  &:hover {
    opacity: ${({ loggined }) => (loggined ? "70%" : "0%")};
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
interface IProps {
  DragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  accountIndex: number;
  account: IAccount;
}
interface ILevelInfo {
  name: string;
  level: number;
}

function DragCharacters({ DragHandleProps, accountIndex, account }: IProps) {
  const { userId } = useParams();
  const loggined = useRecoilValue(LoginState);
  const commanderData = useRecoilValue(CommanderData);
  const setAccounts = useSetRecoilState(Accounts);
  const [characters, setCharacters] = useRecoilState(Characters);
  const contents = useRecoilValue(Contents);
  const [levelInfo, setLevelInfo] = useState<ILevelInfo[] | null>(null);
  useEffect(() => {
    if (account.characterOrder.length === 0) return;

    fetchSearchAccount(account.characterOrder[0])
      .then((fetchedDatas) => {
        const mappedData = fetchedDatas.map((data) => {
          return { name: data.CharacterName, level: parseInt(data.ItemMaxLevel.replace(",", "")) };
        });
        setLevelInfo(mappedData);
      })
      .catch(() => {
        setLevelInfo(null);
      });
  }, []);

  const checkNeedsRefreshLevel = (character: ICharacter, charactersData: ICharacters) => {
    if (!levelInfo || !userId) return;
    const foundChar = levelInfo.find((info) => info.name === character.CharacterName);
    if (!foundChar) return;
    if (character.ItemMaxLevel === foundChar.level) return;
    patchLevel(userId, charactersData._id, foundChar.name, foundChar.level).then((newCharacters) => {
      setCharacters(newCharacters);
    });
    return;
  };

  const findData = (account_id: string) => {
    const charactersData = characters.find(({ owner }) => owner === account_id);
    const contentsData = contents.find(({ owner }) => owner === account_id);
    if (!charactersData || !contentsData) return null;
    return { charactersData, contentsData };
  };
  const findDataByName = (characterName: string, charactersData: ICharacters, contentsData: IContents) => {
    const character = charactersData.characters.find(({ CharacterName }) => CharacterName === characterName);
    const content = contentsData.contents.filter(({ owner }) => owner === characterName);
    if (!character || !content) return null;

    return { character, content };
  };
  const dragCharacterHandler = async (dragInfo: DropResult) => {
    if (!userId) return;
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    if (destination.index === source.index) return;

    const prevOrder = [...account.characterOrder];
    const newOrder = changeOrder(destination, source, prevOrder);
    const newAccount = await patchOrder(userId, account._id, {
      name: "characterOrder",
      order: newOrder,
    });
    if (!newAccount) return;

    setAccounts((prev) => {
      const copiedAccounts = [...prev];
      copiedAccounts[accountIndex] = newAccount;
      return copiedAccounts;
    });
    return;
  };
  const filterGoldContents = (contents: IContent[]) => {
    const result = contents.filter(
      ({ isVisble, isGoldContents, owner }) => isVisble === true && isGoldContents === true && account.characterOrder.includes(owner)
    );
    return result;
  };
  const calculateCheckedIncome = (goldContents: IContent[], commanderData: ICommander[], checks: ICheck[]) => {
    let gold = 0;
    checks.forEach(({ characterName, contentName }) => {
      const commander = commanderData.find(({ name: commanderName }) => commanderName === contentName);
      const content = goldContents.find(({ contentName: cont, owner }) => cont === contentName && characterName === owner);

      if (!commander || !content) return;
      const difficulty = content.gateSetting.filter(({ isVisible }) => isVisible === true).map(({ difficulty }) => difficulty);
      difficulty.forEach((difficulty, index) => {
        const gate = commander.data.find(({ difficulty: diff }) => difficulty === diff);
        if (!gate) return;
        gold += gate.gates[index].gold;
      });
    });
    return gold;
  };
  const data = findData(account._id);
  if (!data) return null;
  const { charactersData, contentsData } = data;
  const goldContents = filterGoldContents(contentsData.contents);

  return (
    <DragDropContext onDragEnd={dragCharacterHandler}>
      <Droppable droppableId={account._id}>
        {(provided) => (
          <Container loggined={loggined}>
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <SettingAndGold>
                <ButtonConfigAccount index={accountIndex} />
                <AccountIncomeContainer>
                  <span>계정 획득 골드</span>
                  <div>
                    <FontAwesomeIcon icon={faCoins} />
                    <CountGold income={calculateCheckedIncome(goldContents, commanderData, account.checks)} />
                    <span>/</span>
                    <CountUp start={calculateIncome(goldContents, commanderData)} end={calculateIncome(goldContents, commanderData)} />
                  </div>
                </AccountIncomeContainer>
              </SettingAndGold>
              {account.characterOrder.map((name, index) => {
                const dataByName = findDataByName(name, charactersData, contentsData);
                if (!dataByName) return null;
                const { character, content } = dataByName;

                checkNeedsRefreshLevel(character, charactersData);
                return (
                  <Draggable key={name} draggableId={name} index={index} isDragDisabled={!loggined}>
                    {(provided) => (
                      <CharactersContainer
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={AxisLocker(provided.draggableProps.style!, false)}
                      >
                        <Character {...provided.dragHandleProps}>
                          <NameContainer>
                            <h1>{name}</h1>
                            <span>{character.CharacterClassName}</span>
                            <span>Lv {character.ItemMaxLevel}</span>
                          </NameContainer>
                          <div>
                            <ButtonConfigContent accountIndex={accountIndex} characterName={name} />
                            {character.isGoldCharacter && <CharacterGold checks={account.checks} contents={content} CharacterName={name} />}
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
            <DragAccountBtn {...DragHandleProps} loggined={loggined} />
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default React.memo(DragCharacters);
