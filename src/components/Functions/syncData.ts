import { IAccounts } from "../../../atoms/data";
import { IFetchData } from "../../../util/fetch";
import makeCharacter from "../../Ui/Modal/ModalContents/functions/AddAccount/makeCharacter";

const syncData = (accounts: IAccounts, data: IFetchData[]): IAccounts => {
  const copiedCharacters = [...accounts.characters];
  data.forEach((user) => {
    const userIndex = copiedCharacters.findIndex(
      ({ characterName }) => characterName === user.CharacterName
    );

    if (userIndex !== -1) {
      copiedCharacters[userIndex] = {
        ...copiedCharacters[userIndex],
        level: parseInt(user.ItemMaxLevel.replace(",", "")),
      };
    } else {
      copiedCharacters.push(makeCharacter(user));
    }
  });
  return { ...accounts, characters: copiedCharacters };
};
export default syncData;
