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
import { useRecoilState } from "recoil";
import { UserInfo } from "../atoms/Info/UserInfo";
import axios from "axios";

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface RouteParams {
  userId: string;
}

function Dashboard() {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const setAllAtoms = useSetAllAtoms();
  const getAllAtoms = useGetAllAtoms();
  const { userId } = useParams<RouteParams>();

  useEffect(() => {
    if (userId !== "GUEST") {
      if (!document.cookie) return;
      const tokenParts = document.cookie.split("=");
      localStorage.setItem(tokenParts[0], tokenParts[1]);
      axios
        .get(`http://localhost:4000/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const {
            banner_color,
            discriminator,
            global_name,
            user_id,
            user_name,
          } = response.data;
          const data: IFetchedData = {
            banner_color,
            discriminator,
            global_name,
            user_id,
            user_name,
          };
          setUserInfo(data);
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
    console.log(userInfo);
  }, [userInfo]);

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
