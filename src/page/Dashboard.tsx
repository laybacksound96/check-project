import Modal from "../components/Ui/Modal/Modal";
import { useRecoilState } from "recoil";
import { ModalEnum, ModalState } from "../atoms";
import { AddContent } from "../components/Ui/Modal/ModalContents";
import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import CheckBox from "../components/DashBoard/CheckBox/Checkbox";

function Dashboard(props: any) {
  const [IsModalOpen, setIsModalOpen] = useRecoilState(ModalState);
  const closeModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = false;
      return copiedPrev;
    });
  };

  return (
    <>
      <Modal onClose={closeModal} onOpen={IsModalOpen.isModalOpen}>
        {ModalEnum.ADD_CONTENT && <AddContent />}
      </Modal>
      <div style={{ minWidth: "800px" }}>
        <HeaderBox />
        <CheckBox />
      </div>
    </>
  );
}

export default Dashboard;
