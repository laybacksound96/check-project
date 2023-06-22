import { atom } from "recoil";

export type IContentsOrder = string[];
export type ICharacterOrder = string[];

export interface IAccountOrder {
  AccountName: string;
  ContentsOrder: IContentsOrder;
  CharacterOrder: ICharacterOrder;
}

export const AccountOrder = atom<IAccountOrder[]>({
  key: "AccountOrder",
  default: [],
});
