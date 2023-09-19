import { atom } from "recoil";
export type IAccount = {
  _id: string;
  owner: string;
  characterOrder: string[];
  contentsOrder: string[];
  checks: {
    contentName: string;
    characterName: string;
  }[];
  characters: {
    owner: string;
    _id: string;
    characters: ICharacters[];
  };
  contents: {
    owner: string;
    _id: string;
    characters: IContents[];
  };
  contents_id: string;
};
export type ICharacters = {
  CharacterName: string;
  ItemMaxLevel: number;
  ServerName: string;
  CharacterClassName: string;
  _id: string;
};
export type IContents = {
  _id: string;
  owner: string;
  contents: {
    name: string;
    isGoldContents: boolean;
    gateSetting: {
      isVisible: boolean;
      difficulty: string;
    }[];
    isVisble: boolean;
  }[];
};

export const Account = atom<IAccount[]>({
  key: "Account",
  default: [],
});
