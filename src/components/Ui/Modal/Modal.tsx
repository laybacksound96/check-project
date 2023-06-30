import { ModalEnum } from "../../../atoms/modal";
import ModalContainer from "./ModalContainer";
import AddAccount from "./ModalContents/AddAccount";
import AddContent from "./ModalContents/AddContent";
import ConfigAccount from "./ModalContents/ConfigAccount";
import ConfigContent from "./ModalContents/ConfigContent";
import useModal from "../../../CustomHooks/Modal/useModal";

const Modal = () => {
  const { ADD_ACCOUNT, ADD_CONTENT, CONFIG_ACCOUNT, CONFIG_CONTENT } =
    ModalEnum;
  const [, close, { isModalOpen, modalType }] = useModal();
  return (
    <>
      {isModalOpen && (
        <ModalContainer onClose={() => close()}>
          {modalType === CONFIG_CONTENT && <ConfigContent />}
          {modalType === CONFIG_ACCOUNT && <ConfigAccount />}
          {modalType === ADD_CONTENT && <AddContent />}
          {modalType === ADD_ACCOUNT && <AddAccount />}
        </ModalContainer>
      )}
    </>
  );
};

export default Modal;
