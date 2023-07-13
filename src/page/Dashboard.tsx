import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect, useState } from "react";

import Nav from "../components/Ui/Nav/Nav";

import { useParams } from "react-router-dom";
import useSetAllAtoms from "../CustomHooks/Login/useSetAllAtoms";
import useGetAllAtoms from "../CustomHooks/Login/useGetAllAtoms";
import { IFetchedData } from "../util/fetch";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { UserInfo } from "../atoms/Info/UserInfo";
import axios from "axios";
import patchData from "../util/patchData";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface RouteParams {
  userId: string;
}

function Dashboard() {
  const getAllAtoms = useGetAllAtoms();
  const {
    accountOrder,
    characterInfo,
    characterOrder,
    characterSetting,
    contentSetting,
    contentsOrder,
    gates,
  } = getAllAtoms();

  // useEffect(() => {
  //   patchData(userId, getAllAtoms());
  // }, [
  //   userId,
  //   getAllAtoms,
  //   accountOrder,
  //   characterInfo,
  //   characterOrder,
  //   characterSetting,
  //   contentSetting,
  //   contentsOrder,
  //   gates,
  // ]);

  useEffect(() => {
    console.log(" ");
    console.log("accountOrder");
    console.log(accountOrder);
  }, [accountOrder]);
  useEffect(() => {
    console.log(" ");
    console.log("characterOrder");
    console.log(characterOrder);
  }, [characterOrder]);
  useEffect(() => {
    console.log(" ");
    console.log("contentsOrder");
    console.log(contentsOrder);
  }, [contentsOrder]);
  useEffect(() => {
    console.log(" ");
    console.log("characterInfo");
    console.log(characterInfo);
  }, [characterInfo]);
  useEffect(() => {
    console.log(" ");
    console.log("characterSetting");
    console.log(characterSetting);
  }, [characterSetting]);
  useEffect(() => {
    console.log(" ");
    console.log("contentSetting");
    console.log(contentSetting);
  }, [contentSetting]);
  useEffect(() => {
    console.log(" ");
    console.log("gates");
    console.log(gates);
  }, [gates]);

  return (
    <>
      <Modal />
      <DashboardStyle>
        <HeaderBox userId="" />
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
