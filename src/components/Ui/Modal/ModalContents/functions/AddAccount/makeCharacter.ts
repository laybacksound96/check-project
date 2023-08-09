import { ICharacters } from "../../../../../../atoms/data";
import { IFetchedCharacter } from "../../AddAccount";

const makeCharacter = (data: IFetchedCharacter[]) => {
  const characterOrder = [];
  const characters: ICharacters[] = [];
  for (let i in data) {
    const {
      ServerName: serverName,
      ItemMaxLevel,
      CharacterName: characterName,
      CharacterClassName: className,
    } = data[i];
    characters.push({
      characterName,
      className,
      level: parseInt(ItemMaxLevel.replace(",", "")),
      serverName,
      contents: [],
    });
    if (+i < 6) characterOrder.push(characterName);
  }
  return { characterOrder, characters };
};
export default makeCharacter;
