import { atom } from "recoil";

export interface ICharacterOrders {
  [AccountName: string]: string[];
}
export interface IContentsOrders {
  [AccountName: string]: string[];
}
export const CharacterOrder = atom<ICharacterOrders>({
  key: "CharacterOrder",
  default: {},
});
export const ContentsOrder = atom<IContentsOrders>({
  key: "ContentsOrder",
  default: {},
});
export const AccountOrder = atom<string[]>({
  key: "AccountOrder",
  default: [],
});
