import { useRecoilState } from "recoil";
import { ModalEnum, ModalState } from "../../../atoms/modal";
import ModalContainer from "./ModalContainer";
import AddAccount from "./ModalContents/AddAccount";
import AddContent from "./ModalContents/AddContent";
import ConfigAccount from "./ModalContents/ConfigAccount";
import ConfigContent from "./ModalContents/ConfigContent";

const Modal = () => {
  const [IsModalOpen, setIsModalOpen] = useRecoilState(ModalState);
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
  return (
    <>
      {IsModalOpen.isModalOpen && (
        <ModalContainer onClose={closeModal}>
          {/* {IsModalOpen.modalType === ModalEnum.CONFIG_CONTENT && (
            <ConfigContent />
          )}
          {IsModalOpen.modalType === ModalEnum.CONFIG_ACCOUNT && (
            <ConfigAccount />
          )}
          {IsModalOpen.modalType === ModalEnum.ADD_CONTENT && <AddContent />} */}
          {IsModalOpen.modalType === ModalEnum.ADD_ACCOUNT && <AddAccount />}
        </ModalContainer>
      )}
    </>
  );
};

export default Modal;
