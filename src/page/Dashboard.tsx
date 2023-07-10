import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect } from "react";

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
function setUser(data: any, setter: SetterOrUpdater<IFetchedData>) {
  const { banner_color, discriminator, global_name, user_id, user_name } = data;
  const fetchedData: IFetchedData = {
    banner_color,
    discriminator,
    global_name,
    user_id,
    user_name,
  };
  setter(fetchedData);
}
function Dashboard() {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const setAllAtoms = useSetAllAtoms();
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
  const { userId } = useParams<RouteParams>();
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      patchData(getAllAtoms());
    }
  }, []);
  useEffect(() => {
    if (!document.cookie || userId !== "GUEST") return;
    const tokenParts = document.cookie.split("=");
    localStorage.setItem(tokenParts[0], tokenParts[1]);
  }, []);
  useEffect(() => {
    if (userId !== "GUEST") {
      axios
        .get(`http://localhost:4000/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setUser(response.data.user, setUserInfo);
          if (response.data.setting.AccountOrder.length > 0) {
            console.log("db데이터 atom에 저장하기");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // const localData = localStorage.getItem("data");
      // const parsedData: IData = JSON.parse(localData);
      // setAllAtoms(parsedData);
    }
  }, []);

  useEffect(() => {
    const newData = getAllAtoms();
    localStorage.setItem("data", JSON.stringify(newData));
  }, [getAllAtoms]);

  useEffect(() => {
    console.log(" ");
    console.log("userInfo");
    console.log(userInfo);
  }, [userInfo]);
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
      <Nav />
      <DashboardStyle>
        <HeaderBox />
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
