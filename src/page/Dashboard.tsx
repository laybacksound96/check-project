import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ContentsFrequency, UserSetting } from "../atoms/atoms";
import { AccountOrder, ContentsOrder } from "../atoms/order";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";

const DashboardStyle = styled.div`
  min-width: 800px;
`;

function Dashboard() {
  // useEffect(() => {
  //   localStorage.setItem("myAtom", "asdd");
  // }, []);

  const userSetting = useRecoilValue(UserSetting);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
  const contentsOrder = useRecoilValue(ContentsOrder);
  const accountOrder = useRecoilValue(AccountOrder);

  useEffect(() => {
    console.log("userSetting");
    console.log(userSetting);

    console.log("ContentsFrequency");
    console.log(contentsFrequency);

    console.log("accountOrder.");
    console.log(accountOrder);

    console.log("contentsOrder");
    console.log(contentsOrder);

    console.log("-------------------------");
    console.log("-------------------------");
  }, [userSetting, contentsOrder, contentsFrequency, accountOrder]);
  return (
    <>
      <Modal />
      <DashboardStyle>
        {/* <HeaderBox /> */}
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
