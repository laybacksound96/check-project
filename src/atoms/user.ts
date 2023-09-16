import { atom } from "recoil";
import { IFetchedData } from "../util/fetch";

export const UserState = atom<IFetchedData | "GUEST">({
  key: "UserState",
  default: "GUEST",
});
