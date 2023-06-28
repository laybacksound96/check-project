import { atom } from "recoil";
export interface Setting {
  IsGoldCharacter: boolean;
  isVisible: boolean;
  TotalGoldIncome: number;
}
export interface AccountSetting {
  [CharacterName: string]: Setting;
}
export interface ICharacterSetting {
  [AccountName: string]: AccountSetting;
}
export const CharacterSetting = atom<ICharacterSetting>({
  key: "CharacterSetting",
  default: {},
});
