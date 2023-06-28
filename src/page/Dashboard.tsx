import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect } from "react";
import { AccountOrder, CharacterOrder, ContentsOrder } from "../atoms/order";
import { UserSetting } from "../atoms/userSetting";
import { useRecoilValue } from "recoil";

const DashboardStyle = styled.div`
  min-width: 800px;
`;
function Dashboard() {
  const characterOrder = useRecoilValue(CharacterOrder);
  const contentsOrder = useRecoilValue(ContentsOrder);
  const accountOrder = useRecoilValue(AccountOrder);
  const userSetting = useRecoilValue(UserSetting);

  useEffect(() => {
    console.log("characterOrder------");
    console.log(characterOrder);
    console.log("contentsOrder------");
    console.log(contentsOrder);
    console.log("userSetting------");
    console.log(userSetting);
    console.log("accountOrder------");
    console.log(accountOrder);
    console.log("==================");
    console.log("==================");
  }, [accountOrder, characterOrder, contentsOrder, userSetting]);

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
