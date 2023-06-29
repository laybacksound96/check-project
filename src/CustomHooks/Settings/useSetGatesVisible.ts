import { useSetRecoilState } from "recoil";

import { Gates } from "../../atoms/Settings/Gates";

function useSetGatesVisible(
  AccountName: string,
  CharacterName: string,
  ContentsName: string
): (index: number, value: boolean) => void {
  const setGates = useSetRecoilState(Gates);

  function setter(index: number, value: boolean) {
    setGates((prev) => {
      const copiedPrev = {
        ...prev,
        [AccountName]: {
          ...prev[AccountName],
          [CharacterName]: {
            ...prev[AccountName][CharacterName],
            [ContentsName]: [...prev[AccountName][CharacterName][ContentsName]],
          },
        },
      };
      copiedPrev[AccountName][CharacterName][ContentsName][index].isVisible =
        value;
      return copiedPrev;
    });
  }
  return setter;
}
export default useSetGatesVisible;
