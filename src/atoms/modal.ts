import { atom } from "recoil";

export enum ModalEnum {
  CONFIG_CONTENT = "계정 설정",
  CONFIG_ACCOUNT = "컨텐츠 설정",
  ADD_CONTENT = "컨텐츠 추가",
  ADD_ACCOUNT = "계정 추가",
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
