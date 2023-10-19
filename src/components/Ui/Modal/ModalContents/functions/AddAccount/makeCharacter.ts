import { ICharacters } from "../../../../../../atoms/data";
import { CommanderData } from "../../../../../../json/CommanderData";
import { IFetchData } from "../../../../../../util/fetch";
import makeGates from "./makeGates";

const makeCharacter = (user: IFetchData): ICharacters => {
  const commanderData = CommanderData;

  const {
    CharacterName: characterName,
    CharacterClassName: className,
    ServerName: serverName,
    ItemMaxLevel,
  } = user;

  const characters: ICharacters = {
    characterName,
    className,
    level: parseInt(ItemMaxLevel.replace(",", "")),
    serverName,
    contents: [],
  };

  for (let j in commanderData) {
    const { contentName, gates } = commanderData[j];
    characters.contents.push({
      contentName,
      isVisible: false,
      isGoldContents: false,
      gates: makeGates(characters.level, gates),
    });
  }

  return characters;
};
export default makeCharacter;
