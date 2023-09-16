import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect } from "react";
import { IFetchedData } from "../util/fetch";
import { useSetRecoilState } from "recoil";
import { UserState } from "../atoms/user";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  userData: IFetchedData | "GUEST";
}

function Dashboard({ userData }: IProps) {
  const setUserState = useSetRecoilState(UserState);
  useEffect(() => {
    if (userData === "GUEST") {
      return;
    }
    setUserState(userData);
  }, []);

  useEffect(() => {
    console.log("//userData");
    console.log(userData);
  }, [userData]);

  return (
    <>
      <Modal />
      <DashboardStyle>
        <HeaderBox />
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
