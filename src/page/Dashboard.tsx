import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect, useState } from "react";
import { IFetchedData } from "../util/fetch";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LoginState } from "../atoms/login";
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
  AccountOrder,
  CharacterOrder,
  ContentsOrder,
  ICharacterOrders,
  IContentsOrders,
} from "../atoms/Settings/Orders";
import patchData from "../util/patchData";
import { useParams } from "react-router";
import { IsFocused } from "../atoms/ui";

function isValidData(data: object) {
  const keys = [
    "accountOrder",
    "characterOrder",
    "contentsOrder",
    "characterInfo",
    "characterSetting",
    "contentSetting",
    "gates",
  ];
  if (typeof data !== "object") {
    return false;
  } else {
    for (let i in keys) {
      const key = keys[i];
      const isHasKey = data.hasOwnProperty(key);
      if (!isHasKey) return false;
    }
  }
  return true;
}

const getAllAtom = (
  userData: IFetchedData | undefined
): IAllAtoms | undefined => {
  if (!userData) {
    const localData = localStorage.getItem("data");
    if (!localData) return;
    return JSON.parse(localData);
  } else {
    if (!userData.data) return;
    const result = JSON.parse(userData.data.text);
    if (!isValidData(result)) {
      const defaultResult: IAllAtoms = {
        accountOrder: [],
        characterInfo: {},
        characterOrder: {},
        characterSetting: {},
        contentSetting: {},
        contentsOrder: {},
        gates: {},
      };
      return defaultResult;
    }
    return result;
  }
};
const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  userData?: IFetchedData;
  isEditable: boolean;
}
export interface IAllAtoms {
  accountOrder: string[];
  characterOrder: ICharacterOrders;
  contentsOrder: IContentsOrders;
  characterInfo: ICharacterInfo;
  characterSetting: ICharacterSetting;
  contentSetting: IAccountContent;
  gates: IGates;
}
export type ISync = "success" | "error" | "inprogress" | null;
function Dashboard({ userData, isEditable }: IProps) {
  const setIsFocused = useSetRecoilState(IsFocused);
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);
  const [characterOrder, setCharacterOrder] = useRecoilState(CharacterOrder);
  const [contentsOrder, setContentsOrder] = useRecoilState(ContentsOrder);
  const [characterInfo, setCharacterInfo] = useRecoilState(CharacterInfo);
  const [characterSetting, setCharacterSetting] =
    useRecoilState(CharacterSetting);
  const [contentSetting, setContentSetting] = useRecoilState(ContentSetting);
  const [gates, setGates] = useRecoilState(Gates);
  const [isSync, setIsSync] = useState<ISync>(null);
  const { userId } = useParams();
  useEffect(() => {
    setLoginState(isEditable);
    try {
      const dataToAtoms = getAllAtom(userData);
      if (!dataToAtoms) return;
      setAccountOrder(dataToAtoms.accountOrder);
      setCharacterOrder(dataToAtoms.characterOrder);
      setContentsOrder(dataToAtoms.contentsOrder);
      setCharacterInfo(dataToAtoms.characterInfo);
      setCharacterSetting(dataToAtoms.characterSetting);
      setContentSetting(dataToAtoms.contentSetting);
      setGates(dataToAtoms.gates);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (!loginState) return;
    const data: IAllAtoms = {
      accountOrder,
      characterInfo,
      characterOrder,
      characterSetting,
      contentSetting,
      contentsOrder,
      gates,
    };
    if (!userData) {
      localStorage.setItem("data", JSON.stringify(data));
    } else {
      if (!userId) return;
      patchData(userId, data, setIsSync);
    }
  }, [
    accountOrder,
    characterInfo,
    characterOrder,
    characterSetting,
    contentSetting,
    contentsOrder,
    gates,
    loginState,
    userData,
    userId,
  ]);

  return (
    <>
      <Modal />
      <DashboardStyle onClick={() => setIsFocused(false)}>
        <HeaderBox userData={userData ? userData : "GUEST"} isSync={isSync} />
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
