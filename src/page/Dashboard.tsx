import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect } from "react";
import { IFetchedData } from "../util/fetch";
import useSetAllAtoms from "../CustomHooks/Login/useSetAllAtoms";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  userData: IFetchedData;
}
function Dashboard({ userData: { global_name, data } }: IProps) {
  const setter = useSetAllAtoms();
  useEffect(() => {
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
