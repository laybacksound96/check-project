import { IUserSetting } from "../../../../../atoms/atoms";

const IsDupplicated = (
  inputName: string,
  UserSetting: IUserSetting
): boolean => {
  for (let accountName in UserSetting) {
    const characters = UserSetting[accountName].CharacterState;
    if (inputName in characters) return true;
  }
  return false;
};

export default IsDupplicated;
