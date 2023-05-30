import Modal from "../components/Ui/Modal/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CheckboxesState,
  ContentsState,
  ModalEnum,
  ModalState,
} from "../atoms";

import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import CheckBox from "../components/DashBoard/CheckBox/Checkbox";
import ConfigContent from "../components/Ui/Modal/ModalContents/ConfigContent";
import AddContent from "../components/Ui/Modal/ModalContents/AddContent";
import AddAccount from "../components/Ui/Modal/ModalContents/AddAccount";

function Dashboard() {
  const [IsModalOpen, setIsModalOpen] = useRecoilState(ModalState);
  const closeModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = false;
      return copiedPrev;
    });
  };

  const Checkbox = useRecoilValue(CheckboxesState);
  const Contents = useRecoilValue(ContentsState);
  console.log(Checkbox);
  console.log(Contents);
  return (
    <>
      {IsModalOpen.isModalOpen && (
        <Modal onClose={closeModal}>
          {IsModalOpen.modalType === ModalEnum.CONFIG_CONTENT && (
            <ConfigContent />
          )}
          {IsModalOpen.modalType === ModalEnum.ADD_CONTENT && <AddContent />}
          {IsModalOpen.modalType === ModalEnum.ADD_ACCOUNT && <AddAccount />}
        </Modal>
      )}
      <div style={{ minWidth: "800px" }}>
        <HeaderBox />
        <CheckBox />
      </div>
    </>
  );
}

export default Dashboard;
