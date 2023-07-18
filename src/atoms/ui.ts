import { atom } from "recoil";

export const IsFocused = atom<boolean>({
  key: "IsFocused",
  default: false,
});
