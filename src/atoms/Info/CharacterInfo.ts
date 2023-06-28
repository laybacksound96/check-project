import { atom } from "recoil";
export interface Info {
  ServerName: string;
  ClassName: string;
  Level: number;
}

export interface AccountInfo {
  [CharacterName: string]: Info;
}
export interface ICharacterInfo {
  [AccountName: string]: AccountInfo;
}
export const CharacterInfo = atom<ICharacterInfo>({
  key: "CharacterInfo",
  default: {},
});
