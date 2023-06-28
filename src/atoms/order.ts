import { atom } from "recoil";

export const AccountOrder = atom<string[]>({
  key: "AccountOrder",
  default: [],
});

interface ICharacterOrders {
  [AccountName: string]: string[];
}

interface IContentsOrders {
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
