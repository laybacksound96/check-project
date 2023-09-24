import { atom } from "recoil";

export type ICharacter = {
  _id?: string;
  CharacterName: string;
  ItemMaxLevel: number;
  ServerName: string;
  CharacterClassName: string;
  isGoldCharacter: boolean;
};
export interface IGate {
  isVisible: boolean;
  difficulty: string;
}
export interface IContent {
  _id?: string;
  owner: string;
  contentName: string;
  gateSetting: IGate[];
  isVisble: boolean;
  isGoldContents: boolean;
}
export interface ICheck {
  _id?: string;
  contentName: string;
  characterName: string;
}

export type IAccountOrder = {
  _id: string;
  characterOrder: string[];
  contentsOrder: string[];
  characters: ICharacter[];
  contents: IContent[];
  checks: ICheck[];
};

export const AccountOrder = atom<IAccountOrder[]>({
  key: "AccountOrder",
  default: [],
});
