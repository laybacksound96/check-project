import { atom } from "recoil";

export interface ICharacterInfo {
  [AccountName: string]: {
    [CharacterName: string]: {
      ServerName: string;
      ClassName: string;
      Level: number;
    };
  };
}
export const CharacterInfo = atom<ICharacterInfo>({
  key: "CharacterInfo",
  default: {},
});
