import { atom } from "recoil";
export const Accounts = atom<IAccounts[]>({
  key: "Accounts",
  default: [],
});
export interface IAccounts {
  _id?: string;
  characterOrder: string[];
  contentsOrder: string[];
  characters: ICharacters[];
}
export interface ICharacters {
  characterName: string;
  serverName: string;
  className: string;
  level: number;
  contents: IContents[];
}
export interface IContents {
  contentName: string;
  isGoldContents: boolean;
  isVisible: boolean;
  gates: IGates[];
}
export interface IGates {
  isVisible: boolean;
  isNormal: boolean;
}
