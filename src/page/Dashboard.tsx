import Modal from "../components/Ui/Modal/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AccountState,
  CheckBoxConfig,
  ContentsFrequency,
  ContentsState,
} from "../atoms/atoms";

import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import CheckBox from "../components/DashBoard/CheckBox/Checkbox";
import ConfigContent from "../components/Ui/Modal/ModalContents/ConfigContent";
import AddContent from "../components/Ui/Modal/ModalContents/AddContent";
import AddAccount from "../components/Ui/Modal/ModalContents/AddAccount";
import { useEffect } from "react";
import ConfigAccount from "../components/Ui/Modal/ModalContents/ConfigAccount";
import { ModalState, ModalEnum } from "../atoms/modal";
import styled from "styled-components";
import { AccountOrder, VisibledColumns } from "../atoms/order";
const DashboardStyle = styled.div`
  min-width: 800px;
`;
function Dashboard() {
  const [IsModalOpen, setIsModalOpen] = useRecoilState(ModalState);
  const checkBoxConfig = useRecoilValue(CheckBoxConfig);
  const contentsState = useRecoilValue(ContentsState);
  const visibledColumns = useRecoilValue(VisibledColumns);
  const accountOrder = useRecoilValue(AccountOrder);
  const accountState = useRecoilValue(AccountState);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
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
  useEffect(() => {
    console.log("checkBoxConfig");
    console.log(checkBoxConfig);

    console.log("contentsState");
    console.log(contentsState);

    console.log("visibledColumns");
    console.log(visibledColumns);

    console.log("ContentsFrequency");
    console.log(contentsFrequency);

    console.log("accountOrder.");
    console.log(accountOrder);

    console.log("AccountState");
    console.log(accountState);
    console.log("-------------------------");
    console.log("-------------------------");
  }, [
    checkBoxConfig,
    contentsState,
    visibledColumns,
    contentsFrequency,
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
          {IsModalOpen.modalType === ModalEnum.CONFIG_ACCOUNT && (
            <ConfigAccount />
          )}
          {IsModalOpen.modalType === ModalEnum.ADD_CONTENT && <AddContent />}
          {IsModalOpen.modalType === ModalEnum.ADD_ACCOUNT && <AddAccount />}
        </Modal>
      )}
      <DashboardStyle>
        <HeaderBox />
        <CheckBox />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
