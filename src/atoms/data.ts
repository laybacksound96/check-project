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
  characters_id: string;
  contents_id: string;
};
export type ICharacters = {
  _id: string;
  owner: string;
  characters: {
    CharacterName: string;
    ItemMaxLevel: number;
    ServerName: string;
    CharacterClassName: string;
  }[];
};
export type IContents = {
  _id: string;
  owner: string;
  contents: {
    name: string;
    info: {
      isGoldContents: boolean;
      gateSetting: [
        {
          isVisible: boolean;
          difficulty: string;
        }
      ];
    };
    isVisble: boolean;
  }[];
};

export const Data = atom<IAccount[]>({
  key: "Data",
  default: [],
});
