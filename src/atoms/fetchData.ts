import { ICheck, ICharacter, IContent } from "./data";

export interface IFetchedUserData {
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
}

export interface ISearchedAccounts {
  owner: {
    user_name: string;
    discriminator: string;
    global_name: string;
    banner_color: string;
    avatar: string;
    _id: string;
  };
  characterOrder: string[];
}
export interface ISearchedData {
  username: string;
  accounts: ISearchedAccounts[];
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
