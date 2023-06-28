import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect } from "react";
import { AccountOrder } from "../atoms/order";
import { IUserSetting, UserSetting } from "../atoms/userSetting";
import { useRecoilState, useSetRecoilState } from "recoil";

const DashboardStyle = styled.div`
  min-width: 800px;
`;
function Dashboard() {
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);

  useEffect(() => {
    console.log(userSetting);
    console.log(accountOrder);
  }, [accountOrder, userSetting]);

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
