import { IUserSetting } from "../../../../../atoms/userSetting";
import { IFetchedCharacter } from "../AddAccount";
import makeAccountState from "./makeCharacterSetting";
import makeDefaultCommander from "./makeDefaultCommander";

const makeNewAccount = (
  fetchedCharacters: IFetchedCharacter[]
): IUserSetting => {
  const AccountOwner = fetchedCharacters[0].CharacterName;
  const AccountState = makeAccountState(fetchedCharacters);
  const result: IUserSetting = {
    [`${AccountOwner}`]: {
      ContentsSetting: makeDefaultCommander(),
      CharacterSetting: AccountState,
    },
  };
  return result;
};
export default makeNewAccount;
