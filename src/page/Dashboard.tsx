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
import { ContentsFrequency } from "../atoms/frequency";
interface IParsedData {
  accountOrder: string[];
  characterOrder: ICharacterOrders;
  contentsOrder: IContentsOrders;
  characterInfo: ICharacterInfo;
  characterSetting: ICharacterSetting;
  contentSetting: IAccountContent;
  gates: IGates;
}
const DashboardStyle = styled.div`
  min-width: 800px;
`;

function Dashboard() {
  const [characterInfo, setCharacterInfo] = useRecoilState(CharacterInfo);
  const [characterSetting, setCharacterSetting] =
    useRecoilState(CharacterSetting);
  const [contentSetting, setContentSetting] = useRecoilState(ContentSetting);
  const [gates, setGates] = useRecoilState(Gates);
  const [characterOrder, setCharacterOrder] = useRecoilState(CharacterOrder);
  const [contentsOrder, setContentsOrder] = useRecoilState(ContentsOrder);
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);

  useEffect(() => {
    const localData = localStorage.getItem("data");
    if (!localData) return;
    const parsedData: IParsedData = JSON.parse(localData);
    const {
      accountOrder,
      characterInfo,
      characterOrder,
      characterSetting,
      contentSetting,
      contentsOrder,
      gates,
    } = parsedData;
    setAccountOrder((prev) => accountOrder);
    setCharacterOrder((prev) => characterOrder);
    setContentsOrder((prev) => contentsOrder);
    setCharacterInfo((prev) => characterInfo);
    setCharacterSetting((prev) => characterSetting);
    setContentSetting((prev) => contentSetting);
    setGates((prev) => gates);
  }, []);

  useEffect(() => {
    const newData = {
      accountOrder,
      characterOrder,
      contentsOrder,
      characterInfo,
      characterSetting,
      contentSetting,
      gates,
    };
    localStorage.setItem("data", JSON.stringify(newData));
  }, [
    accountOrder,
    characterOrder,
    contentsOrder,
    characterInfo,
    characterSetting,
    contentSetting,
    gates,
  ]);
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
