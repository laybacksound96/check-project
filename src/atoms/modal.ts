import { atom } from "recoil";

export const ModalAddAcountAtom = atom<boolean>({
  key: "ModalAddacount",
  default: false,
});
export const ModalAddContentsAtom = atom<boolean>({
  key: "ModalAddContents",
  default: false,
});
export const ModalConfigAccountAtom = atom<{ status: boolean; index: number }>({
  key: "ModalConfigAccount",
  default: { status: false, index: 0 },
});
export const ModalConfigContentsAtom = atom<{
  status: boolean;
  data?: { characterName: string; accountIndex: number };
}>({
  key: "ModalConfigContents",
  default: { status: false },
});
