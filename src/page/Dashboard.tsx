import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ContentsState, AccountState, ContentsFrequency } from "../atoms/atoms";
import { AccountOrder, ContentsOrder } from "../atoms/order";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";

const DashboardStyle = styled.div`
  min-width: 800px;
`;

function Dashboard() {
  // useEffect(() => {
  //   localStorage.setItem("myAtom", "asdd");
  // }, []);

  const contentsState = useRecoilValue(ContentsState);
  const contentsOrder = useRecoilValue(ContentsOrder);
  const accountOrder = useRecoilValue(AccountOrder);
  const accountState = useRecoilValue(AccountState);
  const contentsFrequency = useRecoilValue(ContentsFrequency);

  useEffect(() => {
    console.log("contentsState");
    console.log(contentsState);

    console.log("ContentsFrequency");
    console.log(contentsFrequency);

    console.log("AccountState");
    console.log(accountState);

    console.log("accountOrder.");
    console.log(accountOrder);

    console.log("contentsOrder");
    console.log(contentsOrder);

    console.log("-------------------------");
    console.log("-------------------------");
  }, [
    contentsState,
    contentsOrder,
    contentsFrequency,
    accountOrder,
    accountState,
  ]);
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
