import { IUserSetting } from "../../../../../atoms/userSetting";

const IsDupplicated = (
  inputName: string,
  UserSetting: IUserSetting
): boolean => {
  for (let accountName in UserSetting) {
    const characters = UserSetting[accountName].CharacterSetting;
    if (inputName in characters) return true;
  }
  return false;
};

export default IsDupplicated;
