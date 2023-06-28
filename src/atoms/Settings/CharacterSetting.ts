import { atom } from "recoil";

export interface ICharacterSetting {
  [AccountName: string]: {
    [CharacterName: string]: {
      IsGoldCharacter: boolean;
      isVisible: boolean;
      TotalGold: number;
    };
  };
}
export const CharacterSetting = atom<ICharacterSetting>({
  key: "CharacterSetting",
  default: {},
});
