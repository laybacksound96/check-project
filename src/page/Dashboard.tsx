import styled from "styled-components";
import DragAccounts from "../components/DragAccounts";
import { useEffect, useState } from "react";
import {
  fetchSearchAccount,
  getAccountData,
  patchAccountOrder,
} from "../util/fetch";
import { useRecoilState, useSetRecoilState } from "recoil";
import { User, AccountOrder, IAccountOrder, IUser } from "../atoms/data";
import { CommanderData, ICommander } from "../atoms/commander";
import HeaderBox from "../components/HeaderBox";
import { IFetchedUserData } from "../atoms/fetchData";
import { FrequencyCounter } from "../atoms/frequency";
import { makeFrequencyCounter } from "../components/Functions/makeFrequencyCounter";
import refreshAccount from "../util/refreshAccount";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  data: [IUser, ICommander[]];
}

function Dashboard({ data }: IProps) {
  const setCommanderData = useSetRecoilState(CommanderData);
  const setFrequencyCounter = useSetRecoilState(FrequencyCounter);
  const [user, setUser] = useRecoilState(User);
  useEffect(() => {
    setUser(data[0]);
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  // useEffect(() => {
  //   console.log(userData);
  //   Promise.all(userData.accountOrder.map((id) => getAccountData(id))).then(
  //     (values) => {
  //       setCommanderData(commander);
  //       setLoading(false);
  //     }
  //   );
  // }, [commander, setAccount, setCommanderData, userData]);

  // useEffect(() => {
  //   setFrequencyCounter(makeFrequencyCounter(account));
  // }, [account, setFrequencyCounter]);

  return (
    <>
      <DashboardStyle>
        {/* <HeaderBox /> */}
        {/* {loading && <p>사용자 정보 로딩중...</p>} */}
        {/* <DragAccounts /> */}
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
