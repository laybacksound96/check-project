import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect } from "react";
import { IFetchedData, fetchAccountData } from "../util/fetch";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoginState } from "../atoms/login";
import { Accounts } from "../atoms/data";
import { ContentsFrequency } from "../atoms/frequency";
import { useRouteLoaderData } from "react-router-dom";
import { loadToken } from "../util/auth";
import syncData from "../components/DashBoard/Functions/syncData";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IUserData {
  userData: IFetchedData | "GUEST";
}

function Dashboard({ userData }: IUserData) {
  const setAccounts = useSetRecoilState(Accounts);
  const setLoginState = useSetRecoilState(LoginState);
  const loginToken = useRouteLoaderData("root") as ReturnType<typeof loadToken>;

  const contentsFrequency = useRecoilValue(ContentsFrequency);
  useEffect(() => {
    if (userData === "GUEST") {
      // GUEST일때 setter 추가
    } else {
      setAccounts(() => userData.data.accountOrder);
      if (!loginToken) return;
      if (loginToken.user_id === userData.user_id) {
        userData.data.accountOrder.forEach((account, index) => {
          const data = fetchAccountData(account.characters[0].characterName);
          data.then((resolvedData) => {
            setAccounts((accounts) => {
              const copiedAccounts = [...accounts];
              copiedAccounts[index] = syncData(account, resolvedData);
              return copiedAccounts;
            });
          });
        });
        setLoginState(true);
      }
    }
  }, []);

  return (
    <>
      <Modal />
      <DashboardStyle>
        <HeaderBox userData={userData} />
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
