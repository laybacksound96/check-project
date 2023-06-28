import { IFetchedCharacter } from "../AddAccount";
import makeAccountState from "./makeCharacterSetting";
import makeDefaultCommander from "./makeDefaultCommander";

const makeNewAccount = (
  fetchedCharacters: IFetchedCharacter[]
): IUserSetting => {
  const AccountOwner = fetchedCharacters[0].CharacterName;
  const result: IUserSetting = {
    [`${AccountOwner}`]: {
      CharacterSetting: makeAccountState(fetchedCharacters),
      ContentsSetting: makeDefaultCommander(),
    },
  };
  return result;
};
export default makeNewAccount;
