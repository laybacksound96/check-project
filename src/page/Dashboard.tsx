import styled from "styled-components";
import DragAccounts from "../components/DragAccounts";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { User, IUser, Accounts, Characters, Contents } from "../atoms/data";
import { CommanderData, ICommander } from "../atoms/commander";
import HeaderBox from "../components/HeaderBox";
import { FrequencyCounter } from "../atoms/frequency";
import { makeFrequencyCounter } from "../components/Functions/makeFrequencyCounter";
import { LoginState } from "../atoms/login";
import { useRouteLoaderData, useParams } from "react-router-dom";
import { loadToken } from "../util/auth";
import { getAccountData } from "../fetch/account";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  data: [IUser, ICommander[]];
}

function Dashboard({ data: [userData, commander] }: IProps) {
  const token = useRouteLoaderData("root") as ReturnType<typeof loadToken>;
  const { userId } = useParams();
  const setLoginState = useSetRecoilState(LoginState);
  const setCommanderData = useSetRecoilState(CommanderData);
  const setFrequencyCounter = useSetRecoilState(FrequencyCounter);
  const setUser = useSetRecoilState(User);
  const [contents, setContents] = useRecoilState(Contents);
  const setCharacters = useSetRecoilState(Characters);
  const [accounts, setAccounts] = useRecoilState(Accounts);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token && userId) {
      setLoginState(token.user_id === userId);
    }
    setUser(userData);
    setCommanderData(commander);
    Promise.all(userData.accountOrder.map((id) => getAccountData(id))).then((values) => {
      setAccounts(values.map(({ account }) => account));
      setContents(values.map(({ contents }) => contents));
      setCharacters(values.map(({ characters }) => characters));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setFrequencyCounter(makeFrequencyCounter(accounts, contents));
  }, [accounts, contents, setFrequencyCounter]);

  return (
    <>
      <DashboardStyle>
        <HeaderBox />
        {loading && <p>사용자 정보 로딩중...</p>}
        {<DragAccounts />}
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
