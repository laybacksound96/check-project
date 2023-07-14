import { atom } from "recoil";

export const LoginState = atom<boolean>({
  key: "LoginAtom",
  default: false,
});
