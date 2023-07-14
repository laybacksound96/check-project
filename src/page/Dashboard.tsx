import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import styled from "styled-components";
import Modal from "../components/Ui/Modal/Modal";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import { useEffect } from "react";
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

const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
interface IProps {
  userData: IFetchedData;
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
function Dashboard({ userData: { global_name, data }, login }: IProps) {
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);
  const [characterOrder, setCharacterOrder] = useRecoilState(CharacterOrder);
  const [contentsOrder, setContentsOrder] = useRecoilState(ContentsOrder);
  const [characterInfo, setCharacterInfo] = useRecoilState(CharacterInfo);
  const [characterSetting, setCharacterSetting] =
    useRecoilState(CharacterSetting);
  const [contentSetting, setContentSetting] = useRecoilState(ContentSetting);
  const [gates, setGates] = useRecoilState(Gates);
  const { userId } = useParams();
  useEffect(() => {
    setLoginState(login);
    const {
      accountOrder,
      characterInfo,
      characterOrder,
      characterSetting,
      contentSetting,
      contentsOrder,
      gates,
    }: IAllAtoms = JSON.parse(data);
    setAccountOrder(accountOrder);
    setCharacterOrder(characterOrder);
    setContentsOrder(contentsOrder);
    setCharacterInfo(characterInfo);
    setCharacterSetting(characterSetting);
    setContentSetting(contentSetting);
    setGates(gates);
  }, []);
  useEffect(() => {
    if (!userId || !loginState) return;
    const data: IAllAtoms = {
      accountOrder,
      characterInfo,
      characterOrder,
      characterSetting,
      contentSetting,
      contentsOrder,
      gates,
    };
    patchData(userId, data);
  }, [
    accountOrder,
    characterInfo,
    characterOrder,
    characterSetting,
    contentSetting,
    contentsOrder,
    gates,
    loginState,
    userId,
  ]);

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
