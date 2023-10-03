import { ICommander } from "../atoms/commander";
import { IAccountOrder, ICharacter, IContent, IGate } from "../atoms/data";
import { fetchSearchAccount, fetchedData } from "./fetch";

const makeCharacter = ({
  CharacterName,
  CharacterClassName,
  ServerName,
  ItemMaxLevel,
}: fetchedData): ICharacter => {
  const result: ICharacter = {
    CharacterName,
    CharacterClassName,
    ServerName,
    isGoldCharacter: false,
    ItemMaxLevel: parseInt(ItemMaxLevel.replace(",", "")),
  };
  return result;
};
const makeContent = (
  character: ICharacter,
  commander: ICommander
): IContent => {
  const makeGateSetting = (): IGate[] => {
    const result: IGate[] = [];
    const normalGate = commander.data[0].gates;
    for (let i in normalGate) {
      if (normalGate[i].level <= character.ItemMaxLevel) {
        if (commander.data.length > 1) {
          const hardGate = commander.data[1].gates;
          if (hardGate[i].level <= character.ItemMaxLevel) {
            result.push({ difficulty: "hard", isVisible: true });
          } else {
            result.push({ difficulty: "normal", isVisible: true });
          }
        } else {
          result.push({ difficulty: "normal", isVisible: true });
        }
      } else {
        result.push({ difficulty: "normal", isVisible: false });
      }
    }
    return result;
  };
  const result: IContent = {
    owner: character.CharacterName,
    contentName: commander.name,
    gateSetting: makeGateSetting(),
    isVisble: false,
    isGoldContents: false,
  };
  return result;
};

const refreshAccount = async (
  account: IAccountOrder,
  commanders: ICommander[]
) => {
  const copiedAccount = { ...account };
  const copiedContents = [...copiedAccount.contents];
  const copiedCharacters = [...copiedAccount.characters];
  const fetchedData = await fetchSearchAccount(
    copiedCharacters[0].CharacterName
  );
  for (let j in fetchedData) {
    const targetLevel = parseInt(fetchedData[j].ItemMaxLevel.replace(",", ""));
    const targetName = fetchedData[j].CharacterName;
    const characterIndex = copiedCharacters.findIndex(
      ({ CharacterName }) => CharacterName === targetName
    );
    if (characterIndex === -1) {
      continue;
      //   const newCharacter = makeCharacter(fetchedData[j]);
      //   const newCommanders = commanders.map((commander) =>
      //     makeContent(newCharacter, commander)
      //   );
      //   newCommanders.forEach((commander) => copiedContents.push(commander));
      //   copiedCharacters.push(newCharacter);
    } else {
      const isEqualLevel =
        copiedCharacters[characterIndex].ItemMaxLevel === targetLevel;
      if (isEqualLevel) {
        continue;
      } else {
        const copiedCharacter = {
          ...copiedCharacters[characterIndex],
          ItemMaxLevel: targetLevel,
        };
        copiedCharacters[characterIndex] = copiedCharacter;
      }
    }
  }
  copiedAccount.characters = copiedCharacters;
  copiedAccount.contents = copiedContents;
  return copiedAccount;
};

export default refreshAccount;
