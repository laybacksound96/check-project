import Modal from "../components/Ui/Modal/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AccountOrder,
  AccountState,
  CheckboxesState,
  ContentsState,
  ModalEnum,
  ModalState,
  VisibledColumns,
} from "../atoms";

import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import CheckBox from "../components/DashBoard/CheckBox/Checkbox";
import ConfigContent from "../components/Ui/Modal/ModalContents/ConfigContent";
import AddContent from "../components/Ui/Modal/ModalContents/AddContent";
import AddAccount from "../components/Ui/Modal/ModalContents/AddAccount";
import { useEffect } from "react";

function Dashboard() {
  const [IsModalOpen, setIsModalOpen] = useRecoilState(ModalState);

  const checkboxesState = useRecoilValue(CheckboxesState);
  const contentsState = useRecoilValue(ContentsState);
  const visibledColumns = useRecoilValue(VisibledColumns);
  const accountOrder = useRecoilValue(AccountOrder);
  const accountState = useRecoilValue(AccountState);
  const closeModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = false;
      return copiedPrev;
    });
  };
  useEffect(() => {
    console.log("checkboxesState");
    console.log(checkboxesState);

    console.log("contentsState");
    console.log(contentsState);

    console.log("visibledColumns");
    console.log(visibledColumns);

    console.log("accountOrder.");
    console.log(accountOrder);

    console.log("AccountState");
    console.log(accountState);
    console.log("-------------------------");
    console.log("-------------------------");
  }, [
    checkboxesState,
    contentsState,
    visibledColumns,
    accountOrder,
    accountState,
  ]);
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
