import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect } from "react";
import { IFetchedData } from "../util/fetch";
import useSetAllAtoms from "../CustomHooks/Login/useSetAllAtoms";
import { useSetRecoilState } from "recoil";
import { LoginState } from "../atoms/login";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  userData: IFetchedData;
  login: boolean;
}
function Dashboard({ userData: { global_name, data }, login }: IProps) {
  const setter = useSetAllAtoms();
  const setLoginState = useSetRecoilState(LoginState);
  useEffect(() => {
    setLoginState(login);
    setter(JSON.parse(data));
  });

  return (
    <>
      <Modal />
      <DashboardStyle>
        <HeaderBox userId={global_name} />
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
