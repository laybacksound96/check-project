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
