import { useRecoilValue } from "recoil";
import { IData } from "./useSetAllAtoms";
import { CharacterInfo } from "../../atoms/Info/CharacterInfo";
import { CharacterSetting } from "../../atoms/Settings/CharacterSetting";
import { ContentSetting } from "../../atoms/Settings/ContentSetting";
import { Gates } from "../../atoms/Settings/Gates";
import {
  AccountOrder,
  CharacterOrder,
  ContentsOrder,
} from "../../atoms/Settings/Orders";

function useGetAllAtoms(): () => IData {
  const accountOrder = useRecoilValue(AccountOrder);
  const characterOrder = useRecoilValue(CharacterOrder);
  const contentsOrder = useRecoilValue(ContentsOrder);
  const characterInfo = useRecoilValue(CharacterInfo);
  const characterSetting = useRecoilValue(CharacterSetting);
  const contentSetting = useRecoilValue(ContentSetting);
  const gates = useRecoilValue(Gates);

  function getter() {
    const data: IData = {
      accountOrder,
      characterOrder,
      contentsOrder,
      characterInfo,
      characterSetting,
      contentSetting,
      gates,
    };
    return data;
  }

  return getter;
}
export default useGetAllAtoms;
