import { useSetRecoilState } from "recoil";

import {
  Gates,
  IGates,
  IGatesCharacter,
  IGatesContent,
  IGatesSetting,
} from "../../atoms/Settings/Gates";

function useSetGatesVisible(
  AccountName: string,
  CharacterName: string,
  ContentsName: string
): (
  index: number,
  value: boolean | string,
  key: "Difficulty" | "isVisible"
) => void {
  const setGates = useSetRecoilState(Gates);

  function setter(
    index: number,
    value: boolean | string,
    key: "Difficulty" | "isVisible"
  ) {
    setGates((prev) => {
      const copiedPrev: IGates = { ...prev };
      const copiedAccount: IGatesCharacter = { ...copiedPrev[AccountName] };
      const copiedCharacter: IGatesContent = {
        ...copiedAccount[CharacterName],
      };
      const copiedContents: IGatesSetting[] = [
        ...copiedCharacter[ContentsName],
      ];
      const copiedArray: IGatesSetting = {
        ...copiedContents[index],
        [key]: value,
      };

      copiedContents[index] = copiedArray;
      copiedCharacter[ContentsName] = copiedContents;
      copiedAccount[CharacterName] = copiedCharacter;
      copiedPrev[AccountName] = copiedAccount;

      return copiedPrev;
    });
  }
  return setter;
}
export default useSetGatesVisible;
