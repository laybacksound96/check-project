import { IUserSetting } from "../../../../../atoms/atoms";
import { IFetchedCharacter } from "../AddAccount";
import makeAccountState from "./makeCharacterSetting";
import makeDefaultCommander from "./makeDefaultCommander";

const makeNewAccount = (fetchedCharacters: IFetchedCharacter[]) => {
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
