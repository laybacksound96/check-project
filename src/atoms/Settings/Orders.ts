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

const user = {
  user_id: "159263938607972352",
  orders: ["포션오버도즈", "DK너구리", "듦엔"],
};

const account = {
  user_id: "159263938607972352",
  accountName: "포션오버도즈",
  CharacterOrder: ["포션오버도즈", "쁘다람", "gidget"],
  ContentsOrder: ["발탄", "쿠크", "비아"],
};
const character = {
  charcterName: "포션오버도즈",
  serverName: "아만",
  className: "바드",
  level: 1600,
  isGoldCharacter: true,
  isVisible: true,
};
const content = {
  contentName: "발탄",
  characterName: "포션오버도즈",
  isGoldContents: true,
  isCleared: true,
  isVisible: true,
  gate: [
    { isVisible: true, isNormal: false },
    { isVisible: true, isNormal: false },
  ],
};
