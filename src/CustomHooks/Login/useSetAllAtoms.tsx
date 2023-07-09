import { useSetRecoilState } from "recoil";
import { CharacterInfo, ICharacterInfo } from "../../atoms/Info/CharacterInfo";
import {
  CharacterSetting,
  ICharacterSetting,
} from "../../atoms/Settings/CharacterSetting";
import {
  ContentSetting,
  IAccountContent,
} from "../../atoms/Settings/ContentSetting";
import { Gates, IGates } from "../../atoms/Settings/Gates";
import {
  AccountOrder,
  CharacterOrder,
  ContentsOrder,
  ICharacterOrders,
  IContentsOrders,
} from "../../atoms/Settings/Orders";

export interface IData {
  accountOrder: string[];
  characterOrder: ICharacterOrders;
  contentsOrder: IContentsOrders;
  characterInfo: ICharacterInfo;
  characterSetting: ICharacterSetting;
  contentSetting: IAccountContent;
  gates: IGates;
}
function useSetAllAtoms(): (data: IData) => void {
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const setCharacterOrder = useSetRecoilState(CharacterOrder);
  const setContentsOrder = useSetRecoilState(ContentsOrder);
  const setCharacterInfo = useSetRecoilState(CharacterInfo);
  const setCharacterSetting = useSetRecoilState(CharacterSetting);
  const setContentSetting = useSetRecoilState(ContentSetting);
  const setGates = useSetRecoilState(Gates);
  function setter({
    accountOrder,
    characterOrder,
    contentsOrder,
    characterInfo,
    characterSetting,
    contentSetting,
    gates,
  }: IData) {
    setAccountOrder(accountOrder);
    setCharacterOrder(characterOrder);
    setContentsOrder(contentsOrder);
    setCharacterInfo(characterInfo);
    setCharacterSetting(characterSetting);
    setContentSetting(contentSetting);
    setGates(gates);
  }
  return setter;
}
export default useSetAllAtoms;
