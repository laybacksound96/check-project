import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { UserSetting } from "../atoms/userSetting";
import { AccountOrder } from "../atoms/order";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { ContentsFrequency } from "../atoms/frequency";
import { ModalState } from "../atoms/modal";

const DashboardStyle = styled.div`
  min-width: 800px;
`;

function Dashboard() {
  const userSetting = useRecoilValue(UserSetting);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
  const accountOrder = useRecoilValue(AccountOrder);
  const modalState = useRecoilValue(ModalState);
  useEffect(() => {
    console.log("userSetting");
    console.log(userSetting);

    console.log("ContentsFrequency");
    console.log(contentsFrequency);

    console.log("accountOrder.");
    console.log(accountOrder);

    console.log("modalState.");
    console.log(modalState);

    console.log("-------------------------");
    console.log("-------------------------");
  }, [userSetting, contentsFrequency, accountOrder, modalState]);
  return (
    <>
      <Modal />
      <DashboardStyle>
        <HeaderBox />
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
