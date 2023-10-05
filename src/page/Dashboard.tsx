import styled from "styled-components";
import DragAccounts from "../components/DragAccounts";
import { useEffect, useState } from "react";
import {
  fetchSearchAccount,
  getAccountData,
  patchAccountOrder,
} from "../util/fetch";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AccountOrder, IAccountOrder } from "../atoms/data";
import { CommanderData, ICommanderData } from "../atoms/commander";
import HeaderBox from "../components/HeaderBox";
import { IFetchedUserData } from "../atoms/fetchData";
import { FrequencyCounter } from "../atoms/frequency";
import { makeFrequencyCounter } from "../components/Functions/makeFrequencyCounter";
import refreshAccount from "../util/refreshAccount";
import { User } from "../atoms/newData";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  data: [IFetchedUserData, ICommanderData];
}

function Dashboard({ data: [userData, { commanderData: commander }] }: IProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useRecoilState(User);
  const setCommanderData = useSetRecoilState(CommanderData);
  const setFrequencyCounter = useSetRecoilState(FrequencyCounter);

  useEffect(() => {
    console.log(userData);
    setUser(userData);
    setLoading(false);
  }, []);
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
        {loading && <p>사용자 정보 로딩중...</p>}
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
