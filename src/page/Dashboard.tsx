import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect, useState } from "react";
import { ICommanderData, IFetchedData, getAccountData } from "../util/fetch";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { UserState } from "../atoms/user";
import { AccountOrder } from "../atoms/Settings/Orders";
import { LoginState } from "../atoms/login";
import { Account } from "../atoms/data";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  data: [IFetchedData, ICommanderData];
}

function Dashboard({ data: [userData, commanderData] }: IProps) {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useRecoilState(Account);
  const [loggined, setLoggined] = useRecoilState(LoginState);
  const [userState, setUserState] = useRecoilState(UserState);
  useEffect(() => {
    setUserState(userData);
    Promise.all(
      userData.user.accountOrder.map((id) => getAccountData(id))
    ).then((value) => {
      setAccount(value);
      setLoading(false);
    });
  }, [setAccount, setUserState, userData]);
  useEffect(() => {
    if (userState === "GUEST" || userState.isLoggined === true) {
      setLoggined(true);
    } else {
      setLoggined(false);
    }
  }, [setLoggined, userState]);
  useEffect(() => {
    console.log("//data//");
    console.log(account);
  }, [account]);
  useEffect(() => {
    console.log("//userState//");
    console.log(userState);
  }, [userState]);
  useEffect(() => {
    console.log("//userState//");
    console.log(loggined);
  }, [loggined]);
  return (
    <>
      <DashboardStyle>
        <Modal />
        <HeaderBox />
        {loading && <p>사용자 정보 로딩중...</p>}
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
