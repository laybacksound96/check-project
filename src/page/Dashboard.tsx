import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CharacterInfo, ICharacterInfo } from "../atoms/Info/CharacterInfo";
import {
  CharacterSetting,
  ICharacterSetting,
} from "../atoms/Settings/CharacterSetting";
import {
  ContentSetting,
  IAccountContent,
} from "../atoms/Settings/ContentSetting";
import { Gates, IGates } from "../atoms/Settings/Gates";

import {
  CharacterOrder,
  ContentsOrder,
  AccountOrder,
  ICharacterOrders,
  IContentsOrders,
} from "../atoms/Settings/Orders";
import Nav from "../components/Ui/Nav/Nav";
import { fetchTest } from "../util/fetch";
import { useParams } from "react-router-dom";
import useSetAllAtoms, { IData } from "../CustomHooks/Login/useSetAllAtoms";
import useGetAllAtoms from "../CustomHooks/Login/useGetAllAtoms";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface RouteParams {
  userId: string;
}
function Dashboard() {
  const setAllAtoms = useSetAllAtoms();
  const getAllAtoms = useGetAllAtoms();
  const { userId } = useParams<RouteParams>();

  useEffect(() => {
    const tokenParts = document.cookie.split("=");
    localStorage.setItem(tokenParts[0], tokenParts[1]);
    fetchTest();
    const localData = localStorage.getItem("data");
    if (!localData || userId !== "GUEST") return;
    const parsedData: IData = JSON.parse(localData);
    setAllAtoms(parsedData);
  }, []);

  useEffect(() => {
    const newData = getAllAtoms();
    localStorage.setItem("data", JSON.stringify(newData));
  }, [getAllAtoms]);

  return (
    <>
      <Modal />
      <Nav />
      <DashboardStyle>
        <HeaderBox />
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
