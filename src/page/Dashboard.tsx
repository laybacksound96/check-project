import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import CheckBox from "../components/DashBoard/CheckBox/Checkbox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  CheckBoxConfig,
  ContentsState,
  AccountState,
  ContentsFrequency,
} from "../atoms/atoms";
import { VisibledColumns, AccountOrder } from "../atoms/order";

const DashboardStyle = styled.div`
  min-width: 800px;
`;

function Dashboard() {
  useEffect(() => {
    localStorage.setItem("myAtom", "asdd");
  }, []);
  const checkBoxConfig = useRecoilValue(CheckBoxConfig);
  const contentsState = useRecoilValue(ContentsState);
  const visibledColumns = useRecoilValue(VisibledColumns);
  const accountOrder = useRecoilValue(AccountOrder);
  const accountState = useRecoilValue(AccountState);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
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
      <Modal />
      <DashboardStyle>
        <HeaderBox />
        <CheckBox />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
