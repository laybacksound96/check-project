import { atom } from "recoil";

export enum ModalEnum {
  CONFIG_CONTENT = "Value 1",
  CONFIG_ACCOUNT = "Value 2",
  ADD_CONTENT = "Value 3",
  ADD_ACCOUNT = "Value 4",
}

export interface modalProp {
  AccountName: string;
  CharacterName: string;
}
type IModal = IModalObject;
export interface IModalObject {
  isModalOpen: boolean;
  modalType: ModalEnum;
  modalProp: modalProp;
}
export const ModalState = atom<IModal>({
  key: "ModalState",
  default: {
    modalType: ModalEnum.CONFIG_CONTENT,
    isModalOpen: false,
    modalProp: { AccountName: "", CharacterName: "" },
  },
});
