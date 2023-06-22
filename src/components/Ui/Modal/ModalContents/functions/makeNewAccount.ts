import { IUserSetting } from "../../../../../atoms/atoms";
import { IFetchedCharacter } from "../AddAccount";
import makeAccountState from "./makeAccountState";
import makeDefaultCommander from "./makeDefaultCommander";

const makeNewAccount = (fetchedCharacters: IFetchedCharacter[]) => {
  const AccountOwner = fetchedCharacters[0].CharacterName;
  const AccountState = makeAccountState(fetchedCharacters);
  const result: IUserSetting = {
    [`${AccountOwner}`]: {
      AllContentState: makeDefaultCommander(),
      CharacterState: AccountState,
    },
  };
  return result;
};
export default makeNewAccount;
