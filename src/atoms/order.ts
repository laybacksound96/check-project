import { atom } from "recoil";
type IContentsOrder = string[];
type ICharacterOrder = string[];

export interface IAccountOrder {
  AccountName: string;
  ContentsOrder: IContentsOrder[];
  CharacterOrder: ICharacterOrder[];
}

export const AccountOrder = atom<IAccountOrder[]>({
  key: "AccountOrder",
  default: [],
});
