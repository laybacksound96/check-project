import { atom } from "recoil";

export interface IAccountOrder {
  AccountName: string;
  CharacterOrder: string[];
}
export const AccountOrder = atom<IAccountOrder[]>({
  key: "AccountOrder",
  default: [],
});
