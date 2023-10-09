import { atom } from "recoil";

export type ICharacter = {
  _id: string;
  CharacterName: string;
  ItemMaxLevel: number;
  ServerName: string;
  CharacterClassName: string;
  isGoldCharacter: boolean;
};
export interface IGate {
  _id: string;
  isVisible: boolean;
  difficulty: string;
}
export interface IContent {
  _id: string;
  owner: string;
  contentName: string;
  gateSetting: IGate[];
  isVisble: boolean;
  isGoldContents: boolean;
}
export interface ICheck {
  contentName: string;
  characterName: string;
}
export interface IContents {
  _id: string;
  owner: string;
  contents: IContent[];
}
export interface ICharacters {
  _id: string;
  owner: string;
  characters: ICharacter[];
}
export const Contents = atom<IContents[]>({
  key: "Contents",
  default: [],
});
export const Characters = atom<ICharacters[]>({
  key: "Characters",
  default: [],
});
export interface IAccount {
  characterOrder: string[];
  characters_id: string;
  contentsOrder: string[];
  contents_id: string;
  checks: ICheck[];
  owner: string;
  _id: string;
}
export const Accounts = atom<IAccount[]>({
  key: "Accounts",
  default: [],
});

export interface IUser {
  _id: string;
  user_id: string;
  user_name: string;
  discriminator: string;
  global_name?: string;
  banner_color?: string;
  avatar?: string;
  accountOrder: string[];
}

export const User = atom<IUser>({
  key: "User",
  default: {
    user_id: "",
    accountOrder: [],
    user_name: "",
    _id: "",
    discriminator: "",
  },
});
