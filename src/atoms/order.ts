import { atom } from "recoil";

export interface IAccountOrder {
  AccountName: string;
  CharacterOrder: string[];
}
export interface Contents {
  ["name"]: string;
  ["width"]: number;
}

export const AccountOrder = atom<IAccountOrder[]>({
  key: "AccountOrder",
  default: [],
});

export const VisibledColumns = atom<Contents[]>({
  key: "visibledColumns",
  default: [],
});
