import { atom } from "recoil";
import { ICheck, ICharacter, IContent } from "./data";

export interface IFetchedData {
  user: {
    user_id: string;
    user_name: string;
    global_name: string;
    discriminator: string;
    banner_color: string;
    data: {
      text: string;
    };
    ownCharacters: string[];
    accountOrder: string[];
    _id: string;
  };
  isLoggined: boolean;
}
export interface ISearchedData {
  user_id: string;
  global_name: string | null;
  user_name: string;
  discriminator: string;
}

export type IFetchedAccount = {
  owner: string;
  _id: string;
  characterOrder: string[];
  contentsOrder: string[];
  checks: ICheck[];
  characters: {
    owner: string;
    _id: string;
    characters: ICharacter[];
  };
  contents: {
    owner: string;
    _id: string;
    contents: IContent[];
  };
};
export const UserState = atom<IFetchedData | "GUEST">({
  key: "UserState",
  default: "GUEST",
});
