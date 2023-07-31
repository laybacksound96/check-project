import { atom } from "recoil";

export const Order = atom<string[]>({
  key: "Order",
  default: [],
});

export interface IAccounts {
  accountName: string;
  characterOrder: string[];
  contentsOrder: string[];
}
export const Accounts = atom<IAccounts[]>({
  key: "Accounts",
  default: [],
});

export interface ICharacters {
  characterName: string;
  serverName: string;
  className: string;
  level: number;
  isGoldCharacter: boolean;
  isVisible: boolean;
}
export const Characters = atom<ICharacters[]>({
  key: "Characters",
  default: [],
});

export interface IGate {
  isVisible: boolean;
  isNormal: boolean;
}
export interface IContent {
  contentName: string;
  characterName: string;
  isGoldContents: boolean;
  isCleared: boolean;
  isVisible: boolean;
  gates: IGate[];
}
export const Contents = atom<IContent[]>({
  key: "Contents",
  default: [],
});
