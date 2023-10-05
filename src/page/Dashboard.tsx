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
import { IFetchedData, UserState } from "../atoms/fetchData";
import { FrequencyCounter } from "../atoms/frequency";
import { makeFrequencyCounter } from "../components/Functions/makeFrequencyCounter";
import refreshAccount from "../util/refreshAccount";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  data: [IFetchedData, ICommanderData];
}

function Dashboard({ data: [userData, { commanderData: commander }] }: IProps) {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useRecoilState(AccountOrder);
  const setCommanderData = useSetRecoilState(CommanderData);
  const setFrequencyCounter = useSetRecoilState(FrequencyCounter);

  useEffect(() => {
    Promise.all(
      userData.user.accountOrder.map((id) => getAccountData(id))
    ).then((values) => {
      const accounts: IAccountOrder[] = values.map(
        ({
          characterOrder,
          contentsOrder,
          _id,
          characters: { characters },
          contents: { contents },
          checks,
        }) => {
          const accounts = {
            characterOrder,
            contentsOrder,
            _id,
            characters,
            checks,
            contents,
          };
          return accounts;
        }
      );
      setCommanderData(commander);
      setAccount(accounts);
      setLoading(false);
    });
  }, [commander, setAccount, setCommanderData, userData]);

  // useEffect(() => {
  //   setFrequencyCounter(makeFrequencyCounter(account));
  // }, [account, setFrequencyCounter]);

  return (
    <>
      <DashboardStyle>
        <HeaderBox />
        {loading && <p>사용자 정보 로딩중...</p>}
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
