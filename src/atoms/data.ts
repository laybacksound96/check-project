import { atom } from "recoil";

type IUserData = string[];
export const UserData = atom<IUserData>({
  key: "UserData",
  default: ["포션오버도즈", "DK너구리", "듦엔"],
});

const account = {
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
