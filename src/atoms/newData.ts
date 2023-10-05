import { atom } from "recoil";

interface IChecks {
  contentName: string;
  characterName: string;
}
interface IAccounts {
  _id: string;
  owner: string;
  characterOrder: string[];
  contentsOrder: string[];
  characters: string;
  contents: string;
  checks: IChecks[];
}
export const Accounts = atom<IAccounts[]>({
  key: "accounts",
});
interface IUser {
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
  key: "user",
});
