import { useSetRecoilState } from "recoil";
import { ModalEnum, ModalState, modalProp } from "../../atoms/modal";
type ModalKey = keyof typeof ModalEnum;

function useModal(): [
  (Mode: ModalKey, modalProp?: modalProp) => void,
  () => void
] {
  const setIsModalOpen = useSetRecoilState(ModalState);
  const openModal = (Mode: ModalKey, modalProp?: modalProp) => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = true;
      copiedPrev.modalType = ModalEnum[Mode];
      if (modalProp) return { ...copiedPrev, modalProp };
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
