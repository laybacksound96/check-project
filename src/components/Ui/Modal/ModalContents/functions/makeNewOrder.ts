import { IUserSetting } from "../../../../../atoms/userSetting";

const makeNewOrder = (AccountName: string, newAccount: IUserSetting) => {
  const { CharacterSetting, ContentsSetting } = newAccount[AccountName];
  const CharacterOrder = Object.keys(CharacterSetting).filter(
    (name) => CharacterSetting[name].isVisible
  );
  const ContentsOrder = Object.keys(ContentsSetting).filter(
    (name) => ContentsSetting[name].isVisible
  );
  const result = {
    CharacterOrder,
    ContentsOrder,
  };
  return result;
};
export default makeNewOrder;
