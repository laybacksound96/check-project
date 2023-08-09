import { IAccounts } from "../../../../../../atoms/data";
import { IFetchedCharacter } from "../../AddAccount";
import makeCharacter from "./makeCharacter";
import makeContent from "./makeContent";

const makeDataResult = (data: IFetchedCharacter[]): IAccounts => {
  const { characterOrder, characters: preCharacters } = makeCharacter(data);
  const { contentsOrder, characters } = makeContent(preCharacters);
  const result: IAccounts = {
    characterOrder,
    characters,
    contentsOrder,
  };
  return result;
};
export default makeDataResult;
