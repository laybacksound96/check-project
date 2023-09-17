import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect, useState } from "react";
import { IFetchedData, getAccountData } from "../util/fetch";
import { useRecoilState, useSetRecoilState } from "recoil";
import { UserState } from "../atoms/user";
import { AccountOrder } from "../atoms/Settings/Orders";
import { Data } from "../atoms/data";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  userData: IFetchedData;
}

function Dashboard({ userData }: IProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useRecoilState(Data);
  const [userState, setUserState] = useRecoilState(UserState);
  useEffect(() => {
    Promise.all(
      userData.user.accountOrder.map((id) => getAccountData(id))
    ).then((value) => {
      setData(value);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
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
