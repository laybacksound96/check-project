import { IUserSetting } from "../../../../../atoms/atoms";

const IsDupplicated = (name: string, UserSetting: IUserSetting): boolean => {
  for (let accountName in UserSetting) {
    const characters = UserSetting[accountName].CharacterState;
    if (name in characters) return true;
  }
  return false;
};

export default IsDupplicated;
