import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect, useState } from "react";
import { IFetchedData } from "../util/fetch";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { LoginState } from "../atoms/login";
import { useParams } from "react-router";
import { IsFocused } from "../atoms/ui";
import { Accounts } from "../atoms/data";
import patchData from "../util/patchData";
import { ContentsFrequency } from "../atoms/frequency";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  userData?: IFetchedData;
  isEditable: boolean;
}

export type ISync = "success" | "error" | "inprogress" | null;
function Dashboard({ userData, isEditable }: IProps) {
  const setIsFocused = useSetRecoilState(IsFocused);
  const [accounts, setAccounts] = useRecoilState(Accounts);
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [isSync, setIsSync] = useState<ISync>(null);
  const { userId } = useParams();

  const contentsFrequency = useRecoilValue(ContentsFrequency);
  useEffect(() => {
    //새로고침시 data fetching 하는 함수
    setLoginState(isEditable);
    if (!userData) return;
    try {
      setAccounts(userData.data.accountOrder);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (!isEditable) return;
    if (!userData) {
    } else {
      if (!userId) return;
      patchData(userId, accounts, setIsSync);
    }
  }, [accounts, isEditable, userData, userId]);
  useEffect(() => {
    console.log("accounts");
    console.log(accounts);
    console.log("  ");
  }, [accounts]);
  useEffect(() => {
    console.log("contentsFrequency");
    console.log(contentsFrequency);
    console.log("  ");
  }, [contentsFrequency]);
  return (
    <>
      <Modal />
      <DashboardStyle onClick={() => setIsFocused(false)}>
        <HeaderBox userData={userData ? userData : "GUEST"} isSync={isSync} />
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
