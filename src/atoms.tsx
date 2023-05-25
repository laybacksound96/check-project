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

export type IContentsState = { [name: string]: number };

export const ColumnState = atom({
  key: "ColumnState",
  default: [
    { contentName: "A", type: "Default", isVisible: true },
    { contentName: "B", type: "Default", isVisible: true },
    { contentName: "C", type: "Default", isVisible: true },
    { contentName: "D", type: "Default", isVisible: true },
    { contentName: "E", type: "Default", isVisible: false },
    { contentName: "치킨", type: "Custom", isVisible: false },
    { contentName: "피자", type: "Custom", isVisible: true },
  ],
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
