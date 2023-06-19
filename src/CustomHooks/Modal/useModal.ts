import { useSetRecoilState } from "recoil";
import { ModalEnum, ModalState, modalProp } from "../../atoms/modal";
type ModalKey = keyof typeof ModalEnum;

function useModal(
  Mode: ModalKey,
  Prop?: modalProp
): [(openModal: void) => void, (closeModal: void) => void] {
  const setIsModalOpen = useSetRecoilState(ModalState);
  const openModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = true;
      copiedPrev.modalType = ModalEnum[Mode];
      if (Prop) return { ...copiedPrev, modalProp: Prop };
      return { ...copiedPrev };
    });
  };
  const closeModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = false;
      copiedPrev.modalProp = {
        AccountName: "",
        CharacterName: "",
      };
      return copiedPrev;
    });
  };
  return [openModal, closeModal];
}

export default useModal;
