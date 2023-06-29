import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { CharacterInfo } from "../atoms/Info/CharacterInfo";
import { CharacterSetting } from "../atoms/Settings/CharacterSetting";
import { ContentSetting } from "../atoms/Settings/ContentSetting";
import { Gates } from "../atoms/Settings/Gates";
import { GoldIncome } from "../atoms/Settings/GoldIncome";
import {
  CharacterOrder,
  ContentsOrder,
  AccountOrder,
} from "../atoms/Settings/Orders";
import { ContentsFrequency } from "../atoms/frequency";

const DashboardStyle = styled.div`
  min-width: 800px;
`;

function Dashboard() {
  const characterInfo = useRecoilValue(CharacterInfo);
  const characterSetting = useRecoilValue(CharacterSetting);
  const contentSetting = useRecoilValue(ContentSetting);
  const gates = useRecoilValue(Gates);
  const goldIncome = useRecoilValue(GoldIncome);
  const characterOrder = useRecoilValue(CharacterOrder);
  const contentsOrder = useRecoilValue(ContentsOrder);
  const accountOrder = useRecoilValue(AccountOrder);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
  useEffect(() => {
    console.log(" ");
    console.log("order==============");
    console.log("characterOrder------");
    console.log(characterOrder);
    console.log("contentsOrder------");
    console.log(contentsOrder);
    console.log("accountOrder------");
    console.log(accountOrder);
    console.log("==================");
  }, [accountOrder, characterOrder, contentsOrder]);

  useEffect(() => {
    console.log(" ");
    console.log("characterInfo------");
    console.log(characterInfo);
  }, [characterInfo]);
  useEffect(() => {
    console.log(" ");
    console.log("characterSetting------");
    console.log(characterSetting);
  }, [characterSetting]);
  useEffect(() => {
    console.log(" ");
    console.log("contentSetting------");
    console.log(contentSetting);
  }, [contentSetting]);
  useEffect(() => {
    console.log(" ");
    console.log("gates------");
    console.log(gates);
  }, [gates]);
  useEffect(() => {
    console.log(" ");
    console.log("goldIncome------");
    console.log(goldIncome);
  }, [goldIncome]);
  useEffect(() => {
    console.log(" ");
    console.log("ContentsFrequency------");
    console.log(contentsFrequency);
  }, [contentsFrequency]);
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
