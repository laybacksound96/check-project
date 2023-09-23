import styled from "styled-components";
import DragAccounts from "../components/DragAccounts";
import { useEffect, useState } from "react";
import { getAccountData } from "../util/fetch";
import { useRecoilState } from "recoil";
import { LoginState } from "../atoms/login";
import { AccountOrder, IAccountOrder } from "../atoms/data";
import { CommanderData, ICommanderData } from "../atoms/commander";
import HeaderBox from "../components/HeaderBox";
import { IFetchedData, UserState } from "../atoms/fetchData";
import { FrequencyCounter } from "../atoms/frequency";
import { makeFrequencyCounter } from "../components/Functions/makeFrequencyCounter";

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
  const [loggined, setLoggined] = useRecoilState(LoginState);
  const [userState, setUserState] = useRecoilState(UserState);
  const [commanderData, setCommanderData] = useRecoilState(CommanderData);
  const [frequencyCounter, setFrequencyCounter] =
    useRecoilState(FrequencyCounter);

  useEffect(() => {
    setUserState(userData);
    Promise.all(
      userData.user.accountOrder.map((id) => getAccountData(id))
    ).then((values) => {
      const account: IAccountOrder[] = values.map(
        ({
          characterOrder,
          contentsOrder,
          _id,
          characters: { characters },
          contents: { contents },
          checks,
        }) => {
          return {
            characterOrder,
            contentsOrder,
            _id,
            characters,
            checks,
            contents,
          };
        }
      );
      setCommanderData(commander);
      setAccount(account);
      setLoading(false);
    });
  }, [commander, setAccount, setCommanderData, setUserState, userData]);
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
    console.log("//commanderData//");
    console.log(commanderData);
  }, [commanderData]);
  useEffect(() => {
    console.log("//userState//");
    console.log(userState);
  }, [userState]);
  useEffect(() => {
    console.log("//userState//");
    console.log(loggined);
  }, [loggined]);
  useEffect(() => {
    setFrequencyCounter(makeFrequencyCounter(account));
  }, [account, setFrequencyCounter]);
  useEffect(() => {
    console.log(frequencyCounter);
  }, [frequencyCounter]);
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
