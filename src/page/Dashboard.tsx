import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect, useState } from "react";
import { IFetchedData } from "../util/fetch";
import { useRecoilState } from "recoil";
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
const getAllAtom = (
  userData: IFetchedData | undefined
): IAllAtoms | undefined => {
  if (!userData) {
    const localData = localStorage.getItem("data");
    if (!localData) return;
    return JSON.parse(localData);
  } else {
    return JSON.parse(userData.data);
  }
};
const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  userData?: IFetchedData;
  login: boolean;
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
export type ISync = boolean | null;
function Dashboard({ userData, login }: IProps) {
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
    setLoginState(login);

    const AllAtom = getAllAtom(userData);
    if (!AllAtom) return;
    setAccountOrder(AllAtom.accountOrder);
    setCharacterOrder(AllAtom.characterOrder);
    setContentsOrder(AllAtom.contentsOrder);
    setCharacterInfo(AllAtom.characterInfo);
    setCharacterSetting(AllAtom.characterSetting);
    setContentSetting(AllAtom.contentSetting);
    setGates(AllAtom.gates);
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

  useEffect(() => {
    console.log(characterSetting);
  }, [characterSetting]);
  return (
    <>
      <Modal />
      <DashboardStyle>
        <HeaderBox
          userId={userData ? userData.global_name : "GUEST"}
          isSync={isSync}
        />
        <DragAccounts />
      </DashboardStyle>
    </>
  );
}

export default Dashboard;
