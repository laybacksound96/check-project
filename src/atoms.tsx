import { atom } from "recoil";

interface ICheckbox {
  [Content: string]: boolean;
}
interface ICheckCharacters {
  [Character: string]: ICheckbox;
}
export type ICheckAccounts = { [accountName: string]: ICheckCharacters };
export const CheckboxesState = atom<ICheckAccounts>({
  key: "CheckboxesState",
  default: {},
});

interface IContentState {
  type: "Default" | "Custom";
  isVisible: boolean;
}
export interface IContents {
  [CharacterName: string]: IContentState;
}
export const ContentsState = atom<IContents>({
  key: "ContentsState",
  default: {
    A: { type: "Default", isVisible: true },
    B: { type: "Default", isVisible: true },
    C: { type: "Default", isVisible: true },
    D: { type: "Default", isVisible: true },
    E: { type: "Default", isVisible: false },
    치킨: { type: "Custom", isVisible: false },
    피자: { type: "Custom", isVisible: true },
  },
});

export const VisibledColumns = atom<string[]>({
  key: "visibledColumns",
  default: [],
});

export enum ModalEnum {
  CONFIG_CONTENT = "Value 1",
  ADD_CONTENT = "Value 2",
  VALUE3 = "Value 3",
}
type IModal = IModalObject;
interface IModalObject {
  isModalOpen: boolean;
  modalType?: ModalEnum;
}
export const ModalState = atom<IModal>({
  key: "ModalState",
  default: { isModalOpen: false },
});
