import { atom } from "recoil";

export const ModalAddAcount = atom<boolean>({
  key: "ModalAddacount",
  default: false,
});
export const ModalAddContents = atom<boolean>({
  key: "ModalAddContents",
  default: false,
});
export const ModalConfigAccount = atom<boolean>({
  key: "ModalConfigAccount",
  default: false,
});
export const ModalConfigContents = atom<boolean>({
  key: "ModalConfigContents",
  default: false,
});
